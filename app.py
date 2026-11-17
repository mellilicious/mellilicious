#!/usr/bin/env python3
"""
Java-Foto-Löser – lokale KI, die Java-Aufgaben von einem Foto löst.

Ablauf:
  1. Ein Vision-Modell (z. B. qwen2.5vl) liest die Aufgabe vom Foto ab.
  2. Ein Code-Modell (z. B. qwen2.5-coder) schreibt die Java-Lösung.
  3. Ist ein JDK installiert, wird die Lösung mit javac kompiliert und
     bei Fehlern automatisch korrigiert; danach wird main() testweise ausgeführt.

Alles läuft lokal über Ollama (https://ollama.com). Keine Zusatzpakete nötig.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import urllib.error
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434").rstrip("/")
VISION_MODEL = os.environ.get("VISION_MODEL", "qwen2.5vl:7b")
CODE_MODEL = os.environ.get("CODE_MODEL", "qwen2.5-coder:7b")
PORT = int(os.environ.get("PORT", "8080"))
MAX_FIX_ROUNDS = int(os.environ.get("MAX_FIX_ROUNDS", "2"))
RUN_TIMEOUT = int(os.environ.get("RUN_TIMEOUT", "10"))

STATIC_DIR = Path(__file__).resolve().parent / "static"

EXTRACT_PROMPT = """Auf dem Foto ist eine Programmieraufgabe (Java).
Schreibe den VOLLSTÄNDIGEN Aufgabentext exakt ab:
- alle Teilaufgaben (a, b, c, ...) mit Nummerierung
- vorgegebenen Code originalgetreu in ```java Blöcken
- Tabellen, Beispiel-Ein- und Ausgaben, Hinweise
Erfinde nichts dazu und löse die Aufgabe NICHT. Unleserliche Stellen markierst du mit [unleserlich]."""

SOLVE_SYSTEM = """Du bist ein erfahrener Java-Entwickler und Tutor. Löse die gegebene Aufgabe vollständig in Java (Java 17).
Regeln:
- Gib vollständigen, kompilierbaren Code in ```java Blöcken aus. Ein Block pro Datei; der Name der public-Klasse ist der Dateiname.
- Kein package-Statement.
- Behalte vorgegebene Klassen-, Methoden- und Variablennamen exakt bei.
- Füge, wenn sinnvoll, eine main-Methode hinzu, die die Lösung mit Beispielwerten demonstriert (ohne Benutzereingabe).
- Hat die Aufgabe Teilaufgaben, beantworte jede (auch Theoriefragen) mit Überschrift.
- Erkläre danach kurz und verständlich auf Deutsch, wie die Lösung funktioniert."""


class ClientGone(Exception):
    pass


# --------------------------------------------------------------------------- Ollama

def ollama_models():
    with urllib.request.urlopen(OLLAMA_URL + "/api/tags", timeout=5) as r:
        data = json.load(r)
    return sorted(m["name"] for m in data.get("models", []))


def ollama_chat(model, messages, on_token):
    body = json.dumps({
        "model": model,
        "messages": messages,
        "stream": True,
        "options": {"temperature": 0.2, "num_ctx": 8192},
    }).encode()
    req = urllib.request.Request(OLLAMA_URL + "/api/chat", data=body,
                                 headers={"Content-Type": "application/json"})
    parts = []
    try:
        with urllib.request.urlopen(req, timeout=900) as resp:
            for line in resp:
                if not line.strip():
                    continue
                data = json.loads(line)
                if data.get("error"):
                    raise RuntimeError(data["error"])
                tok = data.get("message", {}).get("content", "")
                if tok:
                    parts.append(tok)
                    on_token(tok)
                if data.get("done"):
                    break
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        if e.code == 404 or "not found" in detail:
            raise RuntimeError(f"Modell '{model}' ist nicht installiert. Im Terminal ausführen:  ollama pull {model}")
        raise RuntimeError(f"Ollama-Fehler ({e.code}): {detail}")
    except urllib.error.URLError:
        raise RuntimeError(f"Ollama ist unter {OLLAMA_URL} nicht erreichbar. Läuft Ollama? (ollama serve)")
    return "".join(parts)


# --------------------------------------------------------------------------- Java

CODE_BLOCK = re.compile(r"```[ \t]*(?:java)?[ \t]*\r?\n(.*?)```", re.S | re.I)
TYPE_DECL = r"(?:class|interface|enum|record)\s+([A-Za-z_]\w*)"


def extract_java_files(text):
    files = {}
    for block in CODE_BLOCK.findall(text):
        if not re.search(r"\b(class|interface|enum|record)\b", block):
            continue
        block = re.sub(r"^\s*package\s+[\w.]+\s*;\s*$", "", block, flags=re.M)
        m = re.search(r"public\s+(?:(?:final|abstract|sealed)\s+)*" + TYPE_DECL, block) or re.search(TYPE_DECL, block)
        if m:
            files[m.group(1) + ".java"] = block.strip() + "\n"
    return files


def _clean(text):
    return "\n".join(l for l in text.splitlines() if not l.startswith("Picked up JAVA_TOOL_OPTIONS")).strip()


def have_jdk():
    return shutil.which("javac") is not None and shutil.which("java") is not None


def compile_and_run(files):
    """Gibt (ok, compile_output, run_output|None) zurück."""
    with tempfile.TemporaryDirectory(prefix="javaloeser_") as d:
        for name, src in files.items():
            Path(d, name).write_text(src, encoding="utf-8")
        try:
            c = subprocess.run(["javac", "-encoding", "UTF-8", *files.keys()], cwd=d,
                               capture_output=True, text=True, timeout=60)
        except subprocess.TimeoutExpired:
            return False, "javac Zeitüberschreitung", None
        if c.returncode != 0:
            return False, _clean(c.stdout + c.stderr), None

        main_cls = next((n[:-5] for n, s in files.items()
                         if re.search(r"static\s+void\s+main\s*\(", s)), None)
        if not main_cls:
            return True, "", None
        try:
            r = subprocess.run(["java", "-cp", d, main_cls], cwd=d, capture_output=True, text=True,
                               timeout=RUN_TIMEOUT, stdin=subprocess.DEVNULL)
            out = _clean(r.stdout + "\n" + r.stderr)
        except subprocess.TimeoutExpired:
            out = f"(Programm nach {RUN_TIMEOUT}s abgebrochen – wartet es evtl. auf Eingaben?)"
        return True, "", out


# --------------------------------------------------------------------------- Pipeline

def solve(req, emit):
    vision = req.get("vision_model") or VISION_MODEL
    coder = req.get("code_model") or CODE_MODEL
    note = (req.get("note") or "").strip()
    task = (req.get("task") or "").strip()

    if not task:
        image = req.get("image") or ""
        if "," in image[:100]:
            image = image.split(",", 1)[1]  # data:-URL-Präfix entfernen
        if not image:
            raise RuntimeError("Kein Bild und kein Aufgabentext übergeben.")
        emit({"type": "stage", "stage": "extract", "label": f"Lese Aufgabe vom Foto ({vision}) …"})
        task = ollama_chat(vision, [{"role": "user", "content": EXTRACT_PROMPT, "images": [image]}],
                           lambda t: emit({"type": "token", "stage": "extract", "text": t}))
        emit({"type": "task", "text": task})

    user_msg = "AUFGABE:\n\n" + task
    if note:
        user_msg += "\n\nZUSÄTZLICHER HINWEIS DES NUTZERS:\n" + note
    messages = [{"role": "system", "content": SOLVE_SYSTEM}, {"role": "user", "content": user_msg}]

    emit({"type": "stage", "stage": "solve", "label": f"Schreibe Java-Lösung ({coder}) …"})
    answer = ollama_chat(coder, messages, lambda t: emit({"type": "token", "stage": "solve", "text": t}))

    if not have_jdk():
        emit({"type": "compile", "ok": None, "output": "Kein JDK gefunden – Lösung wurde nicht kompiliert."})
        return

    for attempt in range(MAX_FIX_ROUNDS + 1):
        files = extract_java_files(answer)
        if not files:
            emit({"type": "compile", "ok": None, "output": "Kein Java-Code in der Antwort gefunden."})
            return
        emit({"type": "stage", "stage": "compile", "label": "Kompiliere mit javac …"})
        ok, cout, run_out = compile_and_run(files)
        if ok:
            emit({"type": "compile", "ok": True, "output": "Kompiliert ohne Fehler ✔", "files": list(files)})
            if run_out is not None:
                emit({"type": "run", "output": run_out or "(keine Ausgabe)"})
            return
        emit({"type": "compile", "ok": False, "output": cout})
        if attempt == MAX_FIX_ROUNDS:
            return
        messages += [
            {"role": "assistant", "content": answer},
            {"role": "user", "content": "Der Code kompiliert nicht. javac meldet:\n\n" + cout[:4000] +
             "\n\nBehebe die Fehler und gib die KOMPLETTE korrigierte Lösung erneut im selben Format aus."},
        ]
        emit({"type": "stage", "stage": "solve", "label": f"Korrigiere Fehler (Versuch {attempt + 1}) …", "reset": True})
        answer = ollama_chat(coder, messages, lambda t: emit({"type": "token", "stage": "solve", "text": t}))


# --------------------------------------------------------------------------- HTTP

class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def _send(self, code, body, ctype):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self._send(200, (STATIC_DIR / "index.html").read_bytes(), "text/html; charset=utf-8")
        elif self.path == "/api/status":
            info = {"vision_model": VISION_MODEL, "code_model": CODE_MODEL, "jdk": have_jdk()}
            try:
                info["models"] = ollama_models()
                info["ollama"] = True
            except Exception:
                info["models"], info["ollama"] = [], False
            self._send(200, json.dumps(info).encode(), "application/json")
        else:
            self._send(404, b"Not found", "text/plain")

    def do_POST(self):
        if self.path != "/api/solve":
            return self._send(404, b"Not found", "text/plain")
        length = int(self.headers.get("Content-Length", 0))
        try:
            req = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            return self._send(400, b"Bad JSON", "text/plain")

        self.send_response(200)
        self.send_header("Content-Type", "application/x-ndjson; charset=utf-8")
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        lock = threading.Lock()

        def emit(obj):
            try:
                with lock:
                    self.wfile.write((json.dumps(obj, ensure_ascii=False) + "\n").encode())
                    self.wfile.flush()
            except (BrokenPipeError, ConnectionResetError):
                raise ClientGone()

        try:
            solve(req, emit)
            emit({"type": "done"})
        except ClientGone:
            pass
        except Exception as e:
            try:
                emit({"type": "error", "message": str(e)})
            except ClientGone:
                pass


def main():
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    url = f"http://localhost:{PORT}"
    print(f"Java-Foto-Löser läuft auf {url}  (Beenden mit Strg+C)")
    print(f"Ollama: {OLLAMA_URL} | Vision: {VISION_MODEL} | Code: {CODE_MODEL} | JDK: {'ja' if have_jdk() else 'nein'}")
    if "--no-browser" not in sys.argv:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nBeendet.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Minecraft Ziele – Auto-Tracker
==============================
Liest die Fortschritte (advancements) und Statistiken (stats) deiner
Einzelspieler-Welt (Java Edition) und stellt sie dem Overlay bereit.

Starten:  Doppelklick auf start.bat (Windows)  oder  python3 ziele_server.py
Overlay in OBS als URL einbinden:  http://localhost:8765/

Benötigt nur Python 3 – keine zusätzlichen Pakete.
"""

from __future__ import annotations

import json
import os
import sys
import time
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path

# ------------------------------------------------------------------
# EINSTELLUNGEN
# ------------------------------------------------------------------
# Leer lassen = automatisch die zuletzt gespielte Welt verwenden.
# Oder fest eintragen, z. B.:
#   WELT = r"C:\Users\DeinName\AppData\Roaming\.minecraft\saves\Meine Welt"
WELT = ""

# Eigener .minecraft-Ordner (nur nötig, wenn du z. B. einen anderen Launcher
# wie Prism, MultiMC oder CurseForge benutzt). Leer = Standardordner.
MINECRAFT_ORDNER = ""

PORT = 8765
# ------------------------------------------------------------------

HIER = Path(__file__).resolve().parent


def standard_minecraft_ordner() -> Path:
    if MINECRAFT_ORDNER:
        return Path(MINECRAFT_ORDNER)
    if sys.platform.startswith("win"):
        return Path(os.environ.get("APPDATA", Path.home() / "AppData" / "Roaming")) / ".minecraft"
    if sys.platform == "darwin":
        return Path.home() / "Library" / "Application Support" / "minecraft"
    return Path.home() / ".minecraft"


def finde_welt() -> Path | None:
    """Gibt den Ordner der gewählten bzw. zuletzt gespielten Welt zurück."""
    if WELT:
        p = Path(WELT)
        return p if p.is_dir() else None
    saves = standard_minecraft_ordner() / "saves"
    if not saves.is_dir():
        return None
    welten = [w for w in saves.iterdir() if (w / "level.dat").is_file()]
    if not welten:
        return None
    return max(welten, key=lambda w: (w / "level.dat").stat().st_mtime)


def neueste_json(ordner: Path) -> dict:
    """Liest die zuletzt geänderte Spielerdatei (<uuid>.json) in einem Ordner."""
    if not ordner.is_dir():
        return {}
    dateien = list(ordner.glob("*.json"))
    if not dateien:
        return {}
    datei = max(dateien, key=lambda f: f.stat().st_mtime)
    try:
        with open(datei, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return {}  # Datei wird gerade geschrieben – beim nächsten Mal klappt's


def lese_zustand() -> dict:
    welt = finde_welt()
    if welt is None:
        return {"ok": False, "fehler": "Keine Welt gefunden. Pfad in ziele_server.py prüfen."}

    adv_roh = neueste_json(welt / "advancements")
    advancements = sorted(
        k for k, v in adv_roh.items() if isinstance(v, dict) and v.get("done")
    )
    stats = neueste_json(welt / "stats").get("stats", {})

    return {
        "ok": True,
        "welt": welt.name,
        "zeit": int(time.time()),
        "advancements": advancements,
        "stats": stats,
    }


class Handler(BaseHTTPRequestHandler):
    def _senden(self, code: int, typ: str, daten: bytes):
        self.send_response(code)
        self.send_header("Content-Type", typ)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(daten)

    def do_GET(self):
        pfad = self.path.split("?")[0]
        if pfad == "/state.json":
            daten = json.dumps(lese_zustand(), ensure_ascii=False).encode("utf-8")
            self._senden(200, "application/json; charset=utf-8", daten)
        elif pfad in ("/", "/overlay.html"):
            self._senden(200, "text/html; charset=utf-8", (HIER / "overlay.html").read_bytes())
        else:
            self._senden(404, "text/plain; charset=utf-8", b"Nicht gefunden")

    def log_message(self, *args):
        pass  # Konsole ruhig halten


def main():
    print("=" * 56)
    print("  Minecraft Ziele – Auto-Tracker")
    print("=" * 56)
    z = lese_zustand()
    if z["ok"]:
        print(f"  Welt:            {z['welt']}")
        print(f"  Fortschritte:    {len(z['advancements'])} erreicht")
    else:
        print(f"  ACHTUNG: {z['fehler']}")
        print(f"  Gesucht in:      {standard_minecraft_ordner() / 'saves'}")
    print()
    print(f"  Overlay-URL für OBS:   http://localhost:{PORT}/")
    print("  Zum Beenden: dieses Fenster schließen (oder Strg+C)")
    print("=" * 56)

    try:
        server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    except OSError:
        print(f"\nPort {PORT} ist belegt – läuft das Programm schon in einem anderen Fenster?")
        input("Enter zum Beenden …")
        return
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()

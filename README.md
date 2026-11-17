# ☕ Java-Foto-Löser

Lokale KI: Foto einer Java-Aufgabe einfügen → die KI liest die Aufgabe ab, schreibt die Lösung,
kompiliert sie mit `javac`, korrigiert Fehler automatisch und führt `main()` testweise aus.
**Alles läuft auf deinem eigenen Rechner**, ohne Cloud und ohne API-Key.

## Einrichtung (einmalig)

1. **Ollama** installieren: <https://ollama.com/download> (Windows, macOS, Linux)
2. **Modelle** herunterladen (Terminal/Eingabeaufforderung):
   ```bash
   ollama pull qwen2.5vl:7b
   ```
   ```bash
   ollama pull qwen2.5-coder:7b
   ```
3. **Python 3.9+** installieren: <https://www.python.org/downloads/> (unter Windows „Add to PATH“ anhaken).
   Zusätzliche Pakete braucht es nicht.
4. *(Empfohlen)* **JDK 17+** installieren, z. B. <https://adoptium.net>. Dann wird jede Lösung automatisch
   kompiliert und getestet. Ohne JDK funktioniert alles andere trotzdem.

## Starten

- **Windows:** Doppelklick auf `start.bat`
- **macOS/Linux:** `./start.sh` oder `python3 app.py`

Der Browser öffnet sich automatisch auf <http://localhost:8080>. Dann:

1. Foto mit **Strg+V** einfügen (z. B. Screenshot), hineinziehen oder anklicken und auswählen
2. Optional einen Hinweis eingeben (z. B. „nur Teilaufgabe b“ oder „ohne ArrayList“)
3. **Aufgabe lösen** klicken

Die erkannte Aufgabe wird angezeigt. Hat die KI etwas falsch gelesen, korrigierst du den Text und klickst auf
**„Mit diesem Text neu lösen“**.

## Welche Modelle für welchen Rechner?

| Rechner | Vision-Modell | Code-Modell |
|---|---|---|
| wenig RAM (8 GB) | `qwen2.5vl:3b` | `qwen2.5-coder:3b` |
| Standard (16 GB) | `qwen2.5vl:7b` | `qwen2.5-coder:7b` |
| starke GPU / 32 GB+ | `qwen2.5vl:32b` | `qwen2.5-coder:32b` |

Installierte Modelle kannst du direkt in der Oberfläche auswählen. Du kannst auch neuere Modelle verwenden;
das Vision-Modell muss aber Bilder verstehen können.

## Einstellungen (optional, per Umgebungsvariable)

| Variable | Standard | Bedeutung |
|---|---|---|
| `VISION_MODEL` | `qwen2.5vl:7b` | Modell, das das Foto liest |
| `CODE_MODEL` | `qwen2.5-coder:7b` | Modell, das die Lösung schreibt |
| `OLLAMA_URL` | `http://localhost:11434` | Adresse von Ollama |
| `PORT` | `8080` | Port der Weboberfläche |
| `MAX_FIX_ROUNDS` | `2` | Automatische Korrekturversuche bei Compilerfehlern |
| `RUN_TIMEOUT` | `10` | Sekunden, bevor `main()` abgebrochen wird |

## Tipps

- Gerades, scharfes, gut beleuchtetes Foto = deutlich bessere Ergebnisse. Ein Screenshot ist ideal.
- Lokale Modelle sind schwächer als große Cloud-KIs. Lies die Lösung durch und versuche sie zu verstehen.
  Die Erklärung unter dem Code hilft dabei.
- Programme, die mit `Scanner` auf Eingaben warten, werden beim Testlauf nach `RUN_TIMEOUT` Sekunden abgebrochen.
  Der Code kann trotzdem korrekt sein.

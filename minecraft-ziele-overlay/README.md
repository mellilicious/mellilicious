# ⛏️ Minecraft Ziele – Twitch Overlay (mit Auto-Abhaken)

Ein Overlay für OBS, das deine Minecraft-Ziele im Stream zeigt. Die Ziele mit ⚡ hakt es
**automatisch ab**, sobald du sie im Spiel erreichst, zum Beispiel „Nether betreten“ oder
„10 Diamanten sammeln“.

Funktioniert mit **Minecraft Java Edition** in **Einzelspieler-Welten**.

## Was ist in diesem Ordner?

| Datei | Wofür |
|---|---|
| `overlay.html` | Das Overlay selbst |
| `ziele_server.py` | Kleines Programm, das deine Minecraft-Welt ausliest |
| `start.bat` | Startet das Programm per Doppelklick (Windows) |

---

## Einmalige Einrichtung

### Schritt 1: Dateien herunterladen

Lade den Ordner `minecraft-ziele-overlay` herunter und speichere ihn an einem festen Ort,
zum Beispiel unter `Dokumente\Stream\minecraft-ziele-overlay`.
Die drei Dateien müssen **zusammen in einem Ordner** bleiben.

### Schritt 2: Python installieren (nur einmal nötig)

1. Gehe auf **https://www.python.org/downloads/** und klicke auf den großen gelben „Download Python“-Knopf.
2. Starte die heruntergeladene Datei.
3. **Wichtig:** Setze unten im ersten Fenster den Haken bei **„Add python.exe to PATH“**.
4. Klicke auf **„Install Now“** und warte, bis es fertig ist.

### Schritt 3: Testen

1. Starte Minecraft und lade deine Einzelspieler-Welt einmal (danach kannst du sie offen lassen).
2. Doppelklicke im Ordner auf **`start.bat`**.
3. Ein schwarzes Fenster öffnet sich. Dort sollte etwa das hier stehen:

   ```
   Welt:            Meine Welt
   Fortschritte:    12 erreicht
   Overlay-URL für OBS:   http://localhost:8765/
   ```

4. Öffne **http://localhost:8765/** in deinem Browser. Jetzt solltest du das Overlay sehen.

> **Windows-Warnung „Der Computer wurde durch Windows geschützt“?**
> Klicke auf „Weitere Informationen“ und dann auf „Trotzdem ausführen“. Die Warnung kommt bei
> jeder unbekannten .bat-Datei.
>
> **Firewall-Frage?** Das Programm ist nur auf deinem eigenen PC erreichbar. „Abbrechen“ ist in Ordnung.

### Schritt 4: In OBS einbinden

1. In OBS unter **Quellen** auf **+** klicken und **Browser** wählen. Gib der Quelle einen Namen, z. B. „Ziele“.
2. **„Lokale Datei“ NICHT anhaken.** Trage stattdessen bei **URL** ein:
   ```
   http://localhost:8765/
   ```
3. Breite **420**, Höhe **700** (die Höhe je nach Anzahl der Ziele anpassen)
4. **OK** klicken und das Overlay an die gewünschte Stelle ziehen.

---

## Bei jedem Stream

1. **`start.bat`** doppelklicken und das schwarze Fenster offen lassen (minimieren ist okay).
2. OBS starten.
3. Minecraft spielen. Die Ziele haken sich von selbst ab. 🎉

Startest du `start.bat` erst nach OBS, findet das Overlay das Programm trotzdem nach ein paar Sekunden von selbst.

### Wann wird abgehakt?

Minecraft speichert deine Fortschritte nicht sofort, sondern:
- automatisch etwa **alle 5 Minuten**
- sofort, wenn du **ESC** drückst (Pausenmenü)

**Tipp:** Hast du gerade etwas geschafft? Drück kurz ESC und dann wieder zurück ins Spiel.
Spätestens nach 3 Sekunden erscheint das „Ziel erreicht!“-Popup.

---

## Ziele bearbeiten

Rechtsklick auf die Browserquelle in OBS → **Interagieren**. In dem Fenster:

| Aktion | Wirkung |
|---|---|
| Taste **E** | Bearbeiten-Menü ein/aus |
| Klick auf ein Ziel | von Hand abhaken (bei Mengen-Zielen: +1) |
| Rechtsklick auf ein Ziel | Fortschritt −1 bzw. Haken entfernen |
| Mausrad über einem Ziel | Fortschritt ±1 |

Im Menü:
- Oben siehst du, ob der **Auto-Tracker verbunden** ist (grün) und welche Welt er gerade ausliest.
- Unter **Vorlage** findest du fertige Ziele mit ⚡, zum Beispiel „Netherfestung finden“,
  „Enderperlen sammeln (12)“ oder „Zombies besiegen (20)“. Vorlage auswählen und dann **+ Hinzufügen** klicken.
  Text, Symbol und Anzahl kannst du vorher noch ändern.
- **„— eigenes Ziel —“** legt ein Ziel ohne ⚡ an, das du von Hand abhakst, z. B. „Basis bauen“.
- Mit ▲ ▼ ✖ sortierst und löschst du Ziele.

⚠️ Blende das Menü mit **E** wieder aus, bevor du das Interagieren-Fenster schließt.
Sonst sehen es deine Zuschauer im Stream.

Alles wird automatisch gespeichert und bleibt auch nach einem Neustart von OBS erhalten.

### Neue Welt?

Das Programm nimmt immer die **zuletzt gespielte Welt**. Wechselst du die Welt, werden
die ⚡-Ziele automatisch zurückgesetzt und neu ausgelesen. Deine selbst abgehakten Ziele bleiben, wie sie sind.

---

## Probleme?

| Problem | Lösung |
|---|---|
| Schwarzes Fenster geht sofort wieder zu oder zeigt „python wurde nicht gefunden“ | Python neu installieren und den Haken bei **„Add python.exe to PATH“** setzen (Schritt 2) |
| „Keine Welt gefunden“ | Lade die Welt einmal in Minecraft. Mit einem anderen Launcher (Prism, MultiMC, CurseForge, Modrinth) siehe unten. |
| Falsche Welt wird gelesen | Lade die richtige Welt einmal kurz oder trag sie fest ein (siehe unten) |
| Im Menü steht „nicht verbunden“ | Läuft `start.bat`? Ist bei OBS die URL `http://localhost:8765/` eingetragen? |
| „Port 8765 ist belegt“ | Das Programm läuft schon in einem anderen Fenster. Schließe eins davon. |
| Ziel wird nicht abgehakt | Drück in Minecraft kurz ESC (dann speichert das Spiel) und warte 3 Sekunden |

### Welt oder Launcher-Ordner fest einstellen

Öffne `ziele_server.py` mit einem Texteditor (Rechtsklick → „Bearbeiten“ oder „Öffnen mit → Editor“).
Oben stehen zwei Einstellungen:

```python
WELT = r"C:\Users\DeinName\AppData\Roaming\.minecraft\saves\Meine Welt"

MINECRAFT_ORDNER = r"C:\Users\DeinName\AppData\Roaming\PrismLauncher\instances\1.21\.minecraft"
```

- **WELT:** genau diese eine Welt verwenden
- **MINECRAFT_ORDNER:** bei anderen Launchern. Das ist der Ordner, in dem `saves` liegt.

Den Ordner findest du in Minecraft unter **Einzelspieler → Welt auswählen → Bearbeiten → Weltordner öffnen**.
Speichern und `start.bat` neu starten.

---

## Für Bastler: Startliste und eigene Auto-Ziele

In `overlay.html` stehen im `const DEFAULT = { ... }`-Block die Standardziele und darunter die `PRESETS` (Vorlagen).

```js
{ emoji:"🔥", text:"Nether betreten", max:0,  auto:{adv:"minecraft:story/enter_the_nether"} }
{ emoji:"💎", text:"Diamanten",       max:10, auto:{stat:"minecraft:picked_up", items:["minecraft:diamond"]} }
```

- `adv`: die ID eines Fortschritts. Alle IDs findest du im Minecraft-Wiki unter „Fortschritte“.
- `stat`: eine Statistik-Kategorie, z. B. `minecraft:mined` (abgebaut), `minecraft:picked_up` (aufgesammelt),
  `minecraft:crafted` (hergestellt), `minecraft:killed` (besiegt). `items` wird zusammengezählt.
- `max: 0` heißt „einfach abhaken“, eine Zahl größer als 0 macht ein Mengen-Ziel mit Fortschrittsbalken.

Die Liste wird geladen, wenn noch nichts gespeichert ist oder du im Menü **Alles zurücksetzen** klickst.
Farben stehen oben im `<style>`-Block unter `:root`.

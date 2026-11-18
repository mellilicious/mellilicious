# ⛏️ Minecraft Ziele – Twitch Overlay (mit Auto-Abhaken)

Ein Overlay für OBS, das deine Minecraft-Ziele im Stream zeigt. Die Ziele mit ⚡ hakt es
**automatisch ab**, sobald du sie im Spiel erreichst, zum Beispiel „Nether betreten“ oder
„10 Diamanten sammeln“.

Funktioniert mit **Minecraft Java Edition** in **Einzelspieler-Welten**.

Es gibt zwei Wege. Du brauchst nur **einen** davon:

| | **A) Browser-Version** | **B) Python-Version** |
|---|---|---|
| Was du brauchst | nur `overlay.html` + Chrome oder Edge | alle Dateien + Python |
| In OBS als | Fensteraufnahme + Chroma Key | Browserquelle (echt transparent) |
| Nachteil | Chrome-Fenster muss sichtbar bleiben | Python muss installiert sein |

---

# A) Browser-Version (ohne Python)

Du brauchst **nur die Datei `overlay.html`** und **Google Chrome** oder **Microsoft Edge**.
Firefox und Opera GX funktionieren nicht, weil sie keine Ordner auslesen können.

## Einmalige Einrichtung

### Schritt 1: Datei speichern

Speichere `overlay.html` an einem festen Ort, zum Beispiel `Dokumente\Stream\overlay.html`.

### Schritt 2: In Chrome öffnen

Rechtsklick auf `overlay.html` → **Öffnen mit** → **Google Chrome** (oder Microsoft Edge).

Du siehst jetzt das Overlay auf einem **pinken Hintergrund**. Das ist Absicht: Den pinken
Hintergrund schneidet OBS später weg.

### Schritt 3: Minecraft-Ordner umziehen und freigeben

**Warum?** Minecraft speichert deine Welten normalerweise in `%appdata%\.minecraft`.
Chrome und Edge sperren aus Sicherheitsgründen **alles im Ordner `AppData`**.
Deshalb kannst du den Ordner dort nicht freigeben. Die Lösung: Du sagst dem Minecraft Launcher
einmal, dass er einen anderen Ordner benutzen soll.

**3a) Neuen Ordner anlegen**

Erstelle im Explorer den Ordner **`C:\Minecraft`**.
(Nimm besser nicht „Dokumente“ oder „Desktop“, wenn die mit OneDrive synchronisiert werden.)

**3b) Launcher umstellen**

1. Öffne den **Minecraft Launcher** und klicke oben auf **Installationen**.
2. Fahre mit der Maus über die Installation, mit der du spielst (meist **„Neueste Version“**),
   und klicke rechts auf **„⋯“** → **Bearbeiten**.
3. Bei **Spielverzeichnis** klickst du auf **Durchsuchen** und wählst `C:\Minecraft`.
4. Klicke unten auf **Speichern**.

**3c) Deine Welt mitnehmen**

Der neue Ordner ist noch leer. So kopierst du deine bisherige Welt und deine Einstellungen hinein:

1. Drücke **Windows-Taste + R**, tippe `%appdata%\.minecraft` ein und drücke Enter.
2. Kopiere den Ordner **`saves`** und die Datei **`options.txt`** (deine Einstellungen und Tastenbelegung).
   Wenn du Ressourcenpakete benutzt, nimm auch **`resourcepacks`** mit.
3. Füge alles in `C:\Minecraft` ein.

Starte Minecraft einmal über den Launcher und prüfe, ob deine Welt in der Liste ist.
Die alte Kopie in `AppData` bleibt als Sicherung liegen. Spiel ab jetzt aber nur noch über diese Installation,
sonst landet der Fortschritt im alten Ordner.

**3d) Ordner im Overlay freigeben**

1. Klicke im Overlay auf den grünen Knopf **📁 Minecraft-Ordner wählen**.
2. Wähle **`C:\Minecraft\saves`** und klicke auf **„Ordner auswählen“**.
3. Chrome fragt, ob die Seite Dateien ansehen darf. Klicke auf **„Dateien ansehen“** bzw. **„Zulassen“**.
   Wenn dir die Option **„Bei jedem Besuch zulassen“** angezeigt wird, wähle diese.

Oben im Menü steht jetzt grün **„Auto-Tracker: verbunden · Welt …“** mit dem Namen deiner zuletzt gespielten Welt. 🎉

> **Anderer Launcher** (Prism, CurseForge, Modrinth …)? Diese Launcher speichern meist auch in `AppData`.
> In ihren Einstellungen kannst du den Speicherort für Instanzen ändern, zum Beispiel auf `C:\Minecraft`.

### Schritt 4: Menü ausblenden

Drücke die Taste **E**. Jetzt ist nur noch das Overlay auf Pink zu sehen.

### Schritt 5: Fenster vorbereiten

- Zieh den Tab aus Chrome heraus, sodass er **ein eigenes Fenster** ist.
- Mach das Fenster etwa so groß, dass das Overlay gut hineinpasst.
- **Wichtig:** Das Fenster darf **nicht minimiert** und **nicht komplett von anderen Fenstern verdeckt** werden.
  Sonst „schläft“ Chrome ein und das Overlay friert im Stream ein.
  Am besten legst du es auf einen **zweiten Bildschirm**. Mit nur einem Bildschirm schiebst du es
  in eine Ecke, wo ein kleines Stück davon sichtbar bleibt.

### Schritt 6: In OBS einbinden

1. In OBS unter **Quellen** auf **+** klicken und **Fensteraufnahme** wählen. Gib ihr einen Namen, z. B. „Ziele“.
2. Bei **Fenster** wählst du **`[chrome.exe]: Minecraft Ziele Overlay`** (bzw. `[msedge.exe]`).
3. Bei **Aufnahmemethode** wählst du **„Windows 10 (1903 und neuer)“**.
4. **Mauszeiger aufnehmen** ausschalten und auf **OK** klicken.
5. **Pinken Hintergrund entfernen:** Rechtsklick auf die Quelle → **Filter** → unten bei „Effektfilter“ auf **+** →
   **Chroma Key**. Bei **Key-Farbtyp** wählst du **Magenta**. Fertig, der Hintergrund ist weg.
6. **Chrome-Leisten abschneiden:** Halte im Vorschaubild **Alt** gedrückt und zieh am roten Rahmen der Quelle
   von oben nach unten, bis die Tab- und Adressleiste weg sind. Genauso rechts und unten.

## Bei jedem Stream

1. `overlay.html` in Chrome öffnen (am einfachsten speicherst du sie dir als **Lesezeichen**).
2. Falls Chrome fragt: auf **▶ Zugriff auf „saves“ erlauben** klicken. Du musst den Ordner **nicht** neu suchen.
3. Taste **E** drücken (Menü weg) und das Fenster an seinen Platz schieben.
4. OBS starten und Minecraft spielen.

**Kurz testen:** Verdecke das Chrome-Fenster und schau, ob sich das Overlay in OBS noch bewegt,
zum Beispiel wenn ein Ziel abgehakt wird. Wenn es einfriert, lass mehr vom Fenster sichtbar.

---

# B) Python-Version

Hier brauchst du alle Dateien aus diesem Ordner:

| Datei | Wofür |
|---|---|
| `overlay.html` | Das Overlay selbst |
| `ziele_server.py` | Kleines Programm, das deine Minecraft-Welt ausliest |
| `start.bat` | Startet das Programm per Doppelklick (Windows) |

### Schritt 1: Python installieren (nur einmal nötig)

1. Gehe auf **https://www.python.org/downloads/** und klicke auf den großen gelben „Download Python“-Knopf.
2. Starte die heruntergeladene Datei.
3. **Wichtig:** Setze unten im ersten Fenster den Haken bei **„Add python.exe to PATH“**.
4. Klicke auf **„Install Now“**.

### Schritt 2: Programm starten

Lade deine Welt einmal in Minecraft und doppelklicke auf **`start.bat`**
(oder direkt auf `ziele_server.py`). Im schwarzen Fenster steht der Name deiner Welt.
Das Fenster bleibt während des Streams offen.

### Schritt 3: In OBS einbinden

Füge in OBS eine **Browser**-Quelle hinzu. **„Lokale Datei“ NICHT anhaken**, sondern als URL
`http://localhost:8765/` eintragen. Breite 420, Höhe 700.

---

## Wann wird abgehakt? (beide Versionen)

Minecraft speichert deine Fortschritte nicht sofort, sondern:
- automatisch etwa **alle 5 Minuten**
- sofort, wenn du **ESC** drückst (Pausenmenü)

**Tipp:** Hast du gerade etwas geschafft? Drück kurz ESC und dann wieder zurück ins Spiel.
Spätestens nach 3 Sekunden erscheint das „Ziel erreicht!“-Popup.

Es wird immer die **zuletzt gespielte Welt** ausgelesen. Wechselst du die Welt, werden
die ⚡-Ziele automatisch zurückgesetzt. Deine selbst abgehakten Ziele bleiben, wie sie sind.

---

## Ziele bearbeiten

**Browser-Version:** direkt im Chrome-Fenster.
**Python-Version:** Rechtsklick auf die Browserquelle in OBS → **Interagieren**.

Dort gilt:

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

⚠️ Blende das Menü danach mit **E** wieder aus. Sonst sehen es deine Zuschauer im Stream.

Alles wird automatisch gespeichert und bleibt auch nach einem Neustart von OBS erhalten.

---

## Probleme?

| Problem | Lösung |
|---|---|
| **Browser:** kein grüner Knopf „Minecraft-Ordner wählen“ | Du benutzt nicht Chrome oder Edge. Öffne die Datei mit Chrome oder Edge. |
| **Browser:** „Diese Seite kann diesen Ordner nicht öffnen, da er Systemdateien enthält“ | Der Ordner liegt in `AppData`. Das sperrt Chrome. Zieh den Minecraft-Ordner um (Schritt 3). |
| **Browser:** „in diesem Ordner ist keine Welt“ | Du hast einen falschen Ordner gewählt, oder die Welt wurde noch nicht kopiert (Schritt 3c). Klicke auf „📁 Anderen Ordner wählen“ und nimm `C:\Minecraft\saves`. |
| **Browser:** Ziele haken sich nicht mehr ab | Spielst du über die umgestellte Installation (Schritt 3b)? Sonst speichert Minecraft wieder im alten Ordner. |
| **Browser:** Overlay friert im Stream ein | Das Chrome-Fenster ist minimiert oder ganz verdeckt. Lass es sichtbar (siehe Schritt 5). |
| **Browser:** pinke Ränder um die Schrift | Im Chroma-Key-Filter den Wert **Ähnlichkeit** etwas erhöhen |
| **Python:** Schwarzes Fenster geht sofort wieder zu oder zeigt „python wurde nicht gefunden“ | Python neu installieren und den Haken bei **„Add python.exe to PATH“** setzen (Schritt 2) |
| **Python:** „Keine Welt gefunden“ | Lade die Welt einmal in Minecraft. Mit einem anderen Launcher (Prism, MultiMC, CurseForge, Modrinth) siehe unten. |
| Falsche Welt wird gelesen | Lade die richtige Welt einmal kurz oder trag sie fest ein (siehe unten) |
| **Python:** Im Menü steht „nicht verbunden“ | Läuft `start.bat`? Ist bei OBS die URL `http://localhost:8765/` eingetragen? |
| **Python:** „Port 8765 ist belegt“ | Das Programm läuft schon in einem anderen Fenster. Schließe eins davon. |
| Ziel wird nicht abgehakt | Drück in Minecraft kurz ESC (dann speichert das Spiel) und warte 3 Sekunden |

### Python: Welt oder Launcher-Ordner fest einstellen

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

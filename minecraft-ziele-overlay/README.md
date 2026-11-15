# ⛏️ Minecraft Ziele – Twitch Overlay

Ein Overlay für OBS / Streamlabs, das deine Minecraft-Ziele im Stream zeigt:
Checkliste, Mengen-Fortschritt (z. B. `4/10 Diamanten`), XP-Leiste für den Gesamtfortschritt
und ein „Ziel erreicht!“-Popup mit Pixel-Konfetti, sobald du etwas schaffst.

## Einrichten in OBS

1. **Quellen → + → Browser**
2. Haken bei **Lokale Datei** setzen und `overlay.html` auswählen
3. Breite **420**, Höhe **700** (Höhe je nach Anzahl der Ziele anpassen)
4. Fertig – der Hintergrund ist transparent.

## Ziele bearbeiten (live während des Streams)

Rechtsklick auf die Browserquelle → **Interagieren**. In dem Fenster:

| Aktion | Wirkung |
|---|---|
| Klick auf ein Ziel | abhaken / zurücknehmen (bei Mengen-Zielen: +1) |
| Rechtsklick auf ein Ziel | Fortschritt −1 bzw. Haken entfernen |
| Mausrad über einem Ziel | Fortschritt ±1 |
| Taste **E** | Bearbeiten-Menü ein/aus: Überschrift, Untertitel, Ziele hinzufügen, sortieren, löschen |

Das Menü ist nur im Interagieren-Fenster sichtbar, solange es offen ist – also vor dem
Schließen mit **E** wieder ausblenden, sonst sehen es die Zuschauer.

Alle Änderungen werden automatisch gespeichert und bleiben auch nach einem Neustart von OBS erhalten.

## Startliste ändern

Ganz unten in `overlay.html` steht `const DEFAULT = { ... }`. Dort kannst du die Standardziele
eintragen. `max: 0` heißt „einfach abhaken“, eine Zahl > 0 macht ein Mengen-Ziel mit Fortschrittsbalken.
Die Liste wird geladen, wenn noch nichts gespeichert ist oder du im Menü **Alles zurücksetzen** klickst.

Farben stehen oben im `<style>`-Block unter `:root`.

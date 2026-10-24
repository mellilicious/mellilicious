// Inhalt: Konzepte der IT (KIT) 475.007, Module Zahlendarstellung und Schaltwerke
const COURSE = {
 "meta": {
  "fach": "Konzepte der IT (KIT) · 475.007"
 },
 "themen": [
  {
   "id": "z1",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Bits, Wertigkeit, MSB und LSB",
   "relevanz": "mittel",
   "quelle": "Skript S. 40–41",
   "abhaengigVon": [],
   "lernziele": [
    "Ich kann die Wertigkeit jeder Bitstelle angeben (2⁰ bis 2⁷).",
    "Ich kann MSB und LSB benennen und weiß, was das LSB über gerade/ungerade sagt.",
    "Ich weiß, dass n Bit genau 2ⁿ Bitmuster ergeben."
   ],
   "erklaerung": "<p>Im Dezimalsystem hat jede Stelle eine Wertigkeit: 793 = 7·10² + 9·10¹ + 3·10⁰. Im Binärsystem ist es genau gleich, nur mit der <span class=\"c-v\">Basis 2</span> statt 10. Es gibt nur die Ziffern 0 und 1. Eine Ziffer heißt <b>Bit</b> (binary digit).</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td>2⁷=128</td><td>2⁶=64</td><td>2⁵=32</td><td>2⁴=16</td><td>2³=8</td><td>2²=4</td><td>2¹=2</td><td>2⁰=1</td></tr>\n<tr><th class=\"l\">Name</th><td class=\"c-p\">MSB</td><td></td><td></td><td></td><td></td><td></td><td></td><td class=\"c-p\">LSB</td></tr></table></div>\n<ul>\n<li><b>MSB</b> (Most Significant Bit) = ganz links, höchste Wertigkeit.</li>\n<li><b>LSB</b> (Least Significant Bit) = ganz rechts. Vorzeichenlos gilt: LSB = 0 heißt gerade, LSB = 1 heißt ungerade.</li>\n<li>Schreibweise: Die Basis steht tiefgestellt. 11₁₀ ist elf, 11₂ ist 2 + 1 = 3.</li>\n</ul>\n<div class=\"why\"><b>Warum ist die Bitanzahl so wichtig?</b>In der Mathematik sind Zahlen unendlich. Ein Rechner hat aber eine feste Anzahl Leitungen. Mit n Bit gibt es genau 2ⁿ verschiedene Bitmuster, mit 4 Bit also 16. Was nicht in diese Muster passt, kann der Rechner nicht darstellen. Darum kommen bei jeder Aufgabe die Fragen „Mit wie vielen Bit?“ und „Passt das Ergebnis noch?“.</div>",
   "profLevel": "<p>Warum Basis 2? Ein Transistor kennt zuverlässig nur zwei Zustände (Spannung hoch/niedrig). Mehr Stufen wären störanfälliger. Nachfrage eines Prüfers: „Wie viele Bit brauche ich für k verschiedene Werte?“ → die kleinste Zahl n mit 2ⁿ ≥ k, also n = ⌈log₂ k⌉. Für 1000 Werte: 2⁹ = 512 reicht nicht, 2¹⁰ = 1024 reicht → 10 Bit.</p>",
   "typischeFehler": [
    "Die Stelle ganz rechts hat Wertigkeit 2⁰ = 1, nicht 2¹.",
    "Mit n Bit ist die größte vorzeichenlose Zahl 2ⁿ − 1 (nicht 2ⁿ), weil die 0 auch ein Muster belegt."
   ]
  },
  {
   "id": "z2",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Die vier Darstellungen im Vergleich",
   "relevanz": "hoch",
   "quelle": "Skript S. 41–46",
   "abhaengigVon": [
    "z1"
   ],
   "lernziele": [
    "Ich kenne die Wertebereiche aller vier Darstellungen für n Bit.",
    "Ich kann ein Bitmuster in jeder Darstellung als Dezimalzahl lesen.",
    "Ich kann begründen, warum das Zweierkomplement Standard ist."
   ],
   "erklaerung": "<p>Dasselbe Bitmuster kann je nach Darstellung etwas ganz anderes bedeuten. Die Tabelle zeigt alle 16 Muster mit 4 Bit:</p>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th>Bitmuster</th><th>vorzeichenlos</th><th>Vorzeichen-Betrag</th><th>Exzess-7</th><th>Zweierkomplement</th></tr>\n<tr><td class=\"mono\">0000</td><td>0</td><td>+0</td><td>−7</td><td>0</td></tr>\n<tr><td class=\"mono\">0001</td><td>1</td><td>1</td><td>−6</td><td>1</td></tr>\n<tr><td class=\"mono\">0010</td><td>2</td><td>2</td><td>−5</td><td>2</td></tr>\n<tr><td class=\"mono\">0011</td><td>3</td><td>3</td><td>−4</td><td>3</td></tr>\n<tr><td class=\"mono\">0100</td><td>4</td><td>4</td><td>−3</td><td>4</td></tr>\n<tr><td class=\"mono\">0101</td><td>5</td><td>5</td><td>−2</td><td>5</td></tr>\n<tr><td class=\"mono\">0110</td><td>6</td><td>6</td><td>−1</td><td>6</td></tr>\n<tr><td class=\"mono\">0111</td><td>7</td><td>7</td><td>0</td><td>7</td></tr>\n<tr><td class=\"mono\">1000</td><td>8</td><td class=\"c-o\">−0</td><td>1</td><td class=\"c-o\">−8</td></tr>\n<tr><td class=\"mono\">1001</td><td>9</td><td>−1</td><td>2</td><td>−7</td></tr>\n<tr><td class=\"mono\">1010</td><td>10</td><td>−2</td><td>3</td><td>−6</td></tr>\n<tr><td class=\"mono\">1011</td><td>11</td><td>−3</td><td>4</td><td>−5</td></tr>\n<tr><td class=\"mono\">1100</td><td>12</td><td>−4</td><td>5</td><td>−4</td></tr>\n<tr><td class=\"mono\">1101</td><td>13</td><td>−5</td><td>6</td><td>−3</td></tr>\n<tr><td class=\"mono\">1110</td><td>14</td><td>−6</td><td>7</td><td>−2</td></tr>\n<tr><td class=\"mono\">1111</td><td>15</td><td>−7</td><td>8</td><td>−1</td></tr>\n</table></div>\n\n<div class=\"scroll\"><table class=\"t\">\n<tr><th class=\"l\">Darstellung</th><th class=\"l\">Idee</th><th>Bereich mit n Bit</th><th>8 Bit</th></tr>\n<tr><td class=\"l\"><b>vorzeichenlos</b> (C: unsigned int)</td><td class=\"l\">alle Bits haben ihre normale Wertigkeit</td><td>0 … 2ⁿ − 1</td><td>0 … 255</td></tr>\n<tr><td class=\"l\"><b>Vorzeichen-Betrag</b></td><td class=\"l\">MSB ist das Vorzeichen (0 = +, 1 = −), die restlichen n−1 Bit sind der Betrag</td><td>−(2ⁿ⁻¹−1) … +(2ⁿ⁻¹−1)</td><td>−127 … +127</td></tr>\n<tr><td class=\"l\"><b>Exzess-E</b> (offset binary)</td><td class=\"l\">zuerst vorzeichenlos lesen, dann den Exzess E abziehen</td><td>−E … 2ⁿ−1−E</td><td>Exzess-127: −127 … +128</td></tr>\n<tr><td class=\"l\"><b>Zweierkomplement</b> (C: int)</td><td class=\"l\">MSB hat die Wertigkeit <span class=\"c-o\">−2ⁿ⁻¹</span>, alle anderen sind normal</td><td>−2ⁿ⁻¹ … +(2ⁿ⁻¹−1)</td><td>−128 … +127</td></tr>\n</table></div>\n\n<div class=\"warn\"><b>Fallen:</b> Bei Vorzeichen-Betrag gibt es die Null zweimal (+0 = 0000 und −0 = 1000). Im Zweierkomplement gibt es sie nur einmal. Deshalb ist der Bereich dort unsymmetrisch: Es gibt eine negative Zahl mehr (−8 … +7). Exzess-127 mit 8 Bit verwendet man bei IEEE 754 für den Exponenten. Als sinnvollen Exzess nimmt man bei n Bit 2ⁿ⁻¹ oder 2ⁿ⁻¹ − 1.</div>\n<div class=\"why\"><b>Warum ist das Zweierkomplement Standard?</b>Positive Zahlen sehen gleich aus wie vorzeichenlose. Negative Zahlen haben immer MSB = 1, man erkennt das Vorzeichen also sofort. Der eigentliche Grund ist aber dieser: Man kann mit <b>demselben Addierwerk</b> rechnen wie bei vorzeichenlosen Zahlen und braucht keine Zusatzlogik. Bei Vorzeichen-Betrag oder Exzess bräuchte man Extra-Schaltungen.</div>",
   "profLevel": "<p>Exzess-Darstellung hat einen praktischen Vorteil: Die Bitmuster sind in derselben Reihenfolge sortiert wie die Zahlen (0000 = kleinste, 1111 = größte). Darum verwendet IEEE 754 sie für den Exponenten – man kann Gleitkommazahlen dann fast wie Ganzzahlen vergleichen. Beim Zweierkomplement stimmt die Sortierung nicht (1111 = −1 ist „größer“ als 0111 = 7 als Bitmuster). Mögliche Prüfernachfrage: „Warum ist der Bereich im Zweierkomplement unsymmetrisch?“ → weil die 0 bei den „positiven“ Mustern (MSB = 0) mitzählt.</p>",
   "typischeFehler": [
    "Exzess vergessen abzuziehen.",
    "Vorzeichen-Betrag und Zweierkomplement verwechseln: 1011 ist −3 (VZ-Betrag) bzw. −5 (Zweierkomplement).",
    "Bereich 8-Bit-Zweierkomplement als −127…127 angeben (richtig: −128…127)."
   ]
  },
  {
   "id": "z3",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Umrechnen: Horner-Schema und Wertigkeiten",
   "relevanz": "hoch",
   "quelle": "Skript S. 41–44 · Blatt 2 IV",
   "abhaengigVon": [
    "z1",
    "z2"
   ],
   "lernziele": [
    "Ich kann eine Dezimalzahl mit dem Horner-Schema in ein 8-Bit-Muster umrechnen.",
    "Ich kann ein Bitmuster über die Wertigkeiten in eine Dezimalzahl zurückrechnen.",
    "Ich kann negative Zahlen in Vorzeichen-Betrag und Exzess umrechnen.",
    "Ich prüfe vorher, ob die Zahl überhaupt darstellbar ist."
   ],
   "erklaerung": "<h4>Binär → dezimal: Wertigkeiten addieren</h4>\n<p><span class=\"c-v\">Werkzeug:</span> Unter jedes Bit die Wertigkeit schreiben und nur dort addieren, wo eine 1 steht. Man multipliziert ja nur mit 1 oder mit 0.</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>\n<tr><th class=\"l\">Bit</th><td class=\"c-p\">1</td><td>0</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td>0</td><td>0</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td></tr></table></div>\n<p class=\"mono\">1011 0011₂ = 128 + 32 + 16 + 2 + 1 = <span class=\"res\">179₁₀</span></p>\n<p><b>Im Zweierkomplement</b> ist es dasselbe, nur hat das MSB die Wertigkeit <span class=\"c-o\">−128</span>:</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td class=\"c-o\">−128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>\n<tr><th class=\"l\">Bit</th><td class=\"c-p\">1</td><td>0</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td>0</td><td class=\"c-p\">1</td><td>0</td><td class=\"c-p\">1</td></tr></table></div>\n<p class=\"mono\">1011 0101₂ = −128 + 32 + 16 + 4 + 1 = <span class=\"res\">−75₁₀</span></p>\n<p><b>Vorzeichen-Betrag</b>, 4 Bit: 1011₂ → das MSB ist 1, also negativ. Der Betrag ist 011 = 2 + 1 = 3 → <span class=\"res\">−3₁₀</span></p>\n<p><b>Exzess-7</b>, 4 Bit: 1011₂ = 8 + 2 + 1 = 11 (vorzeichenlos), dann 11 − 7 = <span class=\"res\">4₁₀</span></p>\n\n<h4>Dezimal → binär: Horner-Schema</h4>\n<div class=\"q3\">\n<span><b>Was wollen wir?</b> Herausfinden, welche Zweierpotenzen in der Zahl stecken.</span>\n<span><b>Werkzeug:</b> Immer wieder durch 2 teilen. Der Rest (0 oder 1) ist jeweils das nächste Bit, angefangen beim LSB.</span>\n<span><b>Wie genau?</b> Die Reste <b>von unten nach oben</b> lesen und dann vorne mit Nullen auf die gewünschte Bitanzahl auffüllen.</span>\n</div>\n<div class=\"chain\">\n<div><span>38 : 2 = 19</span><span class=\"op\">Rest 0 ← LSB</span></div>\n<div><span>19 : 2 = 9</span><span class=\"op\">Rest 1</span></div>\n<div><span>9 : 2 = 4</span><span class=\"op\">Rest 1</span></div>\n<div><span>4 : 2 = 2</span><span class=\"op\">Rest 0</span></div>\n<div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div>\n<div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div>\n</div>\n<p>Von unten nach oben gelesen ergibt das 100110₂, mit 8 Bit <span class=\"res mono\">0010 0110₂</span>. Probe: 32 + 4 + 2 = 38 ✓</p>\n<div class=\"why\"><b>Warum von unten nach oben?</b>Der erste Rest sagt, ob die Zahl gerade ist. Das ist das LSB, also das Bit ganz rechts. Jede weitere Division schiebt die Zahl um eine Stelle nach rechts. Der letzte Rest ist deshalb das höchste Bit und kommt ganz nach links.</div>\n\n<h4>Negative Zahlen umrechnen</h4>\n<ul>\n<li><b>Vorzeichen-Betrag:</b> −23 → den Betrag 23 mit Horner umrechnen: 10111, mit 7 Bit 001 0111. Davor das MSB 1 setzen → <span class=\"mono\">1001 0111</span>.</li>\n<li><b>Exzess-127:</b> −112 → zuerst den Exzess addieren: −112 + 127 = 15. Dann 15 vorzeichenlos umrechnen → <span class=\"mono\">0000 1111</span>.</li>\n<li><b>Zweierkomplement:</b> den Betrag umrechnen und dann das Zweierkomplement bilden (siehe A4).</li>\n<li>Vorher immer prüfen, ob die Zahl in den Bereich passt. Ein Beispiel: 214 geht im 8-Bit-Zweierkomplement <span class=\"c-o\">nicht</span>, weil das Maximum 127 ist.</li>\n</ul>",
   "profLevel": "<p>„Horner-Schema“ heißt das Verfahren, weil eine Binärzahl als verschachtelte Klammer geschrieben werden kann: 38 = ((((1·2 + 0)·2 + 0)·2 + 1)·2 + 1)·2 + 0. Teilt man durch 2, schält man von innen nach außen die letzte Ziffer ab – deshalb ist der erste Rest das LSB. Gegenrichtung ohne Tabelle: Man liest von links und rechnet „mal 2, plus nächstes Bit“: 1 → 2 → 4 → 9 → 19 → 38.</p>",
   "typischeFehler": [
    "Reste in falscher Reihenfolge gelesen.",
    "Führende Nullen vergessen (die Angabe verlangt 8 Bit!).",
    "Zahl ist im Bereich gar nicht darstellbar (z. B. 214 im 8-Bit-Zweierkomplement)."
   ]
  },
  {
   "id": "z4",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Zweierkomplement bilden",
   "relevanz": "hoch",
   "quelle": "Skript S. 44–46",
   "abhaengigVon": [
    "z2",
    "z3"
   ],
   "lernziele": [
    "Ich kann das Zweierkomplement bilden (invertieren und +1).",
    "Ich kann eine negative Dezimalzahl in 8-Bit-Zweierkomplement umrechnen.",
    "Ich kann ein Zweierkomplement-Muster mit MSB = −128 zurückrechnen.",
    "Ich kann begründen, warum „invertieren + 1“ das Vorzeichen wechselt."
   ],
   "erklaerung": "<p class=\"formula\">alle Bits invertieren, dann + 1 (ein Übertrag aus dem MSB fällt weg)</p>\n<p>Beispiel: Gesucht ist −38 im 8-Bit-Zweierkomplement. −38 liegt in −128 … 127, passt also ✓</p>\n<div class=\"step\"><h4 data-n=\"1\">Betrag mit Horner umrechnen</h4><p class=\"mono\">38₁₀ = <span class=\"c-g\">0010 0110</span></p></div>\n<div class=\"step\"><h4 data-n=\"2\">Jedes Bit umdrehen</h4><p>Aus 0 wird 1 und aus 1 wird 0.</p></div>\n<div class=\"step\"><h4 data-n=\"3\">1 addieren</h4>\n<div class=\"bits\">  <span class=\"c-g\">0010 0110</span>   (+38)\n  <span class=\"c-p\">1101 1001</span>   (alle Bits invertiert)\n+         <span class=\"c-p\">1</span>   (plus eins)\n  ─────────\n  <span class=\"c-r\">1101 1010</span>   (−38)</div></div>\n<p><b>Probe:</b> −128 + 64 + 16 + 8 + 2 = −38 ✓. Umgekehrt funktioniert es genauso: Bildet man von 1101 1010 das Zweierkomplement, kommt 0010 0110 = +38 heraus.</p>\n<p>Sonderfall Null: Aus 0000 0000 wird invertiert 1111 1111, plus 1 ergibt das <span class=\"c-o\">1</span> 0000 0000. Der Übertrag fällt weg, und es bleibt 0 ✓</p>\n<div class=\"why\"><b>Warum funktioniert „invertieren + 1“?</b>Eine Zahl plus ihre invertierte Version ergibt immer 1111 1111, also −1 im Zweierkomplement. Daraus folgt: x + invertiert(x) = −1. Zählt man auf beiden Seiten 1 dazu, steht da x + (invertiert(x) + 1) = 0. Der Teil in der Klammer ist also genau −x.</div>\n<div class=\"warn\"><b>Begriffe:</b> „Zweierkomplement“ ist die <i>Darstellung</i>. „Das Zweierkomplement bilden“ ist der <i>Algorithmus</i> für den Vorzeichenwechsel.</div>",
   "profLevel": "<p>Mathematisch rechnet ein n-Bit-Addierwerk „modulo 2ⁿ“: Alles über 2ⁿ fällt weg. −x und 2ⁿ − x sind modulo 2ⁿ dasselbe. Das Zweierkomplement von x ist genau 2ⁿ − x (z. B. 256 − 38 = 218 = 1101 1010). Sonderfall für Prüfer: Das Zweierkomplement von −128 (1000 0000) ist wieder 1000 0000, weil +128 nicht darstellbar ist.</p>",
   "typischeFehler": [
    "Nur invertiert, +1 vergessen (das wäre das Einerkomplement).",
    "+1 an der falschen Stelle addiert (immer beim LSB).",
    "Positive Zahlen auch „komplementiert“ – positive bleiben wie vorzeichenlos."
   ]
  },
  {
   "id": "z5",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Hexadezimaldarstellung",
   "relevanz": "hoch",
   "quelle": "Blatt 2 VII (nicht im Skript-Kapitel)",
   "abhaengigVon": [
    "z3"
   ],
   "lernziele": [
    "Ich kann ein Bitmuster in Viererblöcken in Hex umwandeln und zurück.",
    "Ich kenne A–F als 10–15.",
    "Ich kann eine 2-stellige Hexzahl dezimal ausrechnen."
   ],
   "erklaerung": "<p>Lange Bitmuster sind schwer zu lesen. Weil 16 = 2⁴ ist, passen genau <b>4 Bit in eine Hex-Ziffer</b>. Für die Werte 10 bis 15 nimmt man die Buchstaben A bis F. Hexzahlen kennzeichnet man mit <span class=\"mono\">h</span> am Ende (oder 0x davor).</p>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th>Bits</th><td class=\"mono\">0000</td><td class=\"mono\">0001</td><td class=\"mono\">0010</td><td class=\"mono\">0011</td><td class=\"mono\">0100</td><td class=\"mono\">0101</td><td class=\"mono\">0110</td><td class=\"mono\">0111</td></tr>\n<tr><th>Hex</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>\n<tr><th>Bits</th><td class=\"mono\">1000</td><td class=\"mono\">1001</td><td class=\"mono\">1010</td><td class=\"mono\">1011</td><td class=\"mono\">1100</td><td class=\"mono\">1101</td><td class=\"mono\">1110</td><td class=\"mono\">1111</td></tr>\n<tr><th>Hex</th><td>8</td><td>9</td><td class=\"c-p\">A (10)</td><td class=\"c-p\">B (11)</td><td class=\"c-p\">C (12)</td><td class=\"c-p\">D (13)</td><td class=\"c-p\">E (14)</td><td class=\"c-p\">F (15)</td></tr>\n</table></div>\n<p><b>Binär → Hex:</b> Von rechts in Viererblöcke teilen und jeden Block mit 8-4-2-1 umrechnen.</p>\n<p class=\"mono\">1001 1100 → 1001 = 8+1 = 9, 1100 = 8+4 = 12 = C → <span class=\"res\">9Ch</span></p>\n<p><b>Hex → binär:</b> Jede Ziffer wird zu 4 Bit. 7Ah → 7 = 0111, A = 10 = 1010 → <span class=\"mono\">0111 1010</span></p>\n<p><b>Hex → dezimal:</b> 7Ah = 7·16 + 10 = 112 + 10 = 122</p>",
   "profLevel": "<p>Warum nicht Oktal (Basis 8, 3 Bit pro Ziffer)? Weil Bytes 8 Bit haben – 8 ist durch 4 teilbar, aber nicht durch 3. Ein Byte ist also genau zwei Hexziffern. Schreibweisen: 9Ch, 0x9C, $9C oder 9C₁₆ meinen dasselbe.</p>",
   "typischeFehler": [
    "Von links statt von rechts in Vierergruppen geteilt (bei Längen, die kein Vielfaches von 4 sind).",
    "A = 11 statt 10."
   ]
  },
  {
   "id": "z6",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Halbaddierer, Volladdierer, Addierwerk",
   "relevanz": "hoch",
   "quelle": "Skript S. 46–50 · Blatt 2 I–III",
   "abhaengigVon": [
    "z1"
   ],
   "lernziele": [
    "Ich kann Wahrheitstabelle und Gleichungen des Halbaddierers angeben.",
    "Ich kann die Wahrheitstabelle des Volladdierers angeben und erklären, warum c_in nötig ist.",
    "Ich kann einen VA aus zwei HA bauen.",
    "Ich kann ein n-Bit-Addierwerk mit CF und ZF zeichnen."
   ],
   "erklaerung": "<div class=\"two\">\n<div>\n<h4>Halbaddierer (HA)</h4>\n<p>Er addiert zwei Bits a und b. Das Ergebnis kann höchstens 1 + 1 = 2 = 10₂ sein, deshalb braucht man 2 Ausgänge: das Ergebnis e und den Übertrag c (carry).</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th>b</th><th>a</th><th>c</th><th>e</th></tr>\n<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>\n<tr><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td class=\"c-p\">1</td><td>0</td></tr></table></div>\n<p>e = a ⊕ b (XOR, „=1“) · c = a &amp; b (AND)</p>\n</div>\n<figure aria-label=\"Schaltung Halbaddierer\">\n<svg viewBox=\"0 0 260 190\" width=\"260\">\n <g stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" style=\"color:var(--ink)\">\n  <line x1=\"70\" y1=\"10\" x2=\"70\" y2=\"60\"/><line x1=\"150\" y1=\"10\" x2=\"150\" y2=\"60\"/>\n  <line x1=\"70\" y1=\"35\" x2=\"180\" y2=\"35\"/><line x1=\"180\" y1=\"35\" x2=\"180\" y2=\"60\"/>\n  <line x1=\"150\" y1=\"45\" x2=\"100\" y2=\"45\"/><line x1=\"100\" y1=\"45\" x2=\"100\" y2=\"60\"/>\n  <rect x=\"50\" y=\"60\" width=\"60\" height=\"44\" fill=\"var(--paper)\"/><rect x=\"140\" y=\"60\" width=\"60\" height=\"44\" fill=\"var(--paper)\"/>\n  <line x1=\"80\" y1=\"104\" x2=\"80\" y2=\"140\"/><line x1=\"170\" y1=\"104\" x2=\"170\" y2=\"140\"/>\n </g>\n <circle cx=\"70\" cy=\"35\" r=\"3.5\" fill=\"var(--ink)\"/><circle cx=\"150\" cy=\"45\" r=\"3.5\" fill=\"var(--ink)\"/>\n <text x=\"64\" y=\"10\">b</text><text x=\"144\" y=\"10\">a</text>\n <text x=\"70\" y=\"88\" class=\"c-v\" style=\"fill:var(--v)\">&amp;</text><text x=\"157\" y=\"88\" style=\"fill:var(--v)\">=1</text>\n <text x=\"74\" y=\"160\" style=\"fill:var(--p)\">c</text><text x=\"164\" y=\"160\" style=\"fill:var(--p)\">e</text>\n <text x=\"40\" y=\"184\" style=\"font-size:13px;fill:var(--muted)\">AND → Übertrag · XOR → Ergebnis</text>\n</svg></figure>\n</div>\n\n<h4>Volladdierer (VA)</h4>\n<p>Ab der zweiten Stelle muss man den Übertrag c<sub>in</sub> der Stelle davor mitzählen. Das sind drei Eingänge, die Summe ist höchstens 1+1+1 = 3 = 11₂. Zwei Ausgänge (e und c<sub>out</sub>) reichen also noch.</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th>c<sub>in</sub></th><th>b</th><th>a</th><th>c<sub>out</sub></th><th>e</th><th class=\"l\">Summe</th></tr>\n<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class=\"l\">0</td></tr>\n<tr><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td class=\"l\">1</td></tr>\n<tr><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td class=\"l\">1</td></tr>\n<tr><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td class=\"l\">2 = 10₂</td></tr>\n<tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td class=\"l\">1</td></tr>\n<tr><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td class=\"l\">2 = 10₂</td></tr>\n<tr><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td class=\"l\">2 = 10₂</td></tr>\n<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td class=\"l\">3 = 11₂</td></tr></table></div>\n<ul>\n<li>Vereinfacht mit KV-Diagramm: e = a ⊕ b ⊕ c<sub>in</sub> und c<sub>out</sub> = (a&amp;b) ∨ (a&amp;c<sub>in</sub>) ∨ (b&amp;c<sub>in</sub>). Zum zweiten Ausdruck: Der Übertrag ist 1, sobald mindestens zwei Eingänge 1 sind.</li>\n<li>Man kann einen VA auch aus <b>2 Halbaddierern + OR</b> bauen. Der 1. HA rechnet a + b, der 2. HA zählt c<sub>in</sub> dazu. Die beiden Überträge werden mit OR verknüpft. Sie können nie beide 1 sein, deshalb reicht OR.</li>\n</ul>\n<h4>Addierwerk (n Bit)</h4>\n<p>Man schaltet n Volladdierer hintereinander: c<sub>out</sub> jeder Stelle geht an c<sub>in</sub> der nächsthöheren Stelle. Beim LSB ist c<sub>in</sub> = 0. Der letzte c<sub>out</sub> ist das <b>Carry</b>. Die Schaltung mit Zero-Flag ist bei Blatt 2 · III gezeichnet.</p>",
   "profLevel": "<p>Das Addierwerk aus hintereinander geschalteten Volladdierern heißt <i>Ripple-Carry-Addierer</i>: Der Übertrag „rieselt“ von rechts nach links. Bei 64 Bit muss er im schlimmsten Fall durch 64 Volladdierer laufen – das ist langsam. Echte Prozessoren nutzen deshalb Carry-Lookahead-Addierer, die Überträge parallel vorausberechnen (Hintergrundwissen, nicht im Skript).</p>",
   "typischeFehler": [
    "Beim HA das Ergebnis mit AND statt XOR gebildet.",
    "c_in des ersten VA nicht auf 0 gesetzt.",
    "Zero-Flag mit OR statt NOR gebildet."
   ]
  },
  {
   "id": "z7",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Subtraktion als Ersatzaddition",
   "relevanz": "hoch",
   "quelle": "Skript S. 50–52",
   "abhaengigVon": [
    "z4",
    "z6"
   ],
   "lernziele": [
    "Ich kann a − b als a + (−b) mit einem Addierwerk rechnen.",
    "Ich kann erklären, wofür das XOR und c_in = 1 im Rechenwerk sorgen."
   ],
   "erklaerung": "<div class=\"q3\">\n<span><b>Was wollen wir?</b> a − b rechnen, aber kein eigenes Subtrahierwerk bauen.</span>\n<span><b>Werkzeug:</b> a − b = a + (−b). Den Vorzeichenwechsel liefert das Zweierkomplement.</span>\n<span><b>Wie genau?</b> Die Bits von b invertieren und c<sub>in</sub> des ersten VA auf 1 setzen. Diese 1 ist genau das „+1“.</span>\n</div>\n<p>Beispiel: 0101 − 0010 (5 − 2)</p>\n<div class=\"bits\">  <span class=\"c-g\">0101</span>     (a = 5)\n  <span class=\"c-p\">1101</span>     (b = 0010 bitweise invertiert)\n+    <span class=\"c-p\">1</span>     (c<sub>in</sub> = 1)\n  ────\n<span class=\"c-o\">1</span> <span class=\"c-r\">0011</span>     = 3 ✓   (Carry 1 → bei Subtraktion heißt das: alles in Ordnung, siehe A8)</div>\n<p><b>Rechenwerk für ADD und SUB:</b> Vor jedem b-Eingang sitzt ein XOR. Die Steuerleitung <span class=\"mono\">ADD/SUB</span> geht an alle XOR-Gatter und zusätzlich an c<sub>in</sub>.</p>\n<ul>\n<li>ADD/SUB = 0: Das XOR lässt b unverändert durch (b ⊕ 0 = b), und c<sub>in</sub> = 0. Das Werk <b>addiert</b>.</li>\n<li>ADD/SUB = 1: Das XOR invertiert b (b ⊕ 1 = b̄), und c<sub>in</sub> = 1. Das Werk <b>subtrahiert</b>.</li>\n</ul>\n<div class=\"why\"><b>Warum ein XOR als Schalter?</b>x ⊕ 0 = x und x ⊕ 1 = x̄. Ein XOR ist also ein „Invertierer zum Einschalten“: Die Steuerleitung entscheidet, ob invertiert wird.</div>",
   "profLevel": "<p>Warum genügt ein XOR pro Bit plus c_in? Weil invertieren + 1 genau das Zweierkomplement ist. Das „+1“ kostet keinen eigenen Addierer, weil der Übertragseingang des ersten VA ohnehin frei ist. Nachfrage: „Was bedeutet der Übertrag bei der Ersatzaddition?“ – Er ist das Gegenteil des Borrow: Übertrag 1 = kein Borgen nötig = vorzeichenlos korrekt.</p>",
   "typischeFehler": [
    "b invertiert, aber c_in auf 0 gelassen (ergibt a − b − 1).",
    "Bei der Subtraktion den Carry wie bei der Addition interpretiert."
   ]
  },
  {
   "id": "z8",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Carry, Overflow und Zero-Flag",
   "relevanz": "hoch",
   "quelle": "Skript S. 52–58 · Blatt 2 V–VI",
   "abhaengigVon": [
    "z4",
    "z6",
    "z7"
   ],
   "lernziele": [
    "Ich kann CF bestimmen und weiß: CF = 1 → vorzeichenlos falsch.",
    "Ich kann OF bestimmen (Vorzeichenregel und XOR der letzten zwei Überträge).",
    "Ich kann ZF bestimmen und weiß, wie es geschaltet wird (NOR).",
    "Ich kenne die Tabelle CF/OF → korrekt/falsch."
   ],
   "erklaerung": "<p>Das Addierwerk rechnet die Bits immer gleich. Ob das Ergebnis <i>stimmt</i>, hängt davon ab, wie <i>wir</i> die Bits lesen. Dazu gibt es die Flags.</p>\n\n<h4>Carry-Flag (CF): Fehler bei vorzeichenloser Rechnung</h4>\n<p>CF ist der Übertrag aus dem letzten (höchsten) Volladdierer. CF = 1 heißt: Das Ergebnis braucht ein Bit mehr, als vorhanden ist.</p>\n<div class=\"bits\">  1111 1111   vorzeichenlos 255 │ Zweierkomplement −1\n+ 0000 0001                   1 │                   1\n <span class=\"c-o\">1</span>────────\n  0000 0000                   <span class=\"c-o\">0 ✗</span> │                   <span class=\"c-g\">0 ✓</span>\n  CF = <span class=\"c-o\">1</span></div>\n<p>Man sieht: Carry ist <b>kein</b> Fehler im Zweierkomplement. Dort ist −1 + 1 = 0 richtig.</p>\n\n<h4>Overflow-Flag (OF): Fehler im Zweierkomplement</h4>\n<p>Ein Overflow liegt vor, wenn <b>zwei Summanden mit gleichem Vorzeichen</b> ein Ergebnis mit <b>anderem Vorzeichen</b> ergeben:</p>\n<ul><li>positiv + positiv ergibt negativ → falsch</li><li>negativ + negativ ergibt positiv → falsch</li><li>Bei unterschiedlichen Vorzeichen kann nie ein Overflow entstehen.</li></ul>\n<div class=\"bits\">  <span class=\"c-g\">0</span>110 0001   (97)\n+ <span class=\"c-g\">0</span>011 0000   (48)\n  ─────────\n  <span class=\"c-o\">1</span>001 0001   → im Zweierkomplement −111 ✗  OF = 1, CF = 0\n              (97 + 48 = 145 &gt; 127, passt nicht)</div>\n<p class=\"formula\">OF = (Übertrag IN den letzten VA) ⊕ (Übertrag AUS dem letzten VA)</p>\n<p>Merksatz: Overflow gibt es, wenn ein Übertrag in den letzten Volladdierer <i>hinein</i> <b>oder</b> aus ihm <i>heraus</i> geschoben wird, aber nicht, wenn er „durch ihn durch“ geht. Die vier Fälle aus dem Skriptum:</p>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th class=\"l\">Fall</th><th>Rechnung</th><th>Übertrag hinein</th><th>Übertrag heraus</th><th>OF</th></tr>\n<tr><td class=\"l\">1 · kein Übertrag</td><td>80 + (−112) = −32</td><td>0</td><td>0</td><td class=\"c-g\">0 ✓</td></tr>\n<tr><td class=\"l\">2 · nur hinein</td><td>80 + 81 → −95</td><td>1</td><td>0</td><td class=\"c-o\">1 ✗</td></tr>\n<tr><td class=\"l\">3 · nur heraus</td><td>−112 + (−111) → 33</td><td>0</td><td>1</td><td class=\"c-o\">1 ✗</td></tr>\n<tr><td class=\"l\">4 · durch</td><td>−48 + (−79) = −127</td><td>1</td><td>1</td><td class=\"c-g\">0 ✓</td></tr>\n</table></div>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th>CF</th><th>OF</th><th>vorzeichenlos</th><th>Zweierkomplement</th></tr>\n<tr><td>0</td><td>0</td><td class=\"c-g\">korrekt</td><td class=\"c-g\">korrekt</td></tr>\n<tr><td>1</td><td>0</td><td class=\"c-o\">falsch</td><td class=\"c-g\">korrekt</td></tr>\n<tr><td>0</td><td>1</td><td class=\"c-g\">korrekt</td><td class=\"c-o\">falsch</td></tr>\n<tr><td>1</td><td>1</td><td class=\"c-o\">falsch</td><td class=\"c-o\">falsch</td></tr>\n</table></div>\n\n<h4>Carry bei der Subtraktion</h4>\n<p>Bei der Ersatzaddition bedeutet der Übertrag das <i>Gegenteil</i> einer „geborgten“ Stelle. Beispiel: 9 − 7 mit 8 Bit ergibt 0000 0010 = 2, und das stimmt, <b>obwohl</b> der Übertrag 1 ist. Deshalb wird der Carry bei der Subtraktion vor der Weiterverarbeitung <b>invertiert</b>. Danach gilt immer: <b>CF = 1 heißt Fehler</b>, egal ob addiert oder subtrahiert wurde. Beim Overflow braucht man nichts zu ändern.</p>\n\n<h4>Zero-Flag (ZF), kommt in Blatt 2 vor</h4>\n<p>ZF = 1 genau dann, wenn das Ergebnis 0000…0 ist. In der Schaltung gehen alle Ergebnisbits in ein OR mit negiertem Ausgang, also ein <b>NOR</b>. Ist irgendein Bit 1, liefert das OR eine 1 und die Negation macht daraus ZF = 0.</p>",
   "profLevel": "<p>In echten Prozessoren liegen diese Flags im Statusregister (oft dazu noch ein Sign/Negative-Flag = MSB des Ergebnisses). Das Carry wird auch für Mehrwort-Arithmetik genutzt: Man addiert zuerst die unteren 8 Bit, dann die oberen 8 Bit plus Carry – so kann ein 8-Bit-Prozessor 16-Bit-Zahlen addieren. Nachfrage: „Warum ist OF = c_in(MSB) ⊕ c_out(MSB)?“ → Ein Übertrag nur hinein dreht das Vorzeichen fälschlich auf 1, nur heraus fälschlich auf 0; bei beiden heben sie sich auf.</p>",
   "typischeFehler": [
    "Carry als Fehlerindikator im Zweierkomplement verwendet.",
    "Overflow bei unterschiedlichen Vorzeichen der Summanden vermutet (kann nie passieren).",
    "Bei Subtraktion vergessen, dass der Übertrag invertiert wird."
   ]
  },
  {
   "id": "z9",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Bitstellen hinzufügen (Vorzeichenerweiterung)",
   "relevanz": "mittel",
   "quelle": "Skript S. 58–60",
   "abhaengigVon": [
    "z2",
    "z4"
   ],
   "lernziele": [
    "Ich kann eine 4-Bit-Zahl in allen vier Darstellungen auf 8 Bit erweitern.",
    "Ich kann die Vorzeichenerweiterung beim Zweierkomplement begründen."
   ],
   "erklaerung": "<div class=\"scroll\"><table class=\"t\">\n<tr><th class=\"l\">Darstellung</th><th class=\"l\">Regel</th><th>Beispiel 4 Bit</th><th>8 Bit</th></tr>\n<tr><td class=\"l\">vorzeichenlos</td><td class=\"l\">vorne Nullen auffüllen</td><td class=\"mono\">1011 (11)</td><td class=\"mono\"><span class=\"c-p\">0000</span> 1011</td></tr>\n<tr><td class=\"l\">Vorzeichen-Betrag</td><td class=\"l\">Vorzeichen ins neue MSB, dazwischen Nullen</td><td class=\"mono\"><span class=\"c-o\">1</span>101 (−5)</td><td class=\"mono\"><span class=\"c-o\">1</span><span class=\"c-p\">000 0</span>101</td></tr>\n<tr><td class=\"l\">Exzess</td><td class=\"l\">die Differenz der beiden Exzesse addieren (127 − 7 = 120)</td><td class=\"mono\">0010 (−5)</td><td class=\"mono\">0000 0010 + 0111 1000 = 0111 1010</td></tr>\n<tr><td class=\"l\">Zweierkomplement</td><td class=\"l\"><b>Vorzeichenerweiterung</b>: das MSB in alle neuen Stellen kopieren</td><td class=\"mono\"><span class=\"c-o\">1</span>101 (−3)</td><td class=\"mono\"><span class=\"c-p\">1111</span> 1101</td></tr>\n</table></div>\n<p>Probe für −3: −128 + 64 + 32 + 16 + 8 + 4 + 1 = −3 ✓</p>\n<div class=\"why\"><b>Warum lauter Einsen bei negativen Zahlen?</b>Bei 4 Bit hat das MSB die Wertigkeit −8, bei 8 Bit −128. Damit wieder derselbe Wert herauskommt, müssen die neuen Bits die Differenz ausgleichen: −128 + 64 + 32 + 16 + 8 = −8 ✓</div>",
   "profLevel": "<p>Vorzeichenerweiterung (sign extension) passiert in jedem Prozessor, wenn ein Byte in ein 32- oder 64-Bit-Register geladen wird. In C entscheidet der Datentyp: signed char wird mit MSB-Kopien erweitert, unsigned char mit Nullen. Genau das ist eine häufige Fehlerquelle beim Programmieren.</p>",
   "typischeFehler": [
    "Negative Zweierkomplement-Zahlen mit Nullen erweitert (macht aus −3 plötzlich +13).",
    "Bei Exzess nur Nullen ergänzt, statt den Exzess-Unterschied zu addieren."
   ]
  },
  {
   "id": "z10",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Festkommadarstellung",
   "relevanz": "mittel",
   "quelle": "Skript S. 60–61",
   "abhaengigVon": [
    "z3"
   ],
   "lernziele": [
    "Ich kann eine Festkommazahl über die Wertigkeiten 2⁻¹, 2⁻², … lesen.",
    "Ich kann den Nachkommateil durch wiederholtes Multiplizieren mit 2 umrechnen.",
    "Ich kann erklären, warum Rundungsfehler entstehen (z. B. 0,2)."
   ],
   "erklaerung": "<p>Das Komma sitzt an einer festen Stelle. Die Stellen dahinter haben die Wertigkeiten 2⁻¹ = 0,5, 2⁻² = 0,25, 2⁻³ = 0,125 und so weiter.</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th>2⁴</th><th>2³</th><th>2²</th><th>2¹</th><th>2⁰</th><th>,</th><th>2⁻¹</th><th>2⁻²</th><th>2⁻³</th></tr>\n<tr><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>,</td><td>1</td><td>0</td><td>1</td></tr></table></div>\n<p class=\"mono\">10110,101₂ = 16 + 4 + 2 + 0,5 + 0,125 = 22,625</p>\n<p><b>Dezimal → Festkomma</b> am Beispiel 14,6875: Den ganzzahligen Teil rechnet man mit Horner um, 14 = 1110. Den Nachkommateil <span class=\"c-v\">multipliziert man immer wieder mit 2</span>. Die Stelle vor dem Komma ist jeweils das nächste Bit. Man nimmt sie weg und rechnet mit dem Rest weiter. Diese Bits liest man <b>von oben nach unten</b>.</p>\n<div class=\"chain\">\n<div><span>0,6875 · 2 = 1,375</span><span class=\"op\">Bit 1 (dann mit 0,375 weiter)</span></div>\n<div><span>0,375 · 2 = 0,75</span><span class=\"op\">Bit 0</span></div>\n<div><span>0,75 · 2 = 1,5</span><span class=\"op\">Bit 1 (dann mit 0,5 weiter)</span></div>\n<div><span>0,5 · 2 = 1,0</span><span class=\"op\">Bit 1, Rest 0, fertig</span></div>\n</div>\n<p>Ergebnis: <span class=\"res mono\">14,6875 = 1110,1011₂</span>. Probe: 8+4+2 + 0,5+0,125+0,0625 = 14,6875 ✓</p>\n<div class=\"warn\"><b>Rundungsfehler:</b> 0,2 ergibt 0,0011 0011 0011…₂ und hat damit unendlich viele Stellen. Mit endlich vielen Bits muss man runden. Addiert und subtrahiert wird mit demselben Addierwerk wie bisher.</div>",
   "profLevel": "<p>Eine Dezimalzahl hat im Binärsystem nur dann endlich viele Nachkommastellen, wenn ihr gekürzter Bruch im Nenner nur Zweierpotenzen hat: 0,375 = 3/8 ✓, aber 0,2 = 1/5 ✗ (Faktor 5). Gleitkomma (IEEE 754) verschiebt das Komma je nach Zahl – Festkomma nicht; darum ist Festkomma einfacher, hat aber einen kleinen Wertebereich.</p>",
   "typischeFehler": [
    "Nachkommabits von unten nach oben gelesen (das ist nur beim Horner-Schema so).",
    "Wertigkeit 2⁻² als 0,5 statt 0,25."
   ]
  },
  {
   "id": "z11",
   "kapitel": "Zahlendarstellung und Rechnen",
   "titel": "Binärpräfixe (kibi, mebi, gibi)",
   "relevanz": "niedrig",
   "quelle": "Skript S. 61–62 · NIST",
   "abhaengigVon": [
    "z1"
   ],
   "lernziele": [
    "Ich kenne die Binärpräfixe Ki, Mi, Gi, Ti, Pi, Ei und ihre Werte.",
    "Ich kann den Unterschied zwischen kB und KiB berechnen."
   ],
   "erklaerung": "<div class=\"scroll\"><table class=\"t\">\n<tr><th>Zehnerpotenz</th><th>Wert</th><th>Zweierpotenz</th><th>Wert</th></tr>\n<tr><td>kilo (k)</td><td>10³ = 1 000</td><td>kibi (Ki)</td><td>2¹⁰ = 1 024</td></tr>\n<tr><td>Mega (M)</td><td>10⁶</td><td>mebi (Mi)</td><td>2²⁰ = 1 048 576</td></tr>\n<tr><td>Giga (G)</td><td>10⁹</td><td>gibi (Gi)</td><td>2³⁰</td></tr>\n<tr><td>Tera (T)</td><td>10¹²</td><td>tebi (Ti)</td><td>2⁴⁰</td></tr>\n<tr><td>Peta (P)</td><td>10¹⁵</td><td>pebi (Pi)</td><td>2⁵⁰</td></tr>\n<tr><td>Exa (E)</td><td>10¹⁸</td><td>exbi (Ei)</td><td>2⁶⁰</td></tr>\n</table></div>\n<p>Der Unterschied wird mit der Größe immer größer: Zwischen kB und KiB sind es 2,4 % (24 Byte), zwischen TB und TiB schon fast 10 %. Deshalb wirkt eine Festplatte im Betriebssystem kleiner als auf der Packung.</p>\n\n<!-- ===================== TEIL B ===================== -->",
   "profLevel": "<p>Die IEC hat die Binärpräfixe im Dezember 1998 beschlossen und 1999 als Ergänzung zur IEC 60027-2 veröffentlicht. Vorher meinten Informatiker mit „kilo“ oft 1024, weil 2¹⁰ ≈ 1000 ist. Heute: kB = 1000 Byte, KiB = 1024 Byte.</p>",
   "typischeFehler": [
    "KiB und kB gleichgesetzt.",
    "Unterschied für alle Größen als 2,4 % angenommen (wächst mit der Größe)."
   ]
  },
  {
   "id": "s1",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "Schaltnetz vs. Schaltwerk, RS-Flip-Flop",
   "relevanz": "hoch",
   "quelle": "Skript S. 72–74",
   "abhaengigVon": [],
   "lernziele": [
    "Ich kann Schaltnetz und Schaltwerk unterscheiden (Rückkopplung, Speicher).",
    "Ich kenne die Funktionstabelle des RS-Flip-Flops.",
    "Ich kann begründen, warum S = R = 1 verboten ist.",
    "Ich kenne Anwendungen (Ein/Aus-Taster, Entprellen)."
   ],
   "erklaerung": "<ul>\n<li><b>Schaltnetz:</b> Der Ausgang hängt <i>nur</i> von den aktuellen Eingängen ab. Es gibt keine Rückkopplung und keinen Speicher. Beispiele sind Addierer, Decoder und Multiplexer.</li>\n<li><b>Schaltwerk:</b> Durch <span class=\"c-p\">Rückkopplung</span> (ein Ausgang geht zurück auf einen Eingang) und durch Gatterlaufzeiten können Zustände <b>gespeichert</b> werden. Der Ausgang hängt dann auch von der Vergangenheit ab.</li>\n</ul><p>Es besteht aus zwei NOR-Gattern, deren Ausgänge über Kreuz auf den jeweils anderen Eingang zurückgeführt sind.</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th>S</th><th>R</th><th class=\"l\">Wirkung</th></tr>\n<tr><td>0</td><td>0</td><td class=\"l c-g\">speichern (Q bleibt)</td></tr>\n<tr><td>1</td><td>0</td><td class=\"l\">setzen → Q = 1</td></tr>\n<tr><td>0</td><td>1</td><td class=\"l\">rücksetzen → Q = 0</td></tr>\n<tr><td>1</td><td>1</td><td class=\"l c-o\">verboten: Q = Q̄ = 0. Gehen danach beide auf 0, ist der Zustand unvorhersehbar und das Flip-Flop kann schwingen</td></tr></table></div>\n<p>Warum S = 1 setzt: S = 1 erzwingt Q̄ = 0 (ein NOR mit einer 1 am Eingang liefert immer 0). Dann sind am oberen NOR R = 0 und Q̄ = 0, also wird Q = <span class=\"mono\">NOT(0 ∨ 0)</span> = 1.</p>\n<ul>\n<li>Aus <b>NAND-Gattern</b> gebaut hat das Flip-Flop <b>0-aktive</b> Eingänge, im Symbol erkennt man sie an den Negationsringen.</li>\n<li>Anwendungen: Ein/Aus mit zwei Tastern (mit Pull-up-Widerständen) und das <b>Entprellen</b> eines Schalters. Das Flip-Flop schaltet bei der ersten Kontaktberührung und ignoriert das Nachfedern danach.</li>\n</ul>",
   "profLevel": "<p>Der „verbotene“ Zustand ist an sich stabil (Q = Q̄ = 0). Das Problem entsteht erst, wenn S und R gleichzeitig wieder auf 0 gehen: Dann schalten beide NOR-Ausgänge auf 1, das koppelt zurück, beide gehen auf 0 … das Flip-Flop schwingt, bis eine kleine Laufzeitdifferenz entscheidet (metastabiler Zustand). Das Ergebnis ist zufällig.</p>",
   "typischeFehler": [
    "Bei NAND-Flip-Flops die 0-aktiven Eingänge übersehen.",
    "Bei S = R = 0 einen festen Wert erwartet – der alte Wert bleibt."
   ]
  },
  {
   "id": "s2",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "D-Latch und D-Flip-Flop",
   "relevanz": "hoch",
   "quelle": "Skript S. 74–75 · Ü4 Aufgabe 2",
   "abhaengigVon": [
    "s1"
   ],
   "lernziele": [
    "Ich weiß: Latch ist bei C = 1 transparent (Q folgt D).",
    "Ich weiß: D-Flip-Flop übernimmt D nur bei der steigenden Flanke.",
    "Ich kann das Master-Slave-Prinzip erklären.",
    "Ich kann ein Zeitdiagramm für Latch und Flip-Flop zeichnen."
   ],
   "erklaerung": "<div class=\"two\">\n<div><h4>D-Latch (taktzustandsgesteuert)</h4>\n<p>Eingänge: D (Data) und C (Control).</p>\n<ul><li>Solange <b>C = 1</b>: Q = D. Das Latch ist <b>transparent</b> und macht jede Änderung von D mit.</li><li>Bei <b>C = 0</b>: Der letzte Wert bleibt gespeichert.</li></ul>\n<p>Entscheidend ist der <i>Zustand</i> (Pegel) von C.</p></div>\n<div><h4>D-Flip-Flop (taktflankengesteuert)</h4>\n<ul><li>Nur bei der <b>steigenden Taktflanke</b> (0 → 1) übernimmt Q den Wert von D.</li><li>Sonst passiert nichts, auch wenn sich D ändert.</li></ul>\n<p>Es ist nach dem <b>Master-Slave-Prinzip</b> aufgebaut: zwei Latches hintereinander. Bei C = 0 ist der Master transparent, bei C = 1 der Slave. Weil immer nur eines offen ist, ist das Flip-Flop als Ganzes nie transparent.</p></div>\n</div>\n<ul>\n<li>Im Symbol bedeutet das <b>Dreieck</b> am Takteingang C1 „flankengesteuert“. Ein <b>Ring</b> davor bedeutet „schaltet bei der negativen Flanke“.</li>\n<li>Zusätzliche S- und R-Eingänge arbeiten <b>asynchron</b>, also unabhängig vom Takt.</li>\n<li>Bei Bausteinen mit mehreren Flip-Flops zeichnet man einen <b>Steuerkopf</b> für den gemeinsamen Takt und Reset.</li>\n</ul>\n<p>Ein Zeitdiagramm-Beispiel mit beiden Bausteinen gibt es bei <b>Ü4 · 2</b>.</p><p>Für diese Aufgabe braucht man nur die zwei Regeln aus <b>B3</b>. Hier ein eigenes Beispiel mit beiden Bausteinen am selben Signal. Die gestrichelten Linien markieren die steigenden Flanken von C.</p>\n<figure><svg id=\"wave\" viewBox=\"0 0 660 300\" width=\"660\" role=\"img\" aria-label=\"Zeitdiagramm D, C, Q Latch und Q Flip-Flop\"></svg>\n<figcaption>Schraffiert = Q ist unbekannt (vor dem ersten C = 1 bzw. vor der ersten steigenden Flanke).</figcaption></figure>\n",
   "profLevel": "<p>Prüfernachfrage: „Warum ist ein Master-Slave-Flip-Flop nie transparent?“ – Master und Slave werden mit gegensätzlichem Takt angesteuert. Ist der Master offen (C = 0), ist der Slave zu, und umgekehrt. Ein Signal kommt also nie in einem Zug vom Eingang zum Ausgang. Der Moment der Übernahme ist der Wechsel 0 → 1: Der Master schließt (merkt sich D), der Slave öffnet (gibt es aus).</p>",
   "typischeFehler": [
    "Beim Flip-Flop Änderungen während C = 1 mitgezeichnet.",
    "Beim Latch die kurzen D-Spitzen während C = 1 vergessen.",
    "Anfangsbereich nicht als unbekannt markiert."
   ]
  },
  {
   "id": "s3",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "JK-Flip-Flop",
   "relevanz": "hoch",
   "quelle": "Skript S. 76–77, 93 · Ü4 Aufgabe 1",
   "abhaengigVon": [
    "s2"
   ],
   "lernziele": [
    "Ich kenne die JK-Funktionstabelle (00 halten, 10 setzen, 01 rücksetzen, 11 kippen).",
    "Ich kann ein JK-Flip-Flop aus einem D-Flip-Flop bauen: D = (J & Q̄) ∨ (K̄ & Q).",
    "Ich kenne die Vorbereitungstabelle (Q_alt → Q_neu → J, K)."
   ],
   "erklaerung": "<div class=\"scroll\"><table class=\"t\"><tr><th>J</th><th>K</th><th class=\"l\">bei der Taktflanke</th></tr>\n<tr><td>0</td><td>0</td><td class=\"l\">Q bleibt (store)</td></tr>\n<tr><td>1</td><td>0</td><td class=\"l\">Q = 1 (set)</td></tr>\n<tr><td>0</td><td>1</td><td class=\"l\">Q = 0 (reset)</td></tr>\n<tr><td>1</td><td>1</td><td class=\"l c-p\">Q kippt (toggle) → Grundlage für Zähler</td></tr></table></div>\n<p>Laut Skriptum baut man es aus einem RS-Flip-Flop mit Zusatzlogik: R = Q &amp; K und S = Q̄ &amp; J, plus Master-Slave für die Flankensteuerung. Wie man ein JK-Flip-Flop aus einem D-Flip-Flop baut, zeigt die Übung <b>Ü4 · 1</b>.</p><h4>Vorbereitungstabelle</h4>\n<div class=\"scroll\"><table class=\"t\"><tr><th>Q<sub>alt</sub> → Q<sub>neu</sub></th><th>J</th><th>K</th><th>J = K (zusammengeschaltet)</th></tr>\n<tr><td>0 → 0</td><td>0</td><td>X</td><td>0</td></tr><tr><td>0 → 1</td><td>1</td><td>X</td><td>1</td></tr>\n<tr><td>1 → 0</td><td>X</td><td>1</td><td>1</td></tr><tr><td>1 → 1</td><td>X</td><td>0</td><td>0</td></tr></table></div>\n<p>Regel: Bei Q<sub>alt</sub> = 0 ist J = Q<sub>neu</sub> und K = X. Bei Q<sub>alt</sub> = 1 ist J = X und K = Q̄<sub>neu</sub>.</p>",
   "profLevel": "<p>Ein JK mit J = K = T heißt T-Flip-Flop (Toggle). Mit J = K = 1 halbiert es die Taktfrequenz – Grundbaustein aller Dualzähler. „Universell“ heißt: Jedes andere Flip-Flop (D, T, RS) lässt sich aus einem JK bauen, z. B. D-FF: J = D, K = D̄.</p>",
   "typischeFehler": [
    "J = K = 1 mit dem verbotenen Zustand des RS verwechselt.",
    "In der D-Formel Q statt Q̄ beim J-Term."
   ]
  },
  {
   "id": "s4",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "Zeitangaben und Taktgeneratoren",
   "relevanz": "mittel",
   "quelle": "Skript S. 78–79",
   "abhaengigVon": [
    "s2"
   ],
   "lernziele": [
    "Ich kann Setup-Zeit, Hold-Zeit und Propagation Delay erklären.",
    "Ich kenne drei Arten von Taktgeneratoren (Inverter + Verzögerung, RC + Schmitt-Trigger, Quarz)."
   ],
   "erklaerung": "<ul>\n<li><b>Setup time:</b> So lange <i>vor</i> der Taktflanke muss D bzw. J/K schon stabil anliegen.</li>\n<li><b>Hold time:</b> So lange <i>nach</i> der Flanke muss der Wert noch stabil bleiben.</li>\n<li><b>Propagation delay:</b> Verzögerung von der Flanke bis zur Änderung des Ausgangs.</li>\n<li>Außerdem: maximale Taktfrequenz und minimale Dauer eines Taktimpulses. Beispiel 74LS74: Setup 20 ns, Hold 5 ns, maximal 33 MHz, Impulsdauer mindestens 25 ns, Verzögerung 20 ns.</li>\n</ul>\n<p><b>Taktgeneratoren:</b></p>\n<ul>\n<li>Ein Inverter mit rückgekoppelter Verzögerung. Die Periode ist die doppelte Verzögerungszeit.</li>\n<li><b>RC-Glied mit Schmitt-Trigger:</b> Der Kondensator lädt und entlädt sich zwischen den zwei Schaltschwellen. Ungenau.</li>\n<li><b>Schwingquarz:</b> nutzt den Piezoeffekt und liefert eine sehr genaue Frequenz.</li>\n</ul>",
   "profLevel": "<p>Werden Setup- oder Hold-Zeit verletzt, kann ein Flip-Flop metastabil werden: Der Ausgang bleibt kurz zwischen 0 und 1 hängen und kippt dann zufällig. Darum synchronisiert man externe Signale (z. B. Taster) mit zwei hintereinander geschalteten Flip-Flops.</p>",
   "typischeFehler": [
    "Setup (vorher) und Hold (nachher) vertauscht.",
    "Taktperiode = Verzögerungszeit statt doppelte Verzögerungszeit."
   ]
  },
  {
   "id": "s5",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "Register",
   "relevanz": "mittel",
   "quelle": "Skript S. 80–81",
   "abhaengigVon": [
    "s2"
   ],
   "lernziele": [
    "Ich kann ein Schieberegister und ein Parallelregister beschreiben.",
    "Ich kann begründen, warum das Schieberegister nur durch die FF-Verzögerung funktioniert.",
    "Ich kenne die Parallel-Serien-Umsetzung."
   ],
   "erklaerung": "<ul>\n<li><b>Schieberegister</b> (Serienregister): eine Kette aus D-Flip-Flops.\n  <ul>\n  <li>Bei jedem Takt rückt alles um eine Stelle weiter. Vorne kommt ein neues Bit hinein, das letzte geht verloren.</li>\n  <li>Das funktioniert nur, <span class=\"c-v\">weil Flip-Flops eine Verzögerung haben</span>. Sonst würden sich die D-Eingänge während der Flanke ändern.</li>\n  <li>Alle Flip-Flops müssen den Takt gleichzeitig bekommen. Wenn das nicht sicher ist, verwendet man Flip-Flops mit „Data-Lockout“.</li>\n  <li>Mit 2-zu-1-Multiplexern vor jedem D-Eingang kann man wahlweise nach <b>links oder rechts</b> schieben (Steuersignal R/L̄).</li>\n  </ul></li>\n<li><b>Parallelregister:</b> übernimmt bei jedem Takt alle Bits gleichzeitig.</li>\n<li>Kombiniert man beide, erhält man eine <b>Parallel-Serien-Umsetzung</b> und umgekehrt. Bei P/S̄ = 1 wird parallel geladen, bei P/S̄ = 0 geschoben.</li>\n</ul>",
   "profLevel": "<p>Serielle Schnittstellen (UART, SPI, USB) beruhen auf genau dieser Parallel-Serien-Umsetzung: Ein Byte wird parallel geladen und Bit für Bit über eine Leitung geschoben. Auf der Gegenseite schiebt ein Register die Bits wieder hinein und gibt sie parallel aus.</p>",
   "typischeFehler": [
    "Schieberichtung verwechselt (FF1 bekommt den neuen Wert, FF4 verliert seinen)."
   ]
  },
  {
   "id": "s6",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "Halbleiterspeicher (RAM, ROM)",
   "relevanz": "hoch",
   "quelle": "Skript S. 81–84",
   "abhaengigVon": [
    "s1",
    "z11"
   ],
   "lernziele": [
    "Ich kann den Matrix-Aufbau eines Speichers erklären und Adressleitungen berechnen.",
    "Ich kann SRAM und DRAM vergleichen.",
    "Ich kenne ROM, PROM, EPROM, EEPROM, Flash und NV-RAM."
   ],
   "erklaerung": "<p>Die Speicherzellen bilden eine <b>Matrix</b>. Ein Teil der Adresse wählt die Zeile, der andere Teil die Spalte. Die Zelle am Kreuzungspunkt wird gelesen oder geschrieben. Das hält die Adressdecodierung klein.</p>\n<ul>\n<li><b>16 Ki × 1 Bit:</b> 2¹⁴ = 16 384 Zellen, also 128 Zeilen × 128 Spalten. Die Zeile wählen A0–A6, die Spalte A7–A13.</li>\n<li><b>2 Ki × 8 Bit</b> (wortorganisiert): 2048 Wörter zu je 8 Bit, mit 11 Adressleitungen A0–A10.</li>\n</ul>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th class=\"l\">Typ</th><th class=\"l\">Wie wird gespeichert?</th><th class=\"l\">Eigenschaften</th></tr>\n<tr><td class=\"l\"><b>SRAM</b></td><td class=\"l\">Flip-Flops</td><td class=\"l\">schnell, braucht viel Platz</td></tr>\n<tr><td class=\"l\"><b>DRAM</b></td><td class=\"l\">Ladung in einem Kondensator (geladen = 1)</td><td class=\"l\">muss etwa alle paar ms <b>aufgefrischt</b> werden (Refresh), nach dem Lesen neu schreiben, langsamer, aber <b>hohe Dichte</b></td></tr>\n<tr><td class=\"l\"><b>Masken-ROM</b></td><td class=\"l\">bei der Herstellung festgelegt</td><td class=\"l\">nur bei großen Stückzahlen rentabel</td></tr>\n<tr><td class=\"l\"><b>PROM</b></td><td class=\"l\">Verbindungen werden durchgebrannt</td><td class=\"l\">einmal programmierbar, nicht umkehrbar</td></tr>\n<tr><td class=\"l\"><b>EPROM</b></td><td class=\"l\">Ladung auf einem isolierten Gate</td><td class=\"l\">wird mit <b>UV-Licht</b> durch ein Fenster gelöscht, einige hundert Mal</td></tr>\n<tr><td class=\"l\"><b>EEPROM</b></td><td class=\"l\">elektrisch löschen und schreiben</td><td class=\"l\">Umprogrammieren dauert einige ms</td></tr>\n<tr><td class=\"l\"><b>Flash</b></td><td class=\"l\">alle Zellen auf einmal elektrisch löschen</td><td class=\"l\">am häufigsten, kann in der Schaltung bleiben</td></tr>\n<tr><td class=\"l\"><b>NV-RAM</b></td><td class=\"l\">pro Bit eine RAM- und eine EEPROM-Zelle</td><td class=\"l\">beim Ausschalten RAM → EEPROM, beim Einschalten zurück</td></tr>\n</table></div>\n<p>RAM ist <b>flüchtig</b>, der Inhalt geht ohne Strom verloren. Alle ROM-Arten sind <b>nicht flüchtig</b>.</p>",
   "profLevel": "<p>Warum ist DRAM als Arbeitsspeicher üblich? Eine DRAM-Zelle braucht nur einen Transistor und einen Kondensator, eine SRAM-Zelle etwa sechs Transistoren. Dafür ist SRAM schneller – er wird als Cache im Prozessor verwendet. Prüferfrage: „Warum wird beim DRAM nach dem Lesen neu geschrieben?“ – Das Lesen entlädt den Kondensator (zerstörendes Lesen).</p>",
   "typischeFehler": [
    "Adressleitungen = Anzahl der Zellen statt log₂.",
    "EPROM (UV) und EEPROM (elektrisch) verwechselt."
   ]
  },
  {
   "id": "s7",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "Zähler (synchron, asynchron, Ring)",
   "relevanz": "hoch",
   "quelle": "Skript S. 84–88",
   "abhaengigVon": [
    "s3",
    "s5"
   ],
   "lernziele": [
    "Ich kann synchrone und asynchrone Dualzähler unterscheiden (Takt, Vor- und Nachteile).",
    "Ich kann die falschen Zwischenzustände eines Asynchronzählers bestimmen.",
    "Ich kenne Ringzähler, Rückwärtszähler, ladbare Zähler und Zählererweiterung (EWE/EWA)."
   ],
   "erklaerung": "<ul>\n<li><b>Ringzähler:</b> ein rückgekoppeltes Schieberegister, in dem genau eine 1 umläuft (<b>1-aus-n-Code</b>). Braucht einen Reset für den Startzustand.</li>\n<li><b>Synchroner Dualzähler:</b>\n  <ul>\n  <li>Aus JK-Flip-Flops, die alle <b>denselben Takt</b> bekommen.</li>\n  <li>Eine Stelle kippt genau dann, wenn <span class=\"c-v\">alle vorherigen Stellen 1 sind</span>. Das prüfen UND-Gatter an J und K.</li>\n  <li>Alle Ausgänge ändern sich gleichzeitig, nach genau einer Flip-Flop-Verzögerung.</li>\n  </ul></li>\n<li><b>Asynchroner Dualzähler:</b>\n  <ul>\n  <li>Alle Flip-Flops haben J = K = 1. Der Ausgang einer Stelle ist der Takt für die nächste. Eine Stelle kippt, wenn die Stelle davor von 1 auf 0 fällt.</li>\n  <li>Vorteil: einfacher gebaut.</li>\n  <li>Nachteil: falsche Zwischenzustände. Beim Übergang von 7 auf 8 läuft er kurz über 6, 4 und 0, weil sich die Stellen nacheinander ändern.</li>\n  <li>Vor dem Abfragen muss man die maximale Einstellzeit abwarten.</li>\n  <li>Wird für Frequenzteilung und reines Zählen verwendet.</li>\n  </ul></li>\n<li><b>Rückwärtszähler:</b> Eine Stelle kippt, wenn alle vorherigen 0 sind. Dazu verwendet man die Q̄-Ausgänge. Mit UP/DOWN̄ kann man umschalten.</li>\n<li><b>Ladbarer Zähler:</b> Bei CT/L̄D = 1 zählt er, bei CT/L̄D = 0 übernimmt er die Werte an D.</li>\n<li><b>BCD-Zähler:</b> springt nach 9 wieder auf 0.</li>\n<li><b>Zählererweiterung:</b>\n  <ul>\n  <li>Asynchron: Der höchste Ausgang ist der Takt für den nächsten Baustein.</li>\n  <li>Synchron: über den Erweiterungseingang EWE und den Erweiterungsausgang EWA. EWA = 1 gilt nur, wenn der Zählerstand 15 ist <b>und</b> EWE = 1. Lange Ketten senken die maximale Zählfrequenz.</li>\n  </ul></li>\n</ul>",
   "profLevel": "<p>Ein Asynchronzähler mit n Flip-Flops ist ein Frequenzteiler durch 2ⁿ: Jede Stufe halbiert die Frequenz. Die Zwischenzustände entstehen, weil jede Stufe erst nach der Verzögerung der vorherigen kippt („ripple counter“). Im schlimmsten Fall (111…1 → 000…0) addieren sich alle n Verzögerungen.</p>",
   "typischeFehler": [
    "Beim Asynchronzähler falsche Kipprichtung (er kippt bei 1 → 0 der Vorstufe).",
    "Ringzähler mit Dualzähler verwechselt."
   ]
  },
  {
   "id": "s8",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "Synchrone Schaltwerke entwerfen",
   "relevanz": "hoch",
   "quelle": "Skript S. 88–94 · Ü4 Aufgaben 3 und 4",
   "abhaengigVon": [
    "s2",
    "s3"
   ],
   "lernziele": [
    "Ich kann den Aufbau (Z, F, G) und das Mealy-Modell erklären.",
    "Ich kann einen Zustandsgraphen zeichnen (2^k Pfeile pro Zustand).",
    "Ich kann Zustände codieren und die Übergangstabelle aufstellen.",
    "Ich kann mit D = Q_neu die Vorbereitungsfunktionen bestimmen.",
    "Ich kenne Power-On-Reset und Anfangsinitialisierung."
   ],
   "erklaerung": "<p>Ein synchrones Schaltwerk besteht aus drei Teilen:</p>\n<ul>\n<li><b>Z</b> = Zustandsspeicher, zum Beispiel aus D-Flip-Flops. Er wechselt seinen Zustand mit dem Takt.</li>\n<li><b>G</b> = Übergangsfunktion: Aus Eingängen und aktuellem Zustand wird der Folgezustand.</li>\n<li><b>F</b> = Ausgabefunktion: Aus Eingängen und aktuellem Zustand werden die Ausgänge.</li>\n</ul>\n<p>Das mathematische Modell dafür ist der <b>Mealy-Automat</b>.</p>\n<div class=\"step\"><h4 data-n=\"1\">Zustände überlegen und Zustandsgraph zeichnen</h4>\n<p>Jeder Kreis ist ein Zustand, jeder Pfeil ein Übergang, beschriftet mit <span class=\"mono\">Eingänge / Ausgang</span>. Bei k Eingängen gehen von <b>jedem</b> Zustand genau 2<sup>k</sup> Pfeile weg, einer pro Eingangskombination. Schleifen auf denselben Zustand zählen mit.</p></div>\n<div class=\"step\"><h4 data-n=\"2\">Zustände codieren</h4>\n<p>Für z Zustände braucht man b Flip-Flops mit z ≤ 2<sup>b</sup>. Welcher Zustand welches Bitmuster bekommt, ist frei wählbar, außer die Angabe schreibt es vor, wie beim Zähler.</p></div>\n<div class=\"step\"><h4 data-n=\"3\">Übergangstabelle aufstellen</h4>\n<p>Links stehen alter Zustand und Eingänge, rechts neuer Zustand und Ausgänge. Für alle Kombinationen!</p></div>\n<div class=\"step\"><h4 data-n=\"4\">Vorbereitung der Flip-Flops bestimmen</h4>\n<p><b>Mit D-Flip-Flops: D = Q<sub>neu</sub></b>. Man nimmt also einfach die Spalte mit dem neuen Zustand.</p>\n<p>Mit JK-Flip-Flops gilt diese Tabelle:</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th>Q<sub>alt</sub> → Q<sub>neu</sub></th><th>J</th><th>K</th><th>J = K (zusammengeschaltet)</th></tr>\n<tr><td>0 → 0</td><td>0</td><td>X</td><td>0</td></tr><tr><td>0 → 1</td><td>1</td><td>X</td><td>1</td></tr>\n<tr><td>1 → 0</td><td>X</td><td>1</td><td>1</td></tr><tr><td>1 → 1</td><td>X</td><td>0</td><td>0</td></tr></table></div>\n<p>Regel: Bei Q<sub>alt</sub> = 0 ist J = Q<sub>neu</sub> und K = X. Bei Q<sub>alt</sub> = 1 ist J = X und K = Q̄<sub>neu</sub>.</p></div>\n<div class=\"step\"><h4 data-n=\"5\">Mit dem KV-Diagramm vereinfachen und die Schaltung zeichnen</h4></div>\n<div class=\"warn\"><b>Unbenützte Zustände:</b> Beim Einschalten kann das Schaltwerk zufällig in einem unbenützten Zustand landen. Dagegen gibt es zwei Lösungen:\n<ul>\n<li><b>Power-On-Reset:</b> Eine Zusatzschaltung setzt alle Flip-Flops beim Start über ihren asynchronen Reset in einen definierten Zustand. Dann dürfen die unbenützten Zeilen in der Tabelle <b>X</b> sein (frei wählbar, macht die Formeln kürzer).</li>\n<li><b>Anfangsinitialisierung:</b> Der unbenützte Zustand wird im Graphen eingezeichnet, und alle seine Pfeile führen in den Initialzustand. Dann gibt es keine X-Stellen, und die Formeln werden länger. Der Initialzustand wird erst nach der <b>ersten Taktflanke</b> erreicht.</li>\n</ul></div><p>Es gibt drei Zustände: aus, mittel und voll.</p>\n<ul>\n<li>Taster H (hell) → voll</li>\n<li>Taster D (dunkel) → aus</li>\n<li>beide gedrückt → mittel</li>\n<li>keiner gedrückt → der Zustand bleibt</li>\n<li>Bei jeder Änderung piepst P = 1.</li>\n</ul>\n<p>Codierung mit Q₀Q₁: aus = 00, mittel = 01, voll = 11. Das Muster 10 bleibt unbenützt und wird mit Power-On-Reset als X behandelt.</p>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th class=\"l\">alter Zustand</th><th colspan=\"4\">aus (00)</th><th colspan=\"4\">mittel (01)</th><th colspan=\"4\">voll (11)</th></tr>\n<tr><th class=\"l\">D</th><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>\n<tr><th class=\"l\">H</th><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>\n<tr><th class=\"l\">neu</th><td>aus</td><td>aus</td><td>voll</td><td>mittel</td><td>mittel</td><td>aus</td><td>voll</td><td>mittel</td><td>voll</td><td>aus</td><td>voll</td><td>mittel</td></tr>\n<tr><th class=\"l\">D₀</th><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>\n<tr><th class=\"l\">D₁</th><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>\n<tr><th class=\"l\">P</th><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>\n</table></div>\n<p class=\"mono\">D₀ = (H &amp; D̄) ∨ (Q₀ &amp; D̄)<br>D₁ = H ∨ (Q₁ &amp; D̄)<br>P = (Q₀ &amp; D) ∨ (Q̄₁ &amp; H) ∨ (Q₁ &amp; H̄ &amp; D) ∨ (Q̄₀ &amp; H &amp; D̄)</p>",
   "profLevel": "<p>Mealy vs. Moore: Beim Mealy-Automaten hängt die Ausgabe von Zustand UND Eingang ab, sie steht an den Pfeilen („Eingang / Ausgang“). Beim Moore-Automaten hängt sie nur vom Zustand ab und steht im Kreis. Moore-Ausgänge ändern sich nur mit dem Takt, Mealy-Ausgänge können direkt auf Eingänge reagieren. Das Skript verwendet Mealy (Lichtsteuerung: Piepser hängt vom Übergang ab).</p>",
   "typischeFehler": [
    "Nicht für jede Eingangskombination einen Pfeil gezeichnet.",
    "Unbenützte Zustände ohne Reset als X behandelt.",
    "Zustand-Codierung beim Zähler frei gewählt, obwohl der Zählerstand ablesbar sein muss."
   ]
  },
  {
   "id": "s9",
   "kapitel": "Schaltwerke und Speicher",
   "titel": "ROM als Logik, maximale Taktfrequenz, CPLD/FPGA",
   "relevanz": "mittel",
   "quelle": "Skript S. 94–97",
   "abhaengigVon": [
    "s6",
    "s8"
   ],
   "lernziele": [
    "Ich kann erklären, wie ein ROM eine logische Funktion realisiert (Eingänge = Adresse).",
    "Ich kann f_max = 1 / (t₁ + t₂ + t₃) berechnen.",
    "Ich kann CPLD und FPGA unterscheiden."
   ],
   "erklaerung": "<ul>\n<li><b>Logik mit ROM:</b> Die Eingänge werden zur Adresse, das gespeicherte Bit ist der Funktionswert. Man speichert also die ganze Wahrheitstabelle und braucht kein KV-Diagramm. Beispiele: 8 Eingänge → 256 × 1 Bit. Ein Speicher mit 8 Ki × 8 Bit ergibt 8 Funktionen mit je 13 Eingängen (2¹³ = 8 Ki). Mit einem ROM kann man auch die Funktionen F und G eines Schaltwerks bilden.</li>\n<li><b>Maximale Taktfrequenz:</b> Bis zur nächsten Flanke müssen das Flip-Flop schalten (t₁), die Übergangsfunktion rechnen (t₂) und die Setup-Zeit (t₃) eingehalten werden.\n<p class=\"formula\">T<sub>min</sub> ≥ t₁ + t₂ + t₃ &nbsp;&nbsp; f<sub>max</sub> = 1 / T<sub>min</sub></p></li>\n<li><b>CPLD:</b> wenige, aber komplexe Blöcke („viele PALs“). Die Konfiguration liegt im Flash oder EEPROM und ist sofort nach dem Einschalten da.</li>\n<li><b>FPGA:</b> hunderttausende kleine Logikblöcke. Die Konfiguration liegt im <b>flüchtigen RAM</b> und muss bei jedem Start neu geladen werden.</li>\n<li>Beide werden mit Hardwarebeschreibungssprachen konfiguriert (zum Beispiel VHDL), auch direkt in der Schaltung (in-system-programming).</li>\n</ul>\n\n<!-- ===================== TEIL C ===================== -->",
   "profLevel": "<p>Ein ROM für ein Schaltwerk speichert F und G zusammen: Adresse = Eingänge + aktueller Zustand, Daten = neuer Zustand + Ausgänge. Für die Lichtsteuerung: 4 Adressbits (D, H, Q₀, Q₁) und 3 Datenbits (D₀, D₁, P) → 16 × 3 Bit. Die Komplexität der Funktion ist dann egal – es steht einfach die ganze Wahrheitstabelle im Speicher.</p>",
   "typischeFehler": [
    "ROM-Größe als Anzahl der Eingänge statt 2^Eingänge.",
    "In f_max die Setup-Zeit vergessen."
   ]
  }
 ],
 "probeklausur": {
  "dauerMin": 45,
  "fragen": [
   {
    "id": "pk1",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Gib 157 als 8-Bit-Muster (vorzeichenlos) an.",
    "antwort": "1001 1101",
    "akzeptiert": [
     "10011101",
     "1001 1101"
    ],
    "erklaerung": "157 = 128 + 16 + 8 + 4 + 1."
   },
   {
    "id": "pk2",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Welchen Dezimalwert hat 1100 0011₂ im Zweierkomplement?",
    "antwort": "−61",
    "akzeptiert": [
     "-61",
     "−61"
    ],
    "erklaerung": "−128 + 64 + 2 + 1 = −61."
   },
   {
    "id": "pk3",
    "typ": "mc",
    "niveau": "anwenden",
    "frage": "Wie lautet −90 im 8-Bit-Zweierkomplement?",
    "optionen": [
     "1010 0110",
     "1010 0101",
     "1101 1010",
     "0101 1010"
    ],
    "richtig": 0,
    "erklaerung": "90 = 0101 1010 → 1010 0101 → +1 = 1010 0110."
   },
   {
    "id": "pk4",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Gib 0110 1110₂ in Hex an.",
    "antwort": "6Eh",
    "akzeptiert": [
     "6e",
     "6eh",
     "0x6e"
    ],
    "erklaerung": "0110 = 6, 1110 = 14 = E."
   },
   {
    "id": "pk5",
    "typ": "mc",
    "niveau": "anwenden",
    "frage": "0101 0110 + 0110 0111 (8 Bit). Welche Flags sind nach der Addition gesetzt?",
    "optionen": [
     "CF = 0, OF = 0, ZF = 0",
     "CF = 0, OF = 1, ZF = 0",
     "CF = 0, OF = 1, ZF = 1",
     "CF = 1, OF = 0, ZF = 0"
    ],
    "richtig": 1,
    "erklaerung": "Ergebnis 1011 1101. Übertrag aus Bit 7 = 0, Übertrag in Bit 7 = 1 → OF = 1. ZF = 0."
   },
   {
    "id": "pk6",
    "typ": "mc",
    "niveau": "anwenden",
    "frage": "1100 0000 + 0100 0000 (8 Bit). Welche Flags sind nach der Addition gesetzt?",
    "optionen": [
     "CF = 0, OF = 0, ZF = 1",
     "CF = 0, OF = 1, ZF = 1",
     "CF = 1, OF = 0, ZF = 0",
     "CF = 1, OF = 0, ZF = 1"
    ],
    "richtig": 3,
    "erklaerung": "Ergebnis 0000 0000. Übertrag aus Bit 7 = 1, Übertrag in Bit 7 = 1 → OF = 0. ZF = 1."
   },
   {
    "id": "pk7",
    "typ": "mc",
    "niveau": "erinnern",
    "frage": "Welchen Wertebereich hat eine 6-Bit-Zahl im Zweierkomplement?",
    "optionen": [
     "−31 … 31",
     "−32 … 31",
     "−32 … 32",
     "0 … 63"
    ],
    "richtig": 1,
    "erklaerung": "−2⁵ … 2⁵ − 1."
   },
   {
    "id": "pk8",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Welchen Wert hat 1000 0011₂ in Exzess-127?",
    "antwort": "4",
    "akzeptiert": [
     "4",
     "+4"
    ],
    "erklaerung": "131 − 127 = 4."
   },
   {
    "id": "pk9",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Welchen Wert hat 1000 0111₂ in Vorzeichen-Betrag?",
    "antwort": "−7",
    "akzeptiert": [
     "-7",
     "−7"
    ],
    "erklaerung": "MSB 1 → negativ, Betrag 7."
   },
   {
    "id": "pk10",
    "typ": "mc",
    "niveau": "anwenden",
    "frage": "Das 4-Bit-Zweierkomplement 1001 wird auf 8 Bit erweitert:",
    "optionen": [
     "1111 1001",
     "0000 1001",
     "1000 0001",
     "1001 0000"
    ],
    "richtig": 0,
    "erklaerung": "MSB kopieren."
   },
   {
    "id": "pk11",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Welchen Dezimalwert hat 11,101₂?",
    "antwort": "3,625",
    "akzeptiert": [
     "3,625",
     "3.625"
    ],
    "erklaerung": "2 + 1 + 0,5 + 0,125."
   },
   {
    "id": "pk12",
    "typ": "mc",
    "niveau": "erinnern",
    "frage": "Wie heißt der Binärpräfix für 2³⁰?",
    "optionen": [
     "Giga",
     "gibi",
     "mebi",
     "tebi"
    ],
    "richtig": 1,
    "erklaerung": "Gi = 2³⁰."
   },
   {
    "id": "pk13",
    "typ": "mc",
    "niveau": "anwenden",
    "frage": "Volladdierer: a = 1, b = 0, c_in = 1. Ausgänge?",
    "optionen": [
     "c_out = 1, e = 0",
     "c_out = 0, e = 1",
     "c_out = 1, e = 1",
     "c_out = 0, e = 0"
    ],
    "richtig": 0,
    "erklaerung": "1 + 0 + 1 = 2 = 10₂."
   },
   {
    "id": "pk14",
    "typ": "mc",
    "niveau": "verstehen",
    "frage": "Rechenwerk mit ADD/SUB-Leitung: Was passiert bei ADD/SUB = 1?",
    "optionen": [
     "a wird invertiert",
     "b wird über XOR invertiert und c_in = 1",
     "Das Carry wird gelöscht",
     "Es wird multipliziert"
    ],
    "richtig": 1,
    "erklaerung": "Ersatzaddition a + b̄ + 1."
   },
   {
    "id": "pk15",
    "typ": "mc",
    "niveau": "verstehen",
    "frage": "Warum ist beim NOR-RS-Flip-Flop S = R = 1 unzulässig?",
    "optionen": [
     "Weil Q dann kippt",
     "Weil Q = Q̄ = 0 und beim Zurückgehen auf 00 der Zustand unvorhersehbar ist",
     "Weil das Gatter kaputt geht",
     "Weil Q dann 1 wird"
    ],
    "richtig": 1,
    "erklaerung": "Skript S. 72."
   },
   {
    "id": "pk16",
    "typ": "mc",
    "niveau": "analysieren",
    "frage": "C = 1 (seit der letzten steigenden Flanke), D wechselt von 1 auf 0. Was zeigen Latch und Flip-Flop?",
    "optionen": [
     "Latch 0, Flip-Flop bleibt beim Wert der Flanke",
     "Beide 0",
     "Beide bleiben",
     "Latch bleibt, Flip-Flop 0"
    ],
    "richtig": 0,
    "erklaerung": "Latch transparent, FF nur bei der Flanke."
   },
   {
    "id": "pk17",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "JK-Flip-Flop: Q = 0, J = 1, K = 1. Q nach der Flanke?",
    "antwort": "1",
    "akzeptiert": [
     "1"
    ],
    "erklaerung": "Toggle."
   },
   {
    "id": "pk18",
    "typ": "mc",
    "niveau": "anwenden",
    "frage": "Welche Funktion vor einem D-FF ergibt ein JK-FF?",
    "optionen": [
     "D = (J & Q̄) ∨ (K̄ & Q)",
     "D = J ∨ K",
     "D = J & K̄",
     "D = (J & Q) ∨ (K & Q̄)"
    ],
    "richtig": 0,
    "erklaerung": "Ü4 Aufgabe 1."
   },
   {
    "id": "pk19",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Wie viele Flip-Flops braucht ein Schaltwerk mit 9 Zuständen mindestens?",
    "antwort": "4",
    "akzeptiert": [
     "4"
    ],
    "erklaerung": "2³ = 8 < 9 ≤ 16."
   },
   {
    "id": "pk20",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Ein Schaltwerk hat 3 Eingänge. Wie viele Pfeile gehen von jedem Zustand weg?",
    "antwort": "8",
    "akzeptiert": [
     "8"
    ],
    "erklaerung": "2³."
   },
   {
    "id": "pk21",
    "typ": "mc",
    "niveau": "erinnern",
    "frage": "Welcher Speicher braucht einen Refresh?",
    "optionen": [
     "SRAM",
     "DRAM",
     "Flash",
     "PROM"
    ],
    "richtig": 1,
    "erklaerung": "Kondensatorladung geht verloren."
   },
   {
    "id": "pk22",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "Wie viele Adressleitungen hat ein 4 Ki × 8 Bit Speicher?",
    "antwort": "12",
    "akzeptiert": [
     "12"
    ],
    "erklaerung": "4 Ki = 2¹²."
   },
   {
    "id": "pk23",
    "typ": "mc",
    "niveau": "verstehen",
    "frage": "Warum fragt man einen asynchronen Zähler erst nach einer Wartezeit ab?",
    "optionen": [
     "Wegen Refresh",
     "Weil kurzzeitig falsche Zwischenzustände auftreten",
     "Weil er rückwärts zählt",
     "Wegen der Hold-Zeit"
    ],
    "richtig": 1,
    "erklaerung": "Die Stufen kippen nacheinander."
   },
   {
    "id": "pk24",
    "typ": "eingabe",
    "niveau": "anwenden",
    "frage": "t₁ = 10 ns, t₂ = 20 ns, t₃ = 10 ns. f_max in MHz?",
    "antwort": "25",
    "akzeptiert": [
     "25",
     "25mhz",
     "25 mhz"
    ],
    "erklaerung": "1 / 40 ns = 25 MHz."
   },
   {
    "id": "pk25",
    "typ": "mc",
    "niveau": "analysieren",
    "frage": "Welche Aussage über das Overflow-Flag stimmt?",
    "optionen": [
     "OF = 1 → vorzeichenloses Ergebnis falsch",
     "OF = 1 → Zweierkomplement-Ergebnis falsch",
     "OF ist dasselbe wie das Carry",
     "OF kann bei positiv + negativ auftreten"
    ],
    "richtig": 1,
    "erklaerung": "Nur für die Zweierkomplement-Interpretation."
   }
  ],
  "punkteProFrage": 1
 },
 "lernplanBloecke": [
  [
   "z1",
   "z2",
   "z3"
  ],
  [
   "z4",
   "z5"
  ],
  [
   "z6",
   "z7",
   "z8"
  ],
  [
   "z9",
   "z10",
   "z11"
  ],
  [
   "s1",
   "s2",
   "s3"
  ],
  [
   "s4",
   "s5",
   "s6"
  ],
  [
   "s7",
   "s8",
   "s9"
  ]
 ]
};

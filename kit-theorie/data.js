// Inhalt: Konzepte der IT (KIT) 475.007, Module Zahlendarstellung und Schaltwerke
const COURSE = {
 "meta": {
  "fach": "Konzepte der IT (KIT) · 475.007",
  "module": [
   "Zahlendarstellung und Rechnen",
   "Schaltwerke und Speicher"
  ],
  "pruefungsdatum": "2026-10-30",
  "start": "2026-10-23",
  "format": "Moodle-Test (Multiple Choice und Kurzantwort)",
  "annahmen": [
   "Prüfung „nächste Woche“ → angenommen Freitag, 30. 10. 2026. Das Datum kannst du oben im Dashboard ändern, Countdown und Lernplan passen sich an.",
   "Moodle-Test: Schwerpunkt auf Multiple Choice und Eingabefragen (Zahl/Bitmuster eintippen).",
   "Abgedeckt sind nur die Module „Zahlendarstellung und Rechnen“ (Skript Kap. 2) und „Schaltwerke und Speicher“ (Skript Kap. 4) plus Blatt 2 und Weiterführende Übungen 4.",
   "Die Moodle-Seiten selbst waren nicht zugänglich (Login). Was dort zusätzlich steht, ist nicht berücksichtigt."
  ],
  "quellen": [
   {
    "titel": "KIT-Skriptum (F. Bauer, ab WS 2025/26), Kap. 2 S. 40–62 und Kap. 4 S. 72–97",
    "url": ""
   },
   {
    "titel": "Übungsblatt 2 + Lösung (Addierer, Horner, Flags, Hex)",
    "url": ""
   },
   {
    "titel": "Weiterführende Übungen 4 + Lösungen (JK aus D, Latch/FF, Zähler 0–5, Blinklicht)",
    "url": ""
   },
   {
    "titel": "Wikipedia: Status register (Zero/Carry/Overflow-Flag)",
    "url": "https://en.wikipedia.org/wiki/Status_register"
   },
   {
    "titel": "NIST: Prefixes for binary multiples (IEC 60027-2)",
    "url": "https://www.physics.nist.gov/cgi-bin/cuu/Info/Units/binary.html"
   },
   {
    "titel": "Studyflix: Moore-Automat (Abgrenzung Mealy/Moore)",
    "url": "https://studyflix.de/informatik/moore-automat-1215"
   },
   {
    "titel": "Studyflix: Zweierkomplement",
    "url": "https://studyflix.de/informatik/zweierkomplement-1781"
   }
  ]
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
   ],
   "fragen": [
    {
     "id": "z1q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie viele verschiedene Bitmuster gibt es mit 6 Bit?",
     "optionen": [
      "32",
      "64",
      "63",
      "12"
     ],
     "richtig": 1,
     "erklaerung": "2⁶ = 64. Die 63 wäre die größte vorzeichenlose Zahl, nicht die Anzahl der Muster."
    },
    {
     "id": "z1q2",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Woran erkennt man bei einer vorzeichenlosen Zahl sofort, dass sie ungerade ist?",
     "optionen": [
      "MSB = 1",
      "LSB = 1",
      "Es sind mehr Einsen als Nullen",
      "LSB = 0"
     ],
     "richtig": 1,
     "erklaerung": "Alle Stellen außer dem LSB haben gerade Wertigkeiten (2, 4, 8, …). Nur das LSB (Wertigkeit 1) kann die Summe ungerade machen."
    },
    {
     "id": "z1q3",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "11₂ und 11₁₀ bezeichnen denselben Wert.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "11₂ = 2 + 1 = 3, aber 11₁₀ = elf. Die tiefgestellte Basis macht den Unterschied."
    },
    {
     "id": "z1q4",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Welche Wertigkeit hat das Bit an Position 5, wenn das LSB Position 0 ist?",
     "antwort": "32",
     "akzeptiert": [
      "32"
     ],
     "erklaerung": "2⁵ = 32. Position 0 → 1, 1 → 2, 2 → 4, 3 → 8, 4 → 16, 5 → 32."
    },
    {
     "id": "z1q5",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "Wie viele Bit braucht man mindestens, um 300 verschiedene Werte darzustellen?",
     "optionen": [
      "8",
      "9",
      "10",
      "300"
     ],
     "richtig": 1,
     "erklaerung": "2⁸ = 256 < 300, aber 2⁹ = 512 ≥ 300. Also 9 Bit."
    },
    {
     "id": "z1q6",
     "typ": "offen",
     "niveau": "verstehen",
     "frage": "Warum muss man in der Digitaltechnik immer dazusagen, mit wie vielen Bit gerechnet wird?",
     "antwort": "Weil ein Rechner eine feste Anzahl Leitungen/Speicherstellen hat. Mit n Bit gibt es nur 2ⁿ Muster – was größer ist, kann nicht dargestellt werden. Dasselbe Bitmuster kann außerdem je nach Breite (z. B. Zweierkomplement 4 vs. 8 Bit) einen anderen Wert haben.",
     "erklaerung": ""
    }
   ],
   "aufgaben": [
    {
     "id": "z1a1",
     "schwierigkeit": "leicht",
     "angabe": "Schreibe die Wertigkeiten aller Stellen einer 8-Bit-Zahl auf und markiere MSB und LSB.",
     "hinweise": [
      "Ganz rechts beginnt man mit 2⁰.",
      "Jede Stelle nach links verdoppelt die Wertigkeit.",
      "1, 2, 4, 8, … bis 2⁷."
     ],
     "loesung": "<p>128 · 64 · 32 · 16 · 8 · 4 · 2 · 1. Ganz links (128) ist das <b>MSB</b>, ganz rechts (1) das <b>LSB</b>.</p>",
     "fehler": [
      "Reihenfolge verdreht (LSB links)."
     ],
     "fix": false
    },
    {
     "id": "z1a2",
     "schwierigkeit": "mittel",
     "angabe": "Wie viele Bit braucht man, um alle ganzen Zahlen von 0 bis 1000 vorzeichenlos darzustellen?",
     "hinweise": [
      "Das sind 1001 verschiedene Werte.",
      "Suche die kleinste Zweierpotenz ≥ 1001.",
      "2⁹ = 512, 2¹⁰ = 1024."
     ],
     "loesung": "<p>0 bis 1000 sind 1001 Werte. 2⁹ = 512 reicht nicht, 2¹⁰ = 1024 ≥ 1001 → <span class=\"res\">10 Bit</span>. Kontrolle: Größte Zahl mit 10 Bit ist 2¹⁰ − 1 = 1023 ≥ 1000 ✓</p>",
     "fehler": [
      "1000 Werte statt 1001 gezählt – hier egal, aber bei z. B. 0…1023 entscheidend."
     ],
     "fix": false
    },
    {
     "id": "z1a3",
     "schwierigkeit": "pruefung",
     "angabe": "Gegeben ist das Bitmuster 1100 0001₂ (vorzeichenlos). (a) Ist die Zahl gerade? (b) Welchen Wert hat das MSB? (c) Welchen Dezimalwert hat das Muster?",
     "hinweise": [
      "Für (a) schau nur auf das LSB.",
      "Das MSB steht ganz links und hat bei 8 Bit Wertigkeit 128.",
      "Addiere die Wertigkeiten der Einsen."
     ],
     "loesung": "<p>(a) LSB = 1 → <b>ungerade</b>. (b) MSB = 1 mit Wertigkeit 128. (c)</p><div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr><tr><th class=\"l\">Bit</th><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"c-p\">1</td></tr></table></div><p class=\"mono\">1100 0001₂ = 128 + 64 + 1 = <span class=\"res\">193</span></p>",
     "fehler": [
      "LSB mit MSB verwechselt."
     ],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z2q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welchen Wertebereich hat eine 8-Bit-Zahl im Zweierkomplement?",
     "optionen": [
      "−127 … +127",
      "−128 … +127",
      "−127 … +128",
      "0 … 255"
     ],
     "richtig": 1,
     "erklaerung": "−2⁷ … 2⁷ − 1 = −128 … 127. −127…127 wäre Vorzeichen-Betrag, −127…128 Exzess-127."
    },
    {
     "id": "z2q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "In welcher Darstellung gibt es die Null zweimal (+0 und −0)?",
     "optionen": [
      "Vorzeichen-Betrag",
      "Zweierkomplement",
      "Exzess-Darstellung",
      "vorzeichenlos"
     ],
     "richtig": 0,
     "erklaerung": "0000 = +0 und 1000 = −0, weil Vorzeichen und Betrag getrennt sind."
    },
    {
     "id": "z2q3",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welchen Wert hat das 4-Bit-Muster 1010 in Exzess-7-Darstellung?",
     "optionen": [
      "−2",
      "3",
      "10",
      "−6"
     ],
     "richtig": 1,
     "erklaerung": "Vorzeichenlos 1010 = 8 + 2 = 10, dann Exzess abziehen: 10 − 7 = 3."
    },
    {
     "id": "z2q4",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welchen Wert hat 1010 (4 Bit) in Vorzeichen-Betrag-Darstellung?",
     "optionen": [
      "−2",
      "−6",
      "10",
      "−3"
     ],
     "richtig": 0,
     "erklaerung": "MSB 1 → negativ. Betrag 010 = 2 → −2."
    },
    {
     "id": "z2q5",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welchen Wert hat 1010 (4 Bit) im Zweierkomplement?",
     "optionen": [
      "−2",
      "−6",
      "10",
      "−5"
     ],
     "richtig": 1,
     "erklaerung": "MSB hat Wertigkeit −8: −8 + 2 = −6."
    },
    {
     "id": "z2q6",
     "typ": "wahrfalsch",
     "niveau": "erinnern",
     "frage": "Die Exzess-127-Darstellung wird bei IEEE 754 (einfache Genauigkeit) für den Exponenten verwendet.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Steht so im Skript (S. 43): 8 Bit Exponent in Exzess-127."
    },
    {
     "id": "z2q7",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "Was ist der wichtigste Grund, warum Computer das Zweierkomplement verwenden?",
     "optionen": [
      "Es hat zwei Nullen.",
      "Man kann mit demselben Addierwerk wie für vorzeichenlose Zahlen rechnen.",
      "Der Wertebereich ist symmetrisch.",
      "Man kann das Vorzeichen nicht ablesen."
     ],
     "richtig": 1,
     "erklaerung": "Addition und Subtraktion brauchen keine Zusatzlogik. Die anderen Aussagen sind falsch (eine Null, unsymmetrisch, Vorzeichen am MSB ablesbar)."
    },
    {
     "id": "z2q8",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Was ist die größte Zahl, die man mit 8 Bit in Vorzeichen-Betrag darstellen kann?",
     "antwort": "127",
     "akzeptiert": [
      "127",
      "+127"
     ],
     "erklaerung": "0111 1111 = 64+32+16+8+4+2+1 = 127. Ein Bit geht fürs Vorzeichen weg, also 2⁷ − 1."
    },
    {
     "id": "z2q9",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welchen Wertebereich hat die Exzess-7-Darstellung mit 4 Bit?",
     "optionen": [
      "−7 … +7",
      "−8 … +7",
      "−7 … +8",
      "0 … 15"
     ],
     "richtig": 2,
     "erklaerung": "0000 → 0 − 7 = −7, 1111 → 15 − 7 = 8."
    }
   ],
   "aufgaben": [
    {
     "id": "z2a1",
     "schwierigkeit": "mittel",
     "angabe": "Interpretiere das 4-Bit-Muster 1110₂ (a) vorzeichenlos, (b) in Vorzeichen-Betrag, (c) in Exzess-7, (d) im Zweierkomplement.",
     "hinweise": [
      "Für (a) einfach 8+4+2.",
      "Für (b) MSB als Vorzeichen, Rest 110 als Betrag.",
      "Für (c) den Wert aus (a) minus 7; für (d) MSB zählt −8."
     ],
     "loesung": "<p>(a) 8 + 4 + 2 = <b>14</b> · (b) MSB 1 → negativ, Betrag 110 = 6 → <b>−6</b> · (c) 14 − 7 = <b>7</b> · (d) −8 + 4 + 2 = <b>−2</b></p>",
     "fehler": [
      "Bei (d) das MSB mit +8 gerechnet."
     ],
     "fix": false
    },
    {
     "id": "z2a2",
     "schwierigkeit": "pruefung",
     "angabe": "Gib für n = 6 Bit den Wertebereich an: vorzeichenlos, Vorzeichen-Betrag, Exzess-31 und Zweierkomplement.",
     "hinweise": [
      "2⁶ = 64, 2⁵ = 32.",
      "Vorzeichen-Betrag: ±(2ⁿ⁻¹ − 1).",
      "Exzess-E: −E … 2ⁿ − 1 − E."
     ],
     "loesung": "<ul><li>vorzeichenlos: 0 … 2⁶ − 1 = <b>0 … 63</b></li><li>Vorzeichen-Betrag: −(2⁵ − 1) … +(2⁵ − 1) = <b>−31 … +31</b></li><li>Exzess-31: −31 … 63 − 31 = <b>−31 … +32</b></li><li>Zweierkomplement: −2⁵ … 2⁵ − 1 = <b>−32 … +31</b></li></ul>",
     "fehler": [
      "Exzess-Obergrenze falsch: 2ⁿ − 1 − E, nicht 2ⁿ − E."
     ],
     "fix": false
    },
    {
     "id": "z2a3",
     "schwierigkeit": "schwer",
     "angabe": "Interpretiere 1000 0000₂ (8 Bit) in allen vier Darstellungen (Exzess-127).",
     "hinweise": [
      "Nur das MSB ist gesetzt.",
      "Im Zweierkomplement ist das der Sonderfall der kleinsten Zahl.",
      "Exzess: 128 − 127."
     ],
     "loesung": "<p>vorzeichenlos <b>128</b> · Vorzeichen-Betrag <b>−0</b> · Exzess-127: 128 − 127 = <b>1</b> · Zweierkomplement <b>−128</b></p>",
     "fehler": [
      "„−0“ übersehen; im Zweierkomplement fälschlich −0 angegeben."
     ],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z3q1",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Welchen Dezimalwert hat 0101 1010₂ (vorzeichenlos)?",
     "antwort": "90",
     "akzeptiert": [
      "90"
     ],
     "erklaerung": "64 + 16 + 8 + 2 = 90."
    },
    {
     "id": "z3q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Beim Horner-Schema (Division durch 2) liest man die Reste …",
     "optionen": [
      "von oben nach unten",
      "von unten nach oben",
      "nur die Einsen",
      "abwechselnd"
     ],
     "richtig": 1,
     "erklaerung": "Der erste Rest ist das LSB (ganz rechts), der letzte das MSB (ganz links) → von unten nach oben."
    },
    {
     "id": "z3q3",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welches 8-Bit-Muster stellt 77 vorzeichenlos dar?",
     "optionen": [
      "0100 1101",
      "1011 0010",
      "0100 1110",
      "1001 1010"
     ],
     "richtig": 0,
     "erklaerung": "77 = 64 + 8 + 4 + 1. 1011 0010 ist das gespiegelte Muster – passiert, wenn man die Reste falsch herum liest."
    },
    {
     "id": "z3q4",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Gib 200 als 8-Bit-Muster (vorzeichenlos) an.",
     "antwort": "1100 1000",
     "akzeptiert": [
      "11001000",
      "1100 1000"
     ],
     "erklaerung": "200 = 128 + 64 + 8."
    },
    {
     "id": "z3q5",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "Welche Zahl kann im 8-Bit-Zweierkomplement NICHT dargestellt werden?",
     "optionen": [
      "−128",
      "127",
      "128",
      "−1"
     ],
     "richtig": 2,
     "erklaerung": "Der Bereich ist −128 … 127. 128 liegt eins darüber."
    },
    {
     "id": "z3q6",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Wie lautet −23 in 8-Bit-Vorzeichen-Betrag-Darstellung?",
     "optionen": [
      "1001 0111",
      "1110 1001",
      "0001 0111",
      "1110 1000"
     ],
     "richtig": 0,
     "erklaerung": "Betrag 23 = 001 0111, davor das Vorzeichenbit 1. 1110 1001 wäre das Zweierkomplement."
    },
    {
     "id": "z3q7",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Wie lautet −112 in Exzess-127-Darstellung (8 Bit)?",
     "antwort": "0000 1111",
     "akzeptiert": [
      "00001111",
      "0000 1111"
     ],
     "erklaerung": "−112 + 127 = 15 = 0000 1111 (Skript-Beispiel S. 44)."
    }
   ],
   "aufgaben": [
    {
     "id": "z3a1",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · IV a): Rechne 34 und 122 mit dem Horner-Schema in 8-Bit-Bitmuster (vorzeichenlos) um.",
     "hinweise": [
      "Immer durch 2 teilen und den Rest notieren.",
      "Aufhören, wenn das Ergebnis 0 ist.",
      "Reste von unten nach oben lesen und vorne mit Nullen auf 8 Bit auffüllen."
     ],
     "loesung": "<h4>34</h4><div class=\"chain\"><div><span>34 : 2 = 17</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>17 : 2 = 8</span><span class=\"op\">Rest 1</span></div><div><span>8 : 2 = 4</span><span class=\"op\">Rest 0</span></div><div><span>4 : 2 = 2</span><span class=\"op\">Rest 0</span></div><div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 100010₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0010 0010</span>. Probe: 32 + 2 = 34 ✓</p><h4>122</h4><div class=\"chain\"><div><span>122 : 2 = 61</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>61 : 2 = 30</span><span class=\"op\">Rest 1</span></div><div><span>30 : 2 = 15</span><span class=\"op\">Rest 0</span></div><div><span>15 : 2 = 7</span><span class=\"op\">Rest 1</span></div><div><span>7 : 2 = 3</span><span class=\"op\">Rest 1</span></div><div><span>3 : 2 = 1</span><span class=\"op\">Rest 1</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 1111010₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0111 1010</span>. Probe: 64 + 32 + 16 + 8 + 2 = 122 ✓</p>",
     "fehler": [
      "Reste von oben nach unten gelesen (ergibt die gespiegelte Zahl).",
      "Nicht auf 8 Bit aufgefüllt."
     ],
     "fix": true
    },
    {
     "id": "z3a2",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · IV b): Rechne 117 und 66 mit dem Horner-Schema in 8-Bit-Bitmuster (vorzeichenlos) um.",
     "hinweise": [
      "Immer durch 2 teilen und den Rest notieren.",
      "Aufhören, wenn das Ergebnis 0 ist.",
      "Reste von unten nach oben lesen und vorne mit Nullen auf 8 Bit auffüllen."
     ],
     "loesung": "<h4>117</h4><div class=\"chain\"><div><span>117 : 2 = 58</span><span class=\"op\">Rest 1 ← LSB</span></div><div><span>58 : 2 = 29</span><span class=\"op\">Rest 0</span></div><div><span>29 : 2 = 14</span><span class=\"op\">Rest 1</span></div><div><span>14 : 2 = 7</span><span class=\"op\">Rest 0</span></div><div><span>7 : 2 = 3</span><span class=\"op\">Rest 1</span></div><div><span>3 : 2 = 1</span><span class=\"op\">Rest 1</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 1110101₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0111 0101</span>. Probe: 64 + 32 + 16 + 4 + 1 = 117 ✓</p><h4>66</h4><div class=\"chain\"><div><span>66 : 2 = 33</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>33 : 2 = 16</span><span class=\"op\">Rest 1</span></div><div><span>16 : 2 = 8</span><span class=\"op\">Rest 0</span></div><div><span>8 : 2 = 4</span><span class=\"op\">Rest 0</span></div><div><span>4 : 2 = 2</span><span class=\"op\">Rest 0</span></div><div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 1000010₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0100 0010</span>. Probe: 64 + 2 = 66 ✓</p>",
     "fehler": [
      "Reste von oben nach unten gelesen (ergibt die gespiegelte Zahl).",
      "Nicht auf 8 Bit aufgefüllt."
     ],
     "fix": true
    },
    {
     "id": "z3a3",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · IV c): Rechne 148 und 108 mit dem Horner-Schema in 8-Bit-Bitmuster (vorzeichenlos) um.",
     "hinweise": [
      "Immer durch 2 teilen und den Rest notieren.",
      "Aufhören, wenn das Ergebnis 0 ist.",
      "Reste von unten nach oben lesen und vorne mit Nullen auf 8 Bit auffüllen."
     ],
     "loesung": "<h4>148</h4><div class=\"chain\"><div><span>148 : 2 = 74</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>74 : 2 = 37</span><span class=\"op\">Rest 0</span></div><div><span>37 : 2 = 18</span><span class=\"op\">Rest 1</span></div><div><span>18 : 2 = 9</span><span class=\"op\">Rest 0</span></div><div><span>9 : 2 = 4</span><span class=\"op\">Rest 1</span></div><div><span>4 : 2 = 2</span><span class=\"op\">Rest 0</span></div><div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 10010100₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">1001 0100</span>. Probe: 128 + 16 + 4 = 148 ✓</p><h4>108</h4><div class=\"chain\"><div><span>108 : 2 = 54</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>54 : 2 = 27</span><span class=\"op\">Rest 0</span></div><div><span>27 : 2 = 13</span><span class=\"op\">Rest 1</span></div><div><span>13 : 2 = 6</span><span class=\"op\">Rest 1</span></div><div><span>6 : 2 = 3</span><span class=\"op\">Rest 0</span></div><div><span>3 : 2 = 1</span><span class=\"op\">Rest 1</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 1101100₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0110 1100</span>. Probe: 64 + 32 + 8 + 4 = 108 ✓</p>",
     "fehler": [
      "Reste von oben nach unten gelesen (ergibt die gespiegelte Zahl).",
      "Nicht auf 8 Bit aufgefüllt."
     ],
     "fix": true
    },
    {
     "id": "z3a4",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · IV d): Rechne 128 und 200 mit dem Horner-Schema in 8-Bit-Bitmuster (vorzeichenlos) um.",
     "hinweise": [
      "Immer durch 2 teilen und den Rest notieren.",
      "Aufhören, wenn das Ergebnis 0 ist.",
      "Reste von unten nach oben lesen und vorne mit Nullen auf 8 Bit auffüllen."
     ],
     "loesung": "<h4>128</h4><div class=\"chain\"><div><span>128 : 2 = 64</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>64 : 2 = 32</span><span class=\"op\">Rest 0</span></div><div><span>32 : 2 = 16</span><span class=\"op\">Rest 0</span></div><div><span>16 : 2 = 8</span><span class=\"op\">Rest 0</span></div><div><span>8 : 2 = 4</span><span class=\"op\">Rest 0</span></div><div><span>4 : 2 = 2</span><span class=\"op\">Rest 0</span></div><div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 10000000₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">1000 0000</span>. Probe: 128 = 128 ✓</p><h4>200</h4><div class=\"chain\"><div><span>200 : 2 = 100</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>100 : 2 = 50</span><span class=\"op\">Rest 0</span></div><div><span>50 : 2 = 25</span><span class=\"op\">Rest 0</span></div><div><span>25 : 2 = 12</span><span class=\"op\">Rest 1</span></div><div><span>12 : 2 = 6</span><span class=\"op\">Rest 0</span></div><div><span>6 : 2 = 3</span><span class=\"op\">Rest 0</span></div><div><span>3 : 2 = 1</span><span class=\"op\">Rest 1</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 11001000₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">1100 1000</span>. Probe: 128 + 64 + 8 = 200 ✓</p>",
     "fehler": [
      "Reste von oben nach unten gelesen (ergibt die gespiegelte Zahl).",
      "Nicht auf 8 Bit aufgefüllt."
     ],
     "fix": true
    },
    {
     "id": "z3a5",
     "schwierigkeit": "mittel",
     "angabe": "Stelle −45 mit 8 Bit (a) in Vorzeichen-Betrag und (b) in Exzess-127 dar.",
     "hinweise": [
      "(a) Betrag 45 mit Horner, MSB = 1 setzen.",
      "(b) Zuerst den Exzess addieren: −45 + 127.",
      "82 dann ganz normal mit Horner."
     ],
     "loesung": "<p><b>(a)</b> Betrag 45:</p><div class=\"chain\"><div><span>45 : 2 = 22</span><span class=\"op\">Rest 1 ← LSB</span></div><div><span>22 : 2 = 11</span><span class=\"op\">Rest 0</span></div><div><span>11 : 2 = 5</span><span class=\"op\">Rest 1</span></div><div><span>5 : 2 = 2</span><span class=\"op\">Rest 1</span></div><div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 101101₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0010 1101</span>. Probe: 32 + 8 + 4 + 1 = 45 ✓</p><p>Das MSB wird auf 1 gesetzt (negativ): <span class=\"res mono\">1010 1101</span></p><p><b>(b)</b> −45 + 127 = 82:</p><div class=\"chain\"><div><span>82 : 2 = 41</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>41 : 2 = 20</span><span class=\"op\">Rest 1</span></div><div><span>20 : 2 = 10</span><span class=\"op\">Rest 0</span></div><div><span>10 : 2 = 5</span><span class=\"op\">Rest 0</span></div><div><span>5 : 2 = 2</span><span class=\"op\">Rest 1</span></div><div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 1010010₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0101 0010</span>. Probe: 64 + 16 + 2 = 82 ✓</p><p>Also −45 in Exzess-127 = <span class=\"res mono\">0101 0010</span></p>",
     "fehler": [
      "Bei (b) vergessen, den Exzess zu addieren."
     ],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z4q1",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Wie lautet −38 im 8-Bit-Zweierkomplement?",
     "optionen": [
      "1101 1010",
      "1101 1001",
      "1010 0110",
      "0010 0110"
     ],
     "richtig": 0,
     "erklaerung": "38 = 0010 0110 → invertiert 1101 1001 → +1 = 1101 1010. 1101 1001 ist nur invertiert (Einerkomplement), 1010 0110 ist Vorzeichen-Betrag."
    },
    {
     "id": "z4q2",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Welchen Dezimalwert hat 1111 0110₂ im Zweierkomplement?",
     "antwort": "−10",
     "akzeptiert": [
      "-10",
      "−10"
     ],
     "erklaerung": "−128 + 64 + 32 + 16 + 4 + 2 = −10. Alternative: Zweierkomplement bilden → 0000 1010 = 10, also −10."
    },
    {
     "id": "z4q3",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Was ergibt das Zweierkomplement von 0000 0000 (8 Bit)?",
     "optionen": [
      "1111 1111",
      "0000 0000",
      "1000 0000",
      "0000 0001"
     ],
     "richtig": 1,
     "erklaerung": "Invertiert 1111 1111, +1 = 1 0000 0000. Der Übertrag fällt weg → 0000 0000. Es gibt nur eine Null."
    },
    {
     "id": "z4q4",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Bildet man von einem Bitmuster zweimal hintereinander das Zweierkomplement, erhält man wieder das ursprüngliche Muster.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Zweimal das Vorzeichen wechseln ergibt die Ausgangszahl. Sogar bei 1000 0000 stimmt es (das Muster bleibt gleich)."
    },
    {
     "id": "z4q5",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "Was passiert, wenn man das Zweierkomplement von −128 (1000 0000) bildet?",
     "optionen": [
      "Es entsteht +128.",
      "Es entsteht wieder 1000 0000, weil +128 nicht darstellbar ist.",
      "Es entsteht 0111 1111.",
      "Es entsteht 0000 0000."
     ],
     "richtig": 1,
     "erklaerung": "Invertiert 0111 1111, +1 = 1000 0000. Das Ergebnis müsste +128 sein, liegt aber außerhalb von −128 … 127."
    },
    {
     "id": "z4q6",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Wie lautet −1 im 8-Bit-Zweierkomplement?",
     "antwort": "1111 1111",
     "akzeptiert": [
      "11111111",
      "1111 1111"
     ],
     "erklaerung": "1 = 0000 0001 → invertiert 1111 1110 → +1 = 1111 1111."
    },
    {
     "id": "z4q7",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welche Wertigkeit hat das MSB einer 8-Bit-Zahl im Zweierkomplement?",
     "optionen": [
      "128",
      "−128",
      "−127",
      "−1"
     ],
     "richtig": 1,
     "erklaerung": "Nur das MSB hat negative Wertigkeit: −2⁷ = −128."
    },
    {
     "id": "z4q8",
     "typ": "offen",
     "niveau": "analysieren",
     "frage": "Warum ergibt „alle Bits invertieren und 1 addieren“ genau die negative Zahl?",
     "antwort": "x + invertiert(x) = 1111…1 = −1. Daraus folgt x + (invertiert(x) + 1) = 0. Die Klammer ist also die Zahl, die zu x addiert 0 ergibt – das ist −x.",
     "erklaerung": ""
    }
   ],
   "aufgaben": [
    {
     "id": "z4a1",
     "schwierigkeit": "leicht",
     "angabe": "Stelle −75 im 8-Bit-Zweierkomplement dar.",
     "hinweise": [
      "Betrag 75 mit Horner.",
      "Alle 8 Bits umdrehen.",
      "Dann 1 addieren und Probe mit −128."
     ],
     "loesung": "<p><b>Schritt 1 · Betrag mit Horner:</b> 75</p><div class=\"chain\"><div><span>75 : 2 = 37</span><span class=\"op\">Rest 1 ← LSB</span></div><div><span>37 : 2 = 18</span><span class=\"op\">Rest 1</span></div><div><span>18 : 2 = 9</span><span class=\"op\">Rest 0</span></div><div><span>9 : 2 = 4</span><span class=\"op\">Rest 1</span></div><div><span>4 : 2 = 2</span><span class=\"op\">Rest 0</span></div><div><span>2 : 2 = 1</span><span class=\"op\">Rest 0</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 1001011₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0100 1011</span>. Probe: 64 + 8 + 2 + 1 = 75 ✓</p><p><b>Schritt 2 · alle Bits invertieren, Schritt 3 · plus 1:</b></p><div class=\"bits\">  <span class=\"c-g\">0100 1011</span>   (+75)\n  <span class=\"c-p\">1011 0100</span>   (bitweise invertiert)\n+         <span class=\"c-p\">1</span>\n  ─────────\n  <span class=\"c-r\">1011 0101</span>   (-75)</div><p><b>Probe:</b></p><div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td class=\"c-o\">-128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr><tr><th class=\"l\">Bit</th><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"c-p\">1</td></tr></table></div><p class=\"mono\">1011 0101₂ = -128 + 32 + 16 + 4 + 1 = <span class=\"res\">-75</span></p>",
     "fehler": [
      "Betrag nicht auf 8 Bit aufgefüllt, bevor invertiert wird."
     ],
     "fix": false
    },
    {
     "id": "z4a2",
     "schwierigkeit": "mittel",
     "angabe": "Welchen Dezimalwert hat 1100 1000₂ im Zweierkomplement? Rechne auf zwei Arten.",
     "hinweise": [
      "Art 1: Wertigkeiten mit MSB = −128.",
      "Art 2: Zweierkomplement bilden, Betrag ablesen, Minus davor.",
      "Beide Wege müssen dasselbe ergeben."
     ],
     "loesung": "<p><b>Art 1:</b></p><div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td class=\"c-o\">-128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr><tr><th class=\"l\">Bit</th><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr></table></div><p class=\"mono\">1100 1000₂ = -128 + 64 + 8 = <span class=\"res\">-56</span></p><p><b>Art 2:</b> invertiert 0011 0111, +1 = 0011 1000 = 32 + 16 + 8 = 56 → <span class=\"res\">−56</span> ✓</p>",
     "fehler": [
      "MSB mit +128 gezählt (ergibt 200 = vorzeichenlos)."
     ],
     "fix": false
    },
    {
     "id": "z4a3",
     "schwierigkeit": "pruefung",
     "angabe": "Stelle −100 im 8-Bit-Zweierkomplement dar und gib das Ergebnis auch in Hex an.",
     "hinweise": [
      "100 = 64 + 32 + 4.",
      "Invertieren, +1.",
      "Hex in Viererblöcken."
     ],
     "loesung": "<p><b>Schritt 1 · Betrag mit Horner:</b> 100</p><div class=\"chain\"><div><span>100 : 2 = 50</span><span class=\"op\">Rest 0 ← LSB</span></div><div><span>50 : 2 = 25</span><span class=\"op\">Rest 0</span></div><div><span>25 : 2 = 12</span><span class=\"op\">Rest 1</span></div><div><span>12 : 2 = 6</span><span class=\"op\">Rest 0</span></div><div><span>6 : 2 = 3</span><span class=\"op\">Rest 0</span></div><div><span>3 : 2 = 1</span><span class=\"op\">Rest 1</span></div><div><span>1 : 2 = 0</span><span class=\"op\">Rest 1 ← MSB, Ende weil 0</span></div></div><p>Von unten nach oben gelesen: 1100100₂ → auf 8 Bit aufgefüllt: <span class=\"res mono\">0110 0100</span>. Probe: 64 + 32 + 4 = 100 ✓</p><p><b>Schritt 2 · alle Bits invertieren, Schritt 3 · plus 1:</b></p><div class=\"bits\">  <span class=\"c-g\">0110 0100</span>   (+100)\n  <span class=\"c-p\">1001 1011</span>   (bitweise invertiert)\n+         <span class=\"c-p\">1</span>\n  ─────────\n  <span class=\"c-r\">1001 1100</span>   (-100)</div><p><b>Probe:</b></p><div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td class=\"c-o\">-128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr><tr><th class=\"l\">Bit</th><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"\">0</td></tr></table></div><p class=\"mono\">1001 1100₂ = -128 + 16 + 8 + 4 = <span class=\"res\">-100</span></p><p>Hex: 1001 1100 → <span class=\"res\">9Ch</span></p>",
     "fehler": [
      "Hex aus dem positiven Muster gebildet."
     ],
     "fix": false
    },
    {
     "id": "z4a4",
     "schwierigkeit": "schwer",
     "angabe": "Zeige mit einer Rechnung, dass 1000 0000 (8 Bit) beim Zweierkomplement-Bilden unverändert bleibt, und erkläre, was das bedeutet.",
     "hinweise": [
      "Invertiere 1000 0000.",
      "Addiere 1.",
      "Welche Zahl wäre das richtige Ergebnis – liegt sie im Bereich?"
     ],
     "loesung": "<div class=\"bits\">  1000 0000   (−128)\n  0111 1111   (invertiert)\n+         1\n  ─────────\n  1000 0000   (wieder −128)</div><p>Richtig wäre +128, aber der Bereich endet bei +127. Das Vorzeichen von −128 lässt sich mit 8 Bit nicht wechseln – hier würde ein Overflow auftreten.</p>",
     "fehler": [
      "Schlussfolgerung „Rechnung falsch“ – die Rechnung ist richtig, nur die Zahl nicht darstellbar."
     ],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z5q1",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Gib 1011 0111₂ in Hexadezimal an.",
     "antwort": "B7h",
     "akzeptiert": [
      "b7",
      "b7h",
      "0xb7"
     ],
     "erklaerung": "1011 = 11 = B, 0111 = 7 → B7h."
    },
    {
     "id": "z5q2",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welches Bitmuster entspricht 3Ch?",
     "optionen": [
      "0011 1100",
      "0011 1011",
      "1100 0011",
      "0011 1101"
     ],
     "richtig": 0,
     "erklaerung": "3 = 0011, C = 12 = 1100."
    },
    {
     "id": "z5q3",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Welchen Dezimalwert hat 2Fh?",
     "antwort": "47",
     "akzeptiert": [
      "47"
     ],
     "erklaerung": "2·16 + 15 = 32 + 15 = 47."
    },
    {
     "id": "z5q4",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Warum steht eine Hexziffer für genau 4 Bit?",
     "optionen": [
      "Weil 16 = 2⁴",
      "Weil ein Byte 4 Bit hat",
      "Weil es 4 Buchstaben gibt",
      "Weil 4 · 4 = 16 Ziffern"
     ],
     "richtig": 0,
     "erklaerung": "16 Hexziffern entsprechen genau den 16 Mustern von 4 Bit."
    },
    {
     "id": "z5q5",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welchen Dezimalwert hat C8h?",
     "optionen": [
      "128",
      "200",
      "208",
      "192"
     ],
     "richtig": 1,
     "erklaerung": "C = 12: 12·16 + 8 = 192 + 8 = 200 (Blatt 2 d)."
    },
    {
     "id": "z5q6",
     "typ": "wahrfalsch",
     "niveau": "erinnern",
     "frage": "FFh ist die größte vorzeichenlose 8-Bit-Zahl und entspricht 255.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "FF = 1111 1111 = 15·16 + 15 = 255."
    }
   ],
   "aufgaben": [
    {
     "id": "z5a1",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · VII: Gib alle Bitmuster aus IV (Operanden) und VI (Ergebnisse) in Hex an.",
     "hinweise": [
      "Jedes 8-Bit-Muster in zwei Viererblöcke teilen.",
      "Jeden Block mit 8-4-2-1 ausrechnen.",
      "10–15 als A–F schreiben."
     ],
     "loesung": "<p><b>a)</b> 0010 0010 → <b>22h</b> · 0111 1010 → <b>7Ah</b> · Ergebnis 1001 1100 → <b>9Ch</b></p><p><b>b)</b> 0111 0101 → <b>75h</b> · 0100 0010 → <b>42h</b> · Ergebnis 1011 0111 → <b>B7h</b></p><p><b>c)</b> 1001 0100 → <b>94h</b> · 0110 1100 → <b>6Ch</b> · Ergebnis 0000 0000 → <b>00h</b></p><p><b>d)</b> 1000 0000 → <b>80h</b> · 1100 1000 → <b>C8h</b> · Ergebnis 0100 1000 → <b>48h</b></p>",
     "fehler": [
      "Ergebnis von c) ist 00h, nicht 100h – nur 8 Bit!"
     ],
     "fix": true
    },
    {
     "id": "z5a2",
     "schwierigkeit": "leicht",
     "angabe": "Wandle A5h in ein Bitmuster und in eine Dezimalzahl um.",
     "hinweise": [
      "A = 10.",
      "Jede Ziffer → 4 Bit.",
      "10·16 + 5."
     ],
     "loesung": "<p>A = 1010, 5 = 0101 → <span class=\"mono res\">1010 0101</span> · 10·16 + 5 = 160 + 5 = <span class=\"res\">165</span></p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "z5a3",
     "schwierigkeit": "mittel",
     "angabe": "Wandle das 16-Bit-Muster 1101 1110 1010 1101₂ in Hex um.",
     "hinweise": [
      "Vier Viererblöcke.",
      "1101 = 13, 1110 = 14, 1010 = 10, 1101 = 13.",
      "13 = D, 14 = E, 10 = A."
     ],
     "loesung": "<p>1101 → D · 1110 → E · 1010 → A · 1101 → D → <span class=\"res\">DEADh</span></p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z6q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Mit welchem Gatter wird beim Halbaddierer das Ergebnisbit e gebildet?",
     "optionen": [
      "AND",
      "OR",
      "XOR",
      "NAND"
     ],
     "richtig": 2,
     "erklaerung": "e ist 1, wenn genau einer der Eingänge 1 ist → XOR."
    },
    {
     "id": "z6q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Mit welchem Gatter wird der Übertrag c des Halbaddierers gebildet?",
     "optionen": [
      "AND",
      "OR",
      "XOR",
      "NOR"
     ],
     "richtig": 0,
     "erklaerung": "Ein Übertrag entsteht nur bei 1 + 1 → AND."
    },
    {
     "id": "z6q3",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Volladdierer mit a = 1, b = 1, c_in = 1. Was liefert er?",
     "optionen": [
      "c_out = 1, e = 0",
      "c_out = 1, e = 1",
      "c_out = 0, e = 1",
      "c_out = 0, e = 0"
     ],
     "richtig": 1,
     "erklaerung": "1 + 1 + 1 = 3 = 11₂ → c_out = 1, e = 1."
    },
    {
     "id": "z6q4",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Ein Halbaddierer kann den Übertrag der vorherigen Stelle mitverarbeiten.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "Er hat nur zwei Eingänge (a, b). Für den Übertrag braucht man den Volladdierer mit c_in."
    },
    {
     "id": "z6q5",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Ein Volladdierer wird aus zwei Halbaddierern gebaut. Wie werden deren Überträge verknüpft?",
     "optionen": [
      "AND",
      "OR",
      "NAND",
      "gar nicht"
     ],
     "richtig": 1,
     "erklaerung": "Ein Übertrag entsteht, wenn im ersten ODER im zweiten HA einer entsteht. Beide gleichzeitig kann nicht passieren (deshalb würde hier sogar XOR dasselbe liefern)."
    },
    {
     "id": "z6q6",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Auf welchen Wert wird c_in des niederwertigsten Volladdierers beim Addieren gelegt?",
     "optionen": [
      "0",
      "1",
      "auf das Carry",
      "auf das MSB"
     ],
     "richtig": 0,
     "erklaerung": "Vor dem LSB gibt es keinen Übertrag. (Bei der Ersatzaddition wird er auf 1 gesetzt!)"
    },
    {
     "id": "z6q7",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Wie viele Volladdierer braucht ein Addierwerk für zwei 8-Bit-Zahlen?",
     "antwort": "8",
     "akzeptiert": [
      "8"
     ],
     "erklaerung": "Einer pro Bitstelle."
    }
   ],
   "aufgaben": [
    {
     "id": "z6a1",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · I: Gib (a) das Schaltbild und (b) die Wahrheitstabelle eines Halbaddierers an.",
     "hinweise": [
      "Zwei Eingänge a, b, zwei Ausgänge c, e.",
      "Welche Kombination erzeugt einen Übertrag?",
      "e = a ⊕ b, c = a & b."
     ],
     "loesung": "<div class=\"two\">\n<div>\n<h4>Halbaddierer (HA)</h4>\n<p>Er addiert zwei Bits a und b. Das Ergebnis kann höchstens 1 + 1 = 2 = 10₂ sein, deshalb braucht man 2 Ausgänge: das Ergebnis e und den Übertrag c (carry).</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th>b</th><th>a</th><th>c</th><th>e</th></tr>\n<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>\n<tr><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td class=\"c-p\">1</td><td>0</td></tr></table></div>\n<p>e = a ⊕ b (XOR, „=1“) · c = a &amp; b (AND)</p>\n</div>\n<figure aria-label=\"Schaltung Halbaddierer\">\n<svg viewBox=\"0 0 260 190\" width=\"260\">\n <g stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" style=\"color:var(--ink)\">\n  <line x1=\"70\" y1=\"10\" x2=\"70\" y2=\"60\"/><line x1=\"150\" y1=\"10\" x2=\"150\" y2=\"60\"/>\n  <line x1=\"70\" y1=\"35\" x2=\"180\" y2=\"35\"/><line x1=\"180\" y1=\"35\" x2=\"180\" y2=\"60\"/>\n  <line x1=\"150\" y1=\"45\" x2=\"100\" y2=\"45\"/><line x1=\"100\" y1=\"45\" x2=\"100\" y2=\"60\"/>\n  <rect x=\"50\" y=\"60\" width=\"60\" height=\"44\" fill=\"var(--paper)\"/><rect x=\"140\" y=\"60\" width=\"60\" height=\"44\" fill=\"var(--paper)\"/>\n  <line x1=\"80\" y1=\"104\" x2=\"80\" y2=\"140\"/><line x1=\"170\" y1=\"104\" x2=\"170\" y2=\"140\"/>\n </g>\n <circle cx=\"70\" cy=\"35\" r=\"3.5\" fill=\"var(--ink)\"/><circle cx=\"150\" cy=\"45\" r=\"3.5\" fill=\"var(--ink)\"/>\n <text x=\"64\" y=\"10\">b</text><text x=\"144\" y=\"10\">a</text>\n <text x=\"70\" y=\"88\" class=\"c-v\" style=\"fill:var(--v)\">&amp;</text><text x=\"157\" y=\"88\" style=\"fill:var(--v)\">=1</text>\n <text x=\"74\" y=\"160\" style=\"fill:var(--p)\">c</text><text x=\"164\" y=\"160\" style=\"fill:var(--p)\">e</text>\n <text x=\"40\" y=\"184\" style=\"font-size:13px;fill:var(--muted)\">AND → Übertrag · XOR → Ergebnis</text>\n</svg></figure>\n</div>\n\n",
     "fehler": [
      "Ausgänge vertauscht."
     ],
     "fix": true
    },
    {
     "id": "z6a2",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · II: Gib (a) das Schaltbild und (b) die Wahrheitstabelle eines Volladdierers an.",
     "hinweise": [
      "Drei Eingänge: a, b, c_in.",
      "Acht Zeilen – zähle 000 bis 111.",
      "c_out = 1, sobald mindestens zwei Eingänge 1 sind."
     ],
     "loesung": "<h4>Volladdierer (VA)</h4>\n<p>Ab der zweiten Stelle muss man den Übertrag c<sub>in</sub> der Stelle davor mitzählen. Das sind drei Eingänge, die Summe ist höchstens 1+1+1 = 3 = 11₂. Zwei Ausgänge (e und c<sub>out</sub>) reichen also noch.</p>\n<div class=\"scroll\"><table class=\"t\"><tr><th>c<sub>in</sub></th><th>b</th><th>a</th><th>c<sub>out</sub></th><th>e</th><th class=\"l\">Summe</th></tr>\n<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td class=\"l\">0</td></tr>\n<tr><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td class=\"l\">1</td></tr>\n<tr><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td class=\"l\">1</td></tr>\n<tr><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td class=\"l\">2 = 10₂</td></tr>\n<tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td class=\"l\">1</td></tr>\n<tr><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td class=\"l\">2 = 10₂</td></tr>\n<tr><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td class=\"l\">2 = 10₂</td></tr>\n<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td class=\"l\">3 = 11₂</td></tr></table></div>\n<ul>\n<li>Vereinfacht mit KV-Diagramm: e = a ⊕ b ⊕ c<sub>in</sub> und c<sub>out</sub> = (a&amp;b) ∨ (a&amp;c<sub>in</sub>) ∨ (b&amp;c<sub>in</sub>). Zum zweiten Ausdruck: Der Übertrag ist 1, sobald mindestens zwei Eingänge 1 sind.</li>\n<li>Man kann einen VA auch aus <b>2 Halbaddierern + OR</b> bauen. Der 1. HA rechnet a + b, der 2. HA zählt c<sub>in</sub> dazu. Die beiden Überträge werden mit OR verknüpft. Sie können nie beide 1 sein, deshalb reicht OR.</li>\n</ul>\n",
     "fehler": [
      "Nur vier Zeilen geschrieben."
     ],
     "fix": true
    },
    {
     "id": "z6a3",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · III: Gib das Blockschaltbild eines 4-Bit-Addierwerks inklusive Zero-Flag und Carry-Flag an.",
     "hinweise": [
      "Vier VA nebeneinander, c_out → c_in der nächsten Stelle.",
      "c_in ganz rechts = 0, c_out ganz links = CF.",
      "ZF: alle e-Bits in ein NOR."
     ],
     "loesung": "\n<figure aria-label=\"4-Bit-Addierwerk mit CF und ZF\">\n<svg viewBox=\"0 0 640 300\" width=\"640\">\n <defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"var(--ink)\"/></marker></defs>\n <g fill=\"none\" stroke-width=\"2\">\n  <!-- VA boxes -->\n  <g stroke=\"var(--ink)\">\n   <rect x=\"120\" y=\"70\" width=\"100\" height=\"60\" fill=\"var(--paper)\"/><rect x=\"250\" y=\"70\" width=\"100\" height=\"60\" fill=\"var(--paper)\"/>\n   <rect x=\"380\" y=\"70\" width=\"100\" height=\"60\" fill=\"var(--paper)\"/><rect x=\"510\" y=\"70\" width=\"100\" height=\"60\" fill=\"var(--paper)\"/>\n  </g>\n  <!-- inputs -->\n  <g stroke=\"var(--o)\">\n   <line x1=\"140\" y1=\"20\" x2=\"140\" y2=\"70\" marker-end=\"url(#ar)\"/><line x1=\"165\" y1=\"20\" x2=\"165\" y2=\"70\" marker-end=\"url(#ar)\"/>\n   <line x1=\"270\" y1=\"20\" x2=\"270\" y2=\"70\" marker-end=\"url(#ar)\"/><line x1=\"295\" y1=\"20\" x2=\"295\" y2=\"70\" marker-end=\"url(#ar)\"/>\n   <line x1=\"400\" y1=\"20\" x2=\"400\" y2=\"70\" marker-end=\"url(#ar)\"/><line x1=\"425\" y1=\"20\" x2=\"425\" y2=\"70\" marker-end=\"url(#ar)\"/>\n   <line x1=\"530\" y1=\"20\" x2=\"530\" y2=\"70\" marker-end=\"url(#ar)\"/><line x1=\"555\" y1=\"20\" x2=\"555\" y2=\"70\" marker-end=\"url(#ar)\"/>\n  </g>\n  <!-- carry chain -->\n  <g stroke=\"var(--v)\">\n   <path d=\"M590 20 L590 70\" marker-end=\"url(#ar)\"/>\n   <path d=\"M535 130 L535 145 L495 145 L495 50 L460 50 L460 70\" marker-end=\"url(#ar)\"/>\n   <path d=\"M405 130 L405 145 L365 145 L365 50 L330 50 L330 70\" marker-end=\"url(#ar)\"/>\n   <path d=\"M275 130 L275 145 L235 145 L235 50 L200 50 L200 70\" marker-end=\"url(#ar)\"/>\n   <path d=\"M145 130 L145 160 L40 160\" marker-end=\"url(#ar)\"/>\n  </g>\n  <!-- outputs e -->\n  <g stroke=\"var(--g)\">\n   <line x1=\"195\" y1=\"130\" x2=\"195\" y2=\"270\" marker-end=\"url(#ar)\"/><line x1=\"325\" y1=\"130\" x2=\"325\" y2=\"270\" marker-end=\"url(#ar)\"/>\n   <line x1=\"455\" y1=\"130\" x2=\"455\" y2=\"270\" marker-end=\"url(#ar)\"/><line x1=\"585\" y1=\"130\" x2=\"585\" y2=\"270\" marker-end=\"url(#ar)\"/>\n  </g>\n  <!-- ZF NOR -->\n  <g stroke=\"var(--red)\">\n   <line x1=\"195\" y1=\"200\" x2=\"95\" y2=\"200\"/><line x1=\"325\" y1=\"212\" x2=\"95\" y2=\"212\"/>\n   <line x1=\"455\" y1=\"224\" x2=\"95\" y2=\"224\"/><line x1=\"585\" y1=\"236\" x2=\"95\" y2=\"236\"/>\n   <rect x=\"60\" y=\"192\" width=\"35\" height=\"52\" fill=\"var(--paper)\"/>\n   <line x1=\"52\" y1=\"218\" x2=\"20\" y2=\"218\" marker-end=\"url(#ar)\"/>\n  </g>\n </g>\n <circle cx=\"56\" cy=\"218\" r=\"4\" fill=\"var(--paper)\" stroke=\"var(--red)\" stroke-width=\"2\"/>\n <g fill=\"var(--ink)\"><circle cx=\"195\" cy=\"200\" r=\"3.5\"/><circle cx=\"325\" cy=\"212\" r=\"3.5\"/><circle cx=\"455\" cy=\"224\" r=\"3.5\"/><circle cx=\"585\" cy=\"236\" r=\"3.5\"/></g>\n <g style=\"font-size:15px\">\n  <text x=\"153\" y=\"105\">VA₃</text><text x=\"283\" y=\"105\">VA₂</text><text x=\"413\" y=\"105\">VA₁</text><text x=\"543\" y=\"105\">VA₀</text>\n  <text x=\"132\" y=\"15\" style=\"fill:var(--o)\">a₃ b₃</text><text x=\"262\" y=\"15\" style=\"fill:var(--o)\">a₂ b₂</text><text x=\"392\" y=\"15\" style=\"fill:var(--o)\">a₁ b₁</text><text x=\"522\" y=\"15\" style=\"fill:var(--o)\">a₀ b₀</text>\n  <text x=\"575\" y=\"15\" style=\"fill:var(--v)\">„0“</text>\n  <text x=\"8\" y=\"164\" style=\"fill:var(--v)\">CF</text>\n  <text x=\"66\" y=\"223\" style=\"fill:var(--red)\">≥1</text><text x=\"0\" y=\"214\" style=\"fill:var(--red)\">ZF</text>\n  <text x=\"180\" y=\"290\" style=\"fill:var(--g)\">e₃ (MSB)</text><text x=\"318\" y=\"290\" style=\"fill:var(--g)\">e₂</text><text x=\"448\" y=\"290\" style=\"fill:var(--g)\">e₁</text><text x=\"565\" y=\"290\" style=\"fill:var(--g)\">e₀ (LSB)</text>\n </g>\n</svg>\n<figcaption>Carry wandert von rechts (LSB) nach links. CF ist der letzte c<sub>out</sub>. ZF ist das NOR aller Ergebnisbits, also OR mit Negationsring am Ausgang.</figcaption></figure>",
     "fehler": [
      "ZF mit OR ohne Negation gezeichnet (wäre 1, wenn das Ergebnis NICHT null ist)."
     ],
     "fix": true
    }
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
   ],
   "fragen": [
    {
     "id": "z7q1",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Was passiert im Rechenwerk bei ADD/SUB = 1?",
     "optionen": [
      "b wird invertiert und c_in = 1",
      "a wird invertiert und c_in = 0",
      "Nur c_in wird 1",
      "Das Ergebnis wird invertiert"
     ],
     "richtig": 0,
     "erklaerung": "Die XOR-Gatter invertieren b, die 1 geht zugleich an c_in → a + b̄ + 1 = a − b."
    },
    {
     "id": "z7q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was ergibt x ⊕ 1?",
     "optionen": [
      "x",
      "x̄ (x invertiert)",
      "1",
      "0"
     ],
     "richtig": 1,
     "erklaerung": "XOR mit 1 dreht das Bit um. Darum dient das XOR als „einschaltbarer Invertierer“."
    },
    {
     "id": "z7q3",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Rechne 0110 − 0011 (4 Bit) per Ersatzaddition. Welches 4-Bit-Ergebnis entsteht?",
     "antwort": "0011",
     "akzeptiert": [
      "0011"
     ],
     "erklaerung": "0110 + 1100 + 1 = 1 0011 → 0011 = 3 ✓ (6 − 3)."
    },
    {
     "id": "z7q4",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Für die Subtraktion braucht ein Prozessor ein eigenes Subtrahierwerk.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "Dank Ersatzaddition reicht das vorhandene Addierwerk plus XOR-Gatter."
    },
    {
     "id": "z7q5",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Woher kommt bei der Ersatzaddition die „+1“ des Zweierkomplements?",
     "optionen": [
      "Aus einem zusätzlichen Addierer",
      "Aus c_in = 1 am ersten Volladdierer",
      "Aus dem Carry-Flag",
      "Aus dem MSB"
     ],
     "richtig": 1,
     "erklaerung": "Der Übertragseingang des niederwertigsten VA wird auf 1 gesetzt."
    },
    {
     "id": "z7q6",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "Bei 0101 − 0010 per Ersatzaddition entsteht ein Übertrag von 1 aus dem MSB. Was bedeutet das (vorzeichenlos)?",
     "optionen": [
      "Fehler, das Ergebnis ist zu groß",
      "Kein Fehler – Übertrag 1 heißt hier: nichts geborgt",
      "Das Ergebnis ist negativ",
      "Overflow"
     ],
     "richtig": 1,
     "erklaerung": "Bei der Ersatzaddition ist der Übertrag komplementär zum Borrow. Erst durch Invertieren wird daraus das CF (CF = 0 → korrekt)."
    }
   ],
   "aufgaben": [
    {
     "id": "z7a1",
     "schwierigkeit": "mittel",
     "angabe": "Rechne 9 − 7 mit 8 Bit per Ersatzaddition. Welchen Wert hat der Übertrag und was bedeutet er?",
     "hinweise": [
      "9 = 0000 1001, 7 = 0000 0111.",
      "b invertieren, c_in = 1.",
      "Bei Subtraktion: Übertrag 1 → kein Borrow → CF (invertiert) = 0."
     ],
     "loesung": "<div class=\"bits\">  <span class=\"c-g\">0000 1001</span>   (a = 9)\n  <span class=\"c-p\">1111 1000</span>   (b = 0000 0111 invertiert)\n+         <span class=\"c-p\">1</span>   (c_in = 1)\n  ─────────\n<span class=\"c-o\">1</span> <span class=\"c-r\">0000 0010</span></div><p>Ergebnis 0000 0010 = <span class=\"res\">2</span> ✓. Übertrag = 1 → kein Borgen → nach Invertierung CF = 0: vorzeichenlos korrekt (Skript-Beispiel S. 57).</p>",
     "fehler": [
      "Übertrag 1 als Fehler gewertet."
     ],
     "fix": false
    },
    {
     "id": "z7a2",
     "schwierigkeit": "pruefung",
     "angabe": "Rechne 0011 − 0101 (4 Bit) per Ersatzaddition. Interpretiere das Ergebnis vorzeichenlos und im Zweierkomplement.",
     "hinweise": [
      "3 − 5 = −2.",
      "0101 invertiert = 1010.",
      "Übertrag 0 heißt bei Subtraktion: geborgt → vorzeichenlos Fehler."
     ],
     "loesung": "<div class=\"bits\">  <span class=\"c-g\">0011</span>   (a = 3)\n  <span class=\"c-p\">1010</span>   (b = 0101 invertiert)\n+    <span class=\"c-p\">1</span>   (c_in = 1)\n  ────\n0 <span class=\"c-r\">1110</span></div><p>Ergebnis 1110. Übertrag = 0 → CF = 1. Vorzeichenlos: 14 – <span class=\"c-o\">falsch</span> (3 − 5 ist negativ). Zweierkomplement: −8 + 4 + 2 = <span class=\"res\">−2</span> ✓ – kein Overflow, weil 3 und −5 unterschiedliche Vorzeichen haben.</p>",
     "fehler": [
      "Vorzeichenloses Ergebnis als richtig angesehen."
     ],
     "fix": false
    },
    {
     "id": "z7a3",
     "schwierigkeit": "mittel",
     "angabe": "Erkläre das Rechenwerk mit Steuerleitung ADD/SUB (Abbildung 2-8): Welche Werte liegen bei ADD/SUB = 0 und 1 an den b-Eingängen der VA und an c_in?",
     "hinweise": [
      "Was macht ein XOR mit 0, was mit 1?",
      "Die Steuerleitung geht auch an c_in.",
      "Bei 1 entsteht a + b̄ + 1."
     ],
     "loesung": "<ul><li><b>ADD/SUB = 0:</b> b ⊕ 0 = b, c_in = 0 → a + b (normales Addierwerk)</li><li><b>ADD/SUB = 1:</b> b ⊕ 1 = b̄, c_in = 1 → a + b̄ + 1 = a − b</li></ul>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z8q1",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "1111 1111 + 0000 0001 (8 Bit). Welche Flags sind gesetzt?",
     "optionen": [
      "CF = 1, OF = 0, ZF = 1",
      "CF = 1, OF = 1, ZF = 1",
      "CF = 0, OF = 0, ZF = 1",
      "CF = 1, OF = 0, ZF = 0"
     ],
     "richtig": 0,
     "erklaerung": "Ergebnis 0000 0000 → ZF = 1. Übertrag aus Bit 7 → CF = 1. Übertrag hinein und heraus → OF = 1 ⊕ 1 = 0 (−1 + 1 = 0 stimmt)."
    },
    {
     "id": "z8q2",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "0110 0001 + 0011 0000 (97 + 48). Welche Flags?",
     "optionen": [
      "CF = 1, OF = 0",
      "CF = 0, OF = 1",
      "CF = 1, OF = 1",
      "CF = 0, OF = 0"
     ],
     "richtig": 1,
     "erklaerung": "Ergebnis 1001 0001: positiv + positiv = negativ → OF = 1. Kein Übertrag aus Bit 7 → CF = 0. Vorzeichenlos stimmt 145."
    },
    {
     "id": "z8q3",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welches Flag zeigt einen Fehler bei Interpretation im Zweierkomplement an?",
     "optionen": [
      "Carry-Flag",
      "Overflow-Flag",
      "Zero-Flag",
      "keines"
     ],
     "richtig": 1,
     "erklaerung": "OF = 1 → Zweierkomplement-Ergebnis falsch. CF gilt für vorzeichenlos."
    },
    {
     "id": "z8q4",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Carry = 1 bedeutet immer, dass das Ergebnis falsch ist.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "Nur bei vorzeichenloser Interpretation. Beispiel −1 + 1: CF = 1, im Zweierkomplement aber korrekt."
    },
    {
     "id": "z8q5",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "Wann kann bei einer Addition im Zweierkomplement KEIN Overflow entstehen?",
     "optionen": [
      "Wenn beide Summanden negativ sind",
      "Wenn die Summanden unterschiedliche Vorzeichen haben",
      "Wenn CF = 1 ist",
      "Wenn das Ergebnis 0 ist"
     ],
     "richtig": 1,
     "erklaerung": "Eine positive und eine negative Zahl ergeben immer etwas dazwischen – das liegt sicher im Bereich."
    },
    {
     "id": "z8q6",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie wird das Overflow-Flag schaltungstechnisch einfach gebildet?",
     "optionen": [
      "AND der beiden MSBs",
      "XOR aus Übertrag in den letzten VA und Übertrag aus dem letzten VA",
      "Negation des Carry",
      "NOR aller Ergebnisbits"
     ],
     "richtig": 1,
     "erklaerung": "Abbildung 2-11: OF = c_in(MSB) ⊕ c_out(MSB). NOR aller Ergebnisbits ist das Zero-Flag."
    },
    {
     "id": "z8q7",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Wie wird das Zero-Flag gebildet?",
     "optionen": [
      "OR aller Ergebnisbits",
      "NOR aller Ergebnisbits",
      "AND aller Ergebnisbits",
      "XOR von MSB und LSB"
     ],
     "richtig": 1,
     "erklaerung": "ZF = 1 nur, wenn alle Bits 0 sind → OR liefert 0, die Negation macht 1 daraus."
    },
    {
     "id": "z8q8",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "1000 0001 + 1000 0000 (−127 + −128). Welche Flags?",
     "optionen": [
      "CF = 1, OF = 1",
      "CF = 1, OF = 0",
      "CF = 0, OF = 1",
      "CF = 0, OF = 0"
     ],
     "richtig": 0,
     "erklaerung": "Ergebnis 0000 0001: negativ + negativ = positiv → OF = 1; Übertrag aus Bit 7 → CF = 1. Beide Interpretationen falsch."
    },
    {
     "id": "z8q9",
     "typ": "wahrfalsch",
     "niveau": "analysieren",
     "frage": "Bei einer Subtraktion per Ersatzaddition bedeutet ein Übertrag von 0 aus dem MSB, dass das Ergebnis vorzeichenlos falsch ist.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Übertrag 0 = es musste geborgt werden. Darum wird invertiert: CF = 1 → Fehler."
    }
   ],
   "aufgaben": [
    {
     "id": "z8a1",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · V/VI a): Addiere 0010 0010 (34) und 0111 1010 (122). Bestimme Zero-Flag und Carry-Flag und prüfe, ob das Ergebnis (vorzeichenlos) stimmt.",
     "hinweise": [
      "Stelle für Stelle von rechts, Übertrag immer mitnehmen.",
      "CF = Übertrag aus Bit 7; ZF = 1 nur wenn alle Bits 0.",
      "Ergebnis zurückrechnen und mit der Summe der Dezimalzahlen vergleichen."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Bit</th><th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th></tr><tr><th class=\"l\">a</th><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td></tr><tr><th class=\"l\">b</th><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td></tr><tr><th class=\"l\">Übertrag von rechts</th><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"c-v\">1</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">Rechnung</th><td class=\"\">0+0+1=1</td><td class=\"\">0+1+1=10₂</td><td class=\"\">1+1=10₂</td><td class=\"\">0+1=1</td><td class=\"\">0+1=1</td><td class=\"\">0+0+1=1</td><td class=\"\">1+1=10₂</td><td class=\"\">0+0=0</td></tr><tr><th class=\"l\">Ergebnisbit</th><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td><td class=\"c-r\">1</td><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td></tr><tr><th class=\"l\">Übertrag nach links</th><td class=\"\">0 = CF</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td></tr></table></div><div class=\"bits\">  0010 0010   (34)\n+ 0111 1010   (122)\n  ─────────\n  <span class=\"c-r\">1001 1100</span></div><p><b>Flags:</b> CF = 0 (Übertrag aus Bit 7) · Übertrag in Bit 7 = 1 → OF = 1 ⊕ 0 = 1 · ZF = 0 (nicht alle Bits 0)</p><p><b>Vorzeichenlos:</b> 34 + 122 → 156: stimmt ✓</p>",
     "fehler": [
      "Übertrag in der nächsten Spalte vergessen.",
      "CF = 1 übersehen, weil das 9. Bit nicht hingeschrieben wurde."
     ],
     "fix": true
    },
    {
     "id": "z8a2",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · V/VI b): Addiere 0111 0101 (117) und 0100 0010 (66). Bestimme Zero-Flag und Carry-Flag und prüfe, ob das Ergebnis (vorzeichenlos) stimmt.",
     "hinweise": [
      "Stelle für Stelle von rechts, Übertrag immer mitnehmen.",
      "CF = Übertrag aus Bit 7; ZF = 1 nur wenn alle Bits 0.",
      "Ergebnis zurückrechnen und mit der Summe der Dezimalzahlen vergleichen."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Bit</th><th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th></tr><tr><th class=\"l\">a</th><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td></tr><tr><th class=\"l\">b</th><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td></tr><tr><th class=\"l\">Übertrag von rechts</th><td class=\"c-v\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">Rechnung</th><td class=\"\">0+0+1=1</td><td class=\"\">1+1=10₂</td><td class=\"\">1+0=1</td><td class=\"\">1+0=1</td><td class=\"\">0+0=0</td><td class=\"\">1+0=1</td><td class=\"\">0+1=1</td><td class=\"\">1+0=1</td></tr><tr><th class=\"l\">Ergebnisbit</th><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td><td class=\"c-r\">1</td><td class=\"c-r\">1</td></tr><tr><th class=\"l\">Übertrag nach links</th><td class=\"\">0 = CF</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr></table></div><div class=\"bits\">  0111 0101   (117)\n+ 0100 0010   (66)\n  ─────────\n  <span class=\"c-r\">1011 0111</span></div><p><b>Flags:</b> CF = 0 (Übertrag aus Bit 7) · Übertrag in Bit 7 = 1 → OF = 1 ⊕ 0 = 1 · ZF = 0 (nicht alle Bits 0)</p><p><b>Vorzeichenlos:</b> 117 + 66 → 183: stimmt ✓</p>",
     "fehler": [
      "Übertrag in der nächsten Spalte vergessen.",
      "CF = 1 übersehen, weil das 9. Bit nicht hingeschrieben wurde."
     ],
     "fix": true
    },
    {
     "id": "z8a3",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · V/VI c): Addiere 1001 0100 (148) und 0110 1100 (108). Bestimme Zero-Flag und Carry-Flag und prüfe, ob das Ergebnis (vorzeichenlos) stimmt.",
     "hinweise": [
      "Stelle für Stelle von rechts, Übertrag immer mitnehmen.",
      "CF = Übertrag aus Bit 7; ZF = 1 nur wenn alle Bits 0.",
      "Ergebnis zurückrechnen und mit der Summe der Dezimalzahlen vergleichen."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Bit</th><th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th></tr><tr><th class=\"l\">a</th><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">b</th><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">Übertrag von rechts</th><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">Rechnung</th><td class=\"\">1+0+1=10₂</td><td class=\"\">0+1+1=10₂</td><td class=\"\">0+1+1=10₂</td><td class=\"\">1+0+1=10₂</td><td class=\"\">0+1+1=10₂</td><td class=\"\">1+1=10₂</td><td class=\"\">0+0=0</td><td class=\"\">0+0=0</td></tr><tr><th class=\"l\">Ergebnisbit</th><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td></tr><tr><th class=\"l\">Übertrag nach links</th><td class=\"c-o\">1 = CF</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td></tr></table></div><div class=\"bits\">  1001 0100   (148)\n+ 0110 1100   (108)\n  ─────────\n<span class=\"c-o\">1</span> <span class=\"c-r\">0000 0000</span></div><p><b>Flags:</b> CF = 1 (Übertrag aus Bit 7) · Übertrag in Bit 7 = 1 → OF = 1 ⊕ 1 = 0 · ZF = 1 (Ergebnis ist 0)</p><p><b>Vorzeichenlos:</b> 148 + 108 → 0: <span class=\"c-o\">falsch</span> – richtig wäre 256, angezeigt 0 = 256 − 256</p>",
     "fehler": [
      "Übertrag in der nächsten Spalte vergessen.",
      "CF = 1 übersehen, weil das 9. Bit nicht hingeschrieben wurde."
     ],
     "fix": true
    },
    {
     "id": "z8a4",
     "schwierigkeit": "pruefung",
     "angabe": "Blatt 2 · V/VI d): Addiere 1000 0000 (128) und 1100 1000 (200). Bestimme Zero-Flag und Carry-Flag und prüfe, ob das Ergebnis (vorzeichenlos) stimmt.",
     "hinweise": [
      "Stelle für Stelle von rechts, Übertrag immer mitnehmen.",
      "CF = Übertrag aus Bit 7; ZF = 1 nur wenn alle Bits 0.",
      "Ergebnis zurückrechnen und mit der Summe der Dezimalzahlen vergleichen."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Bit</th><th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th></tr><tr><th class=\"l\">a</th><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">b</th><td class=\"\">1</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">Übertrag von rechts</th><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">Rechnung</th><td class=\"\">1+1=10₂</td><td class=\"\">0+1=1</td><td class=\"\">0+0=0</td><td class=\"\">0+0=0</td><td class=\"\">0+1=1</td><td class=\"\">0+0=0</td><td class=\"\">0+0=0</td><td class=\"\">0+0=0</td></tr><tr><th class=\"l\">Ergebnisbit</th><td class=\"c-r\">0</td><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td></tr><tr><th class=\"l\">Übertrag nach links</th><td class=\"c-o\">1 = CF</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr></table></div><div class=\"bits\">  1000 0000   (128)\n+ 1100 1000   (200)\n  ─────────\n<span class=\"c-o\">1</span> <span class=\"c-r\">0100 1000</span></div><p><b>Flags:</b> CF = 1 (Übertrag aus Bit 7) · Übertrag in Bit 7 = 0 → OF = 0 ⊕ 1 = 1 · ZF = 0 (nicht alle Bits 0)</p><p><b>Vorzeichenlos:</b> 128 + 200 → 72: <span class=\"c-o\">falsch</span> – richtig wäre 328, angezeigt 72 = 328 − 256</p>",
     "fehler": [
      "Übertrag in der nächsten Spalte vergessen.",
      "CF = 1 übersehen, weil das 9. Bit nicht hingeschrieben wurde."
     ],
     "fix": true
    },
    {
     "id": "z8a5",
     "schwierigkeit": "schwer",
     "angabe": "Addiere 0101 0000 (80) und 0101 0001 (81). Bestimme CF und OF und entscheide, in welcher Interpretation das Ergebnis stimmt.",
     "hinweise": [
      "Beide Summanden sind positiv (MSB 0).",
      "Schau, ob ein Übertrag in Bit 7 hinein geht.",
      "Positiv + positiv darf nicht negativ werden."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Bit</th><th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th></tr><tr><th class=\"l\">a</th><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">b</th><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">1</td></tr><tr><th class=\"l\">Übertrag von rechts</th><td class=\"c-v\">1</td><td class=\"\">0</td><td class=\"c-v\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr><tr><th class=\"l\">Rechnung</th><td class=\"\">0+0+1=1</td><td class=\"\">1+1=10₂</td><td class=\"\">0+0+1=1</td><td class=\"\">1+1=10₂</td><td class=\"\">0+0=0</td><td class=\"\">0+0=0</td><td class=\"\">0+0=0</td><td class=\"\">0+1=1</td></tr><tr><th class=\"l\">Ergebnisbit</th><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td></tr><tr><th class=\"l\">Übertrag nach links</th><td class=\"\">0 = CF</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">1</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td><td class=\"\">0</td></tr></table></div><div class=\"bits\">  0101 0000   (80)\n+ 0101 0001   (81)\n  ─────────\n  <span class=\"c-r\">1010 0001</span></div><p><b>Flags:</b> CF = 0 (Übertrag aus Bit 7) · Übertrag in Bit 7 = 1 → OF = 1 ⊕ 0 = 1 · ZF = 0 (nicht alle Bits 0)</p><p><b>Vorzeichenlos:</b> 80 + 81 → 161: stimmt ✓</p><p><b>Zweierkomplement:</b> 80 + 81 → -95: <span class=\"c-o\">falsch</span> – richtig wäre 161</p>",
     "fehler": [
      "OF aus dem Carry abgelesen."
     ],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z9q1",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Die 4-Bit-Zweierkomplementzahl 1101 soll auf 8 Bit erweitert werden. Ergebnis?",
     "optionen": [
      "0000 1101",
      "1111 1101",
      "1000 0101",
      "1101 0000"
     ],
     "richtig": 1,
     "erklaerung": "MSB (1) in alle neuen Stellen kopieren. 0000 1101 wäre +13."
    },
    {
     "id": "z9q2",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Vorzeichen-Betrag 1101 (−5) auf 8 Bit erweitert:",
     "optionen": [
      "1111 1101",
      "1000 0101",
      "0000 1101",
      "1000 1101"
     ],
     "richtig": 1,
     "erklaerung": "Vorzeichen ins neue MSB, Betrag 101 vorne mit Nullen: 1 000 0101."
    },
    {
     "id": "z9q3",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie erweitert man eine vorzeichenlose Zahl?",
     "optionen": [
      "Vorne Nullen",
      "Vorne Einsen",
      "MSB kopieren",
      "Exzess addieren"
     ],
     "richtig": 0,
     "erklaerung": "Führende Nullen ändern den Wert nicht."
    },
    {
     "id": "z9q4",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Exzess-7 (4 Bit) soll auf Exzess-127 (8 Bit) erweitert werden. Was muss man zum Bitmuster addieren?",
     "optionen": [
      "7",
      "127",
      "120",
      "134"
     ],
     "richtig": 2,
     "erklaerung": "127 − 7 = 120 = 0111 1000."
    },
    {
     "id": "z9q5",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Beim Zweierkomplement füllt man beim Erweitern immer mit Nullen auf.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "Nur bei positiven Zahlen. Negative werden mit Einsen aufgefüllt (MSB kopieren)."
    },
    {
     "id": "z9q6",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Erweitere das 4-Bit-Zweierkomplement 1010 auf 8 Bit.",
     "antwort": "1111 1010",
     "akzeptiert": [
      "11111010",
      "1111 1010"
     ],
     "erklaerung": "1010 = −6. Mit MSB-Kopien: 1111 1010 = −128+64+32+16+8+2 = −6 ✓"
    }
   ],
   "aufgaben": [
    {
     "id": "z9a1",
     "schwierigkeit": "leicht",
     "angabe": "Erweitere das 4-Bit-Muster 0110 auf 8 Bit – einmal vorzeichenlos, einmal im Zweierkomplement. Warum ist das Ergebnis gleich?",
     "hinweise": [
      "MSB von 0110 ist 0.",
      "Positive Zweierkomplement-Zahlen verhalten sich wie vorzeichenlose.",
      "Kopiert man eine 0, sind das Nullen."
     ],
     "loesung": "<p>Beide Male <span class=\"mono res\">0000 0110</span> = 6. Das MSB ist 0, also bedeutet „MSB kopieren“ dasselbe wie „Nullen auffüllen“.</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "z9a2",
     "schwierigkeit": "mittel",
     "angabe": "Stelle −6 im 4-Bit-Zweierkomplement dar und erweitere auf 8 Bit. Mache die Probe.",
     "hinweise": [
      "6 = 0110 → invertieren, +1.",
      "MSB kopieren.",
      "Probe mit −128."
     ],
     "loesung": "<p>6 = 0110 → 1001 → +1 = <b>1010</b>. Erweitert: <span class=\"mono res\">1111 1010</span></p><div class=\"scroll\"><table class=\"t\"><tr><th class=\"l\">Wertigkeit</th><td class=\"c-o\">-128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr><tr><th class=\"l\">Bit</th><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"c-p\">1</td><td class=\"\">0</td><td class=\"c-p\">1</td><td class=\"\">0</td></tr></table></div><p class=\"mono\">1111 1010₂ = -128 + 64 + 32 + 16 + 8 + 2 = <span class=\"res\">-6</span></p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "z9a3",
     "schwierigkeit": "pruefung",
     "angabe": "Das 4-Bit-Muster 0011 ist in Exzess-7 gegeben. Welchen Wert hat es? Erweitere es auf Exzess-127 (8 Bit) und prüfe.",
     "hinweise": [
      "0011 = 3, minus 7.",
      "Addiere 127 − 7 = 120.",
      "Neues Muster vorzeichenlos minus 127."
     ],
     "loesung": "<p>0011 = 3 → 3 − 7 = <b>−4</b>. Erweitern: 0000 0011 + 0111 1000 = <span class=\"mono res\">0111 1011</span>. Probe: 123 − 127 = −4 ✓</p>",
     "fehler": [
      "Nur Nullen vorne ergänzt (ergäbe 3 − 127 = −124)."
     ],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z10q1",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Welchen Dezimalwert hat 101,11₂?",
     "antwort": "5,75",
     "akzeptiert": [
      "5,75",
      "5.75"
     ],
     "erklaerung": "4 + 1 + 0,5 + 0,25 = 5,75."
    },
    {
     "id": "z10q2",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Wie lautet 0,625 als Binärbruch?",
     "optionen": [
      "0,101",
      "0,011",
      "0,110",
      "0,1010 1010 …"
     ],
     "richtig": 0,
     "erklaerung": "0,625·2 = 1,25 → 1; 0,25·2 = 0,5 → 0; 0,5·2 = 1,0 → 1 → 0,101."
    },
    {
     "id": "z10q3",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Warum lässt sich 0,2 nicht exakt als Binär-Festkommazahl darstellen?",
     "optionen": [
      "Weil 0,2 negativ ist",
      "Weil die Nachkommabits periodisch werden (unendlich viele Stellen)",
      "Weil man dafür Exzess braucht",
      "Weil 0,2 > 2⁻¹"
     ],
     "richtig": 1,
     "erklaerung": "0,2 → 0,00110011… wiederholt sich endlos."
    },
    {
     "id": "z10q4",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welche Wertigkeit hat die 3. Stelle nach dem Komma?",
     "optionen": [
      "0,3",
      "0,25",
      "0,125",
      "0,0625"
     ],
     "richtig": 2,
     "erklaerung": "2⁻³ = 1/8 = 0,125."
    },
    {
     "id": "z10q5",
     "typ": "wahrfalsch",
     "niveau": "erinnern",
     "frage": "Beim Umrechnen des Nachkommateils werden die Bits von oben nach unten gelesen.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Das erste Bit ist das mit Wertigkeit 0,5 – direkt hinter dem Komma."
    }
   ],
   "aufgaben": [
    {
     "id": "z10a1",
     "schwierigkeit": "mittel",
     "angabe": "Rechne 14,6875 in eine Festkommazahl um (Skript-Beispiel).",
     "hinweise": [
      "14 mit Horner.",
      "0,6875 immer wieder mal 2.",
      "Bits von oben nach unten lesen."
     ],
     "loesung": "<p>14 → 1110. Nachkommateil:</p><div class=\"chain\"><div><span>0,6875 · 2 = 1,375</span><span class=\"op\">Bit 1</span></div><div><span>0,375 · 2 = 0,75</span><span class=\"op\">Bit 0</span></div><div><span>0,75 · 2 = 1,5</span><span class=\"op\">Bit 1</span></div><div><span>0,5 · 2 = 1</span><span class=\"op\">Bit 1 · Rest 0, fertig</span></div></div><p>→ 0,1011 · Ergebnis <span class=\"res mono\">1110,1011₂</span></p>",
     "fehler": [
      "Ganzzahligen Teil vergessen."
     ],
     "fix": false
    },
    {
     "id": "z10a2",
     "schwierigkeit": "leicht",
     "angabe": "Rechne 6,375 in eine Festkommazahl um.",
     "hinweise": [
      "6 = 110.",
      "0,375 · 2 = 0,75 → 0 …",
      "Drei Nachkommastellen reichen."
     ],
     "loesung": "<p>6 → 110. Nachkommateil:</p><div class=\"chain\"><div><span>0,375 · 2 = 0,75</span><span class=\"op\">Bit 0</span></div><div><span>0,75 · 2 = 1,5</span><span class=\"op\">Bit 1</span></div><div><span>0,5 · 2 = 1</span><span class=\"op\">Bit 1 · Rest 0, fertig</span></div></div><p>→ <span class=\"res mono\">110,011₂</span>. Probe: 4 + 2 + 0,25 + 0,125 = 6,375 ✓</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "z10a3",
     "schwierigkeit": "schwer",
     "angabe": "Berechne die ersten 6 Nachkommabits von 0,1 und erkläre, was das für die Genauigkeit bedeutet.",
     "hinweise": [
      "0,1 · 2 = 0,2 → Bit 0.",
      "Weiter mit 0,2, 0,4, 0,8 …",
      "Siehst du eine Wiederholung?"
     ],
     "loesung": "<div class=\"chain\"><div><span>0,1 · 2 = 0,2</span><span class=\"op\">Bit 0</span></div><div><span>0,2 · 2 = 0,4</span><span class=\"op\">Bit 0</span></div><div><span>0,4 · 2 = 0,8</span><span class=\"op\">Bit 0</span></div><div><span>0,8 · 2 = 1,6</span><span class=\"op\">Bit 1</span></div><div><span>0,6 · 2 = 1,2</span><span class=\"op\">Bit 1</span></div><div><span>0,2 · 2 = 0,4</span><span class=\"op\">Bit 0</span></div></div><p>→ 0,000110…₂. Ab 0,2 wiederholt sich das Muster 0011 endlos. Mit endlich vielen Bits muss gerundet werden → Rundungsfehler.</p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "z11q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie viele Byte sind 1 KiB?",
     "optionen": [
      "1000",
      "1024",
      "1048",
      "1000 · 1024"
     ],
     "richtig": 1,
     "erklaerung": "2¹⁰ = 1024."
    },
    {
     "id": "z11q2",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Wie viele Byte sind 1 MiB?",
     "antwort": "1048576",
     "akzeptiert": [
      "1048576",
      "1 048 576",
      "1.048.576"
     ],
     "erklaerung": "2²⁰ = 1 048 576."
    },
    {
     "id": "z11q3",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Wie groß ist die Abweichung zwischen 1 kB und 1 KiB?",
     "optionen": [
      "0,24 %",
      "2,4 %",
      "10 %",
      "24 %"
     ],
     "richtig": 1,
     "erklaerung": "24 Byte von 1000 → 2,4 %."
    },
    {
     "id": "z11q4",
     "typ": "wahrfalsch",
     "niveau": "erinnern",
     "frage": "Festplattenhersteller geben die Größe meist zur Basis 10 an.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Darum zeigt das Betriebssystem (Basis 2) weniger an."
    },
    {
     "id": "z11q5",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welches Symbol steht für 2³⁰?",
     "optionen": [
      "GB",
      "Gi",
      "Mi",
      "Ti"
     ],
     "richtig": 1,
     "erklaerung": "gibi = Gi = 2³⁰."
    }
   ],
   "aufgaben": [
    {
     "id": "z11a1",
     "schwierigkeit": "leicht",
     "angabe": "Ein Speicher hat 16 Ki Zellen zu je 8 Bit. Wie viele Byte sind das?",
     "hinweise": [
      "16 Ki = 16 · 1024.",
      "8 Bit = 1 Byte.",
      "Multiplizieren."
     ],
     "loesung": "<p>16 · 1024 = <span class=\"res\">16384</span> Byte = 16 KiB</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "z11a2",
     "schwierigkeit": "mittel",
     "angabe": "Eine Festplatte wird mit 500 GB verkauft. Wie viele GiB zeigt das Betriebssystem ungefähr an?",
     "hinweise": [
      "500 GB = 500 · 10⁹ Byte.",
      "1 GiB = 2³⁰ Byte = 1 073 741 824.",
      "Dividieren."
     ],
     "loesung": "<p>500 000 000 000 : 1 073 741 824 ≈ <span class=\"res\">465,66</span> GiB</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "z11a3",
     "schwierigkeit": "mittel",
     "angabe": "Wie viele Adressleitungen braucht ein Speicher mit 64 Ki Wörtern?",
     "hinweise": [
      "64 Ki = 64 · 1024 = 2⁶ · 2¹⁰.",
      "Für 2ⁿ Adressen braucht man n Leitungen.",
      "6 + 10."
     ],
     "loesung": "<p>64 Ki = 2⁶ · 2¹⁰ = 2¹⁶ → <span class=\"res\">16 Adressleitungen</span></p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s1q1",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Was unterscheidet ein Schaltwerk von einem Schaltnetz?",
     "optionen": [
      "Es hat mehr Gatter.",
      "Es hat Rückkopplungen und kann Zustände speichern.",
      "Es hat keine Eingänge.",
      "Es arbeitet nur mit NAND."
     ],
     "richtig": 1,
     "erklaerung": "Durch Rückkopplung hängt der Ausgang auch von früheren Eingaben ab."
    },
    {
     "id": "s1q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "RS-Flip-Flop (NOR, 1-aktiv): S = 1, R = 0. Was passiert?",
     "optionen": [
      "Q = 0",
      "Q = 1",
      "Q bleibt",
      "verboten"
     ],
     "richtig": 1,
     "erklaerung": "Setzen."
    },
    {
     "id": "s1q3",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Was passiert beim NOR-RS-Flip-Flop bei S = R = 1?",
     "optionen": [
      "Q kippt",
      "Q = Q̄ = 0 – verbotener Zustand",
      "Q = Q̄ = 1",
      "Q bleibt gleich"
     ],
     "richtig": 1,
     "erklaerung": "Beide NOR-Gatter haben eine 1 am Eingang → beide Ausgänge 0. Problematisch beim Zurückgehen auf 00."
    },
    {
     "id": "s1q4",
     "typ": "wahrfalsch",
     "niveau": "erinnern",
     "frage": "Ein RS-Flip-Flop aus NAND-Gattern hat 0-aktive Eingänge.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Abbildung 4-2: Gesetzt wird mit einer 0 an S̄."
    },
    {
     "id": "s1q5",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wofür wird ein RS-Flip-Flop laut Skript eingesetzt?",
     "optionen": [
      "Zum Addieren",
      "Zum Entprellen eines Schalters",
      "Als Taktgenerator",
      "Als Zähler"
     ],
     "richtig": 1,
     "erklaerung": "Es schaltet bei der ersten Kontaktberührung und ignoriert das Nachfedern."
    },
    {
     "id": "s1q6",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "RS-Flip-Flop: S = 0, R = 0. Was passiert?",
     "optionen": [
      "Q = 0",
      "Q = 1",
      "Q behält den alten Wert",
      "Q schwingt"
     ],
     "richtig": 2,
     "erklaerung": "Speichern – das ist die eigentliche 1-Bit-Speicherfunktion."
    }
   ],
   "aufgaben": [
    {
     "id": "s1a1",
     "schwierigkeit": "leicht",
     "angabe": "Ein NOR-RS-Flip-Flop startet mit Q = 0. Nacheinander liegen an: (S, R) = (1, 0), (0, 0), (0, 1), (0, 0), (1, 0). Gib Q nach jedem Schritt an.",
     "hinweise": [
      "(1, 0) setzt.",
      "(0, 0) speichert.",
      "(0, 1) löscht."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th>Schritt</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>S R</th><td>1 0</td><td>0 0</td><td>0 1</td><td>0 0</td><td>1 0</td></tr><tr><th>Q</th><td class=\"c-r\">1</td><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td></tr></table></div>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s1a2",
     "schwierigkeit": "mittel",
     "angabe": "Erkläre mit den beiden NOR-Gattern, warum S = 1 den Ausgang Q auf 1 setzt.",
     "hinweise": [
      "Ein NOR liefert 0, sobald ein Eingang 1 ist.",
      "S geht an das Gatter, das Q̄ erzeugt.",
      "Dann sind beide Eingänge des Q-Gatters 0."
     ],
     "loesung": "<p>S = 1 → das untere NOR liefert Q̄ = 0. Das obere NOR bekommt R = 0 und Q̄ = 0 → Q = NOT(0 ∨ 0) = 1. Q geht zurück ans untere Gatter und hält Q̄ = 0 – auch wenn S wieder 0 wird.</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s1a3",
     "schwierigkeit": "pruefung",
     "angabe": "Warum ist S = R = 1 beim RS-Flip-Flop „verboten“? Beschreibe, was beim Übergang zurück auf S = R = 0 passiert.",
     "hinweise": [
      "Was liefern beide NOR bei S = R = 1?",
      "Was passiert, wenn danach beide Eingänge 0 sind?",
      "Die Ausgänge sind rückgekoppelt."
     ],
     "loesung": "<p>Bei S = R = 1 sind Q = Q̄ = 0 (nicht mehr komplementär). Gehen beide auf 0, liegt an allen Eingängen 0 → beide Ausgänge werden 1 → das koppelt zurück → beide 0 … Das Flip-Flop kann schwingen, bis Laufzeitunterschiede einen Zustand erzwingen. Ergebnis: unvorhersehbar.</p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s2q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie verhält sich ein D-Latch, solange C = 1 ist?",
     "optionen": [
      "Q hält den alten Wert",
      "Q folgt direkt D (transparent)",
      "Q kippt bei jeder Änderung",
      "Q = 0"
     ],
     "richtig": 1,
     "erklaerung": "In der transparenten Phase wird jede Änderung von D durchgereicht."
    },
    {
     "id": "s2q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wann übernimmt ein (positiv) flankengesteuertes D-Flip-Flop den Wert von D?",
     "optionen": [
      "Solange C = 1",
      "Nur bei der steigenden Flanke von C",
      "Solange C = 0",
      "Bei jeder Änderung von D"
     ],
     "richtig": 1,
     "erklaerung": "Nur im Moment 0 → 1."
    },
    {
     "id": "s2q3",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Ein Master-Slave-Flip-Flop kann transparent sein.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "Immer nur einer der beiden Latches ist transparent, also nie der ganze Weg."
    },
    {
     "id": "s2q4",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was bedeutet das kleine Dreieck am Takteingang im Schaltsymbol?",
     "optionen": [
      "Negation",
      "Flankensteuerung",
      "Tristate-Ausgang",
      "Schmitt-Trigger"
     ],
     "richtig": 1,
     "erklaerung": "Dreieck = flankengesteuert; ein zusätzlicher Ring = negative Flanke."
    },
    {
     "id": "s2q5",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "D macht einen kurzen Impuls, während C = 0 ist. Wer „sieht“ diesen Impuls?",
     "optionen": [
      "Nur das Latch",
      "Nur das Flip-Flop",
      "Beide",
      "Keiner von beiden"
     ],
     "richtig": 3,
     "erklaerung": "Bei C = 0 ist das Latch gesperrt, und eine Flanke gibt es auch nicht."
    },
    {
     "id": "s2q6",
     "typ": "mc",
     "niveau": "analysieren",
     "frage": "D ändert sich, während C = 1 ist (nach der steigenden Flanke). Was passiert?",
     "optionen": [
      "Latch und Flip-Flop folgen",
      "Nur das Latch folgt",
      "Nur das Flip-Flop folgt",
      "Keiner folgt"
     ],
     "richtig": 1,
     "erklaerung": "Das Latch ist transparent, das Flip-Flop hat seinen Wert schon bei der Flanke übernommen."
    },
    {
     "id": "s2q7",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Ein Ring vor dem Takteingang eines D-Flip-Flops bedeutet …",
     "optionen": [
      "es schaltet bei der negativen Flanke",
      "es ist ein Latch",
      "es hat 0-aktive Daten",
      "es ist asynchron"
     ],
     "richtig": 0,
     "erklaerung": "Negationsring → fallende Flanke (1 → 0)."
    }
   ],
   "aufgaben": [
    {
     "id": "s2a1",
     "schwierigkeit": "pruefung",
     "angabe": "Ü4 · 2: Gegeben ist ein zeitlicher Verlauf von D und C. Gib den Ausgang Q eines D-Latches und eines D-Flip-Flops an.",
     "hinweise": [
      "Markiere zuerst alle Bereiche mit C = 1 (Latch).",
      "Zeichne dann an jeder steigenden Flanke eine Hilfslinie (FF).",
      "Vor dem ersten C = 1 bzw. der ersten Flanke ist Q unbekannt → schraffieren."
     ],
     "loesung": "<p>Für diese Aufgabe braucht man nur die zwei Regeln aus <b>B3</b>. Hier ein eigenes Beispiel mit beiden Bausteinen am selben Signal. Die gestrichelten Linien markieren die steigenden Flanken von C.</p>\n<figure><svg id=\"wave\" viewBox=\"0 0 660 300\" width=\"660\" role=\"img\" aria-label=\"Zeitdiagramm D, C, Q Latch und Q Flip-Flop\"></svg>\n<figcaption>Schraffiert = Q ist unbekannt (vor dem ersten C = 1 bzw. vor der ersten steigenden Flanke).</figcaption></figure>\n<div class=\"step\"><h4 data-n=\"1\">Latch zeichnen</h4><p>Markiere alle Bereiche mit <span class=\"c-p\">C = 1</span>. Dort kopierst du D <b>eins zu eins</b> nach Q, mit jeder Änderung. Fällt C auf 0, frierst du den letzten Wert ein und zeichnest eine waagrechte Linie bis zum nächsten C = 1.</p></div>\n<div class=\"step\"><h4 data-n=\"2\">Flip-Flop zeichnen</h4><p>Zeichne bei jeder <span class=\"c-v\">steigenden Flanke</span> von C eine senkrechte Hilfslinie. Lies dort ab, welchen Wert D gerade hat. Diesen Wert hält Q bis zur nächsten steigenden Flanke.</p></div>\n<div class=\"warn\"><b>Typischer Fehler:</b> Ein kurzer D-Impuls zwischen zwei Flanken taucht beim Flip-Flop <b>nie</b> auf. Ändert sich D während C = 1, macht das Latch die Änderung mit, das Flip-Flop nicht. In der Übung hat das Flip-Flop deshalb viel weniger Wechsel als das Latch. Am Anfang ist Q bei beiden unbekannt, also schraffieren!</div>",
     "fehler": [
      "Flip-Flop folgt D während C = 1 (falsch!).",
      "Unbekannten Anfangsbereich vergessen."
     ],
     "fix": true
    },
    {
     "id": "s2a2",
     "schwierigkeit": "mittel",
     "angabe": "Gegeben als Tabelle (je Zeitschritt t): C und D. Bestimme Q für Latch und D-Flip-Flop. C = 0 1 1 0 0 1 1 0 0 1, D = 1 1 0 0 1 1 1 1 0 0.",
     "hinweise": [
      "Latch: Q = D bei C = 1, sonst halten.",
      "FF: nur bei C 0 → 1 übernehmen (t = 1, 5, 9).",
      "? = unbekannt."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th>t</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr><tr><th>C</th><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><th>D</th><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr><tr><th>Q Latch</th><td class=\"c-g\">?</td><td class=\"c-g\">1</td><td class=\"c-g\">0</td><td class=\"c-g\">0</td><td class=\"c-g\">0</td><td class=\"c-g\">1</td><td class=\"c-g\">1</td><td class=\"c-g\">1</td><td class=\"c-g\">1</td><td class=\"c-g\">0</td></tr><tr><th>Q D-FF</th><td class=\"c-v\">?</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">1</td><td class=\"c-v\">0</td></tr></table></div><p>Bei t = 2 ändert sich D auf 0, während C = 1: Das Latch folgt (0), das Flip-Flop bleibt bei 1.</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s2a3",
     "schwierigkeit": "mittel",
     "angabe": "Erkläre das Master-Slave-Prinzip in zwei Sätzen.",
     "hinweise": [
      "Zwei Latches hintereinander.",
      "Master transparent bei C = 0, Slave bei C = 1.",
      "Was passiert beim Wechsel 0 → 1?"
     ],
     "loesung": "<p>Bei C = 0 ist der Master transparent und nimmt D auf, der Slave hält. Bei der steigenden Flanke schließt der Master (speichert D) und der Slave übernimmt diesen Wert an den Ausgang – so wird nur der Wert im Flankenmoment übernommen.</p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s3q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "JK-Flip-Flop mit J = 1, K = 1. Was passiert bei der Taktflanke?",
     "optionen": [
      "Q = 1",
      "Q = 0",
      "Q bleibt",
      "Q kippt (toggle)"
     ],
     "richtig": 3,
     "erklaerung": "11 = toggle."
    },
    {
     "id": "s3q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "J = 0, K = 1:",
     "optionen": [
      "Q = 0",
      "Q = 1",
      "Q bleibt",
      "Q kippt"
     ],
     "richtig": 0,
     "erklaerung": "Rücksetzen."
    },
    {
     "id": "s3q3",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welche Logik vor einem D-Flip-Flop ergibt ein JK-Flip-Flop?",
     "optionen": [
      "D = J & K",
      "D = (J & Q̄) ∨ (K̄ & Q)",
      "D = J ⊕ K",
      "D = (J & Q) ∨ (K & Q̄)"
     ],
     "richtig": 1,
     "erklaerung": "Bei Q = 0 entscheidet J, bei Q = 1 bleibt Q, solange K = 0 (Ü4 Lösung)."
    },
    {
     "id": "s3q4",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Q = 1, J = 1, K = 1. Welchen Wert hat Q nach der Taktflanke?",
     "antwort": "0",
     "akzeptiert": [
      "0"
     ],
     "erklaerung": "Toggle: 1 → 0."
    },
    {
     "id": "s3q5",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welche Vorbereitung braucht ein JK-Flip-Flop für den Übergang 0 → 1?",
     "optionen": [
      "J = 1, K = X",
      "J = X, K = 1",
      "J = 0, K = X",
      "J = X, K = 0"
     ],
     "richtig": 0,
     "erklaerung": "Setzen (10) oder kippen (11) – K ist egal."
    },
    {
     "id": "s3q6",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Ein JK-Flip-Flop mit J = K = 1 halbiert die Frequenz des Taktes am Ausgang.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Es kippt bei jeder Flanke → zwei Takte pro Ausgangsperiode."
    }
   ],
   "aufgaben": [
    {
     "id": "s3a1",
     "schwierigkeit": "pruefung",
     "angabe": "Ü4 · 1: Realisiere ein JK-Flip-Flop mit einem D-Flip-Flop. Bilde D durch eine logische Funktion aus J, K und Q.",
     "hinweise": [
      "D muss den neuen Zustand enthalten.",
      "Stelle eine Tabelle mit J, K, Q → Q_neu auf.",
      "Getrennt nach Q = 0 und Q = 1 vereinfachen."
     ],
     "loesung": "<div class=\"q3\">\n<span><b>Was wollen wir?</b> Ein Flip-Flop, das sich wie ein JK verhält, obwohl nur ein D-Flip-Flop da ist.</span>\n<span><b>Werkzeug:</b> Ein D-Flip-Flop übernimmt bei der Flanke einfach D. Wir müssen also eine Logik vor D bauen, die schon den <b>neuen Zustand</b> berechnet, den ein JK-Flip-Flop hätte.</span>\n<span><b>Wie genau?</b> Die Eingänge der Logik sind J, K und der aktuelle Ausgang Q (rückgekoppelt). Wahrheitstabelle aufstellen, dann vereinfachen.</span>\n</div>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th>J</th><th>K</th><th>Q</th><th class=\"l\">JK-Regel</th><th>D = Q<sub>neu</sub></th></tr>\n<tr><td>0</td><td>0</td><td class=\"c-g\">0</td><td class=\"l\">bleibt</td><td>0</td></tr>\n<tr><td>1</td><td>0</td><td class=\"c-g\">0</td><td class=\"l\">setzen</td><td class=\"c-p\">1</td></tr>\n<tr><td>0</td><td>1</td><td class=\"c-g\">0</td><td class=\"l\">rücksetzen</td><td>0</td></tr>\n<tr><td>1</td><td>1</td><td class=\"c-g\">0</td><td class=\"l\">kippen: aus 0 wird 1</td><td class=\"c-p\">1</td></tr>\n<tr><td>0</td><td>0</td><td class=\"c-o\">1</td><td class=\"l\">bleibt</td><td class=\"c-p\">1</td></tr>\n<tr><td>1</td><td>0</td><td class=\"c-o\">1</td><td class=\"l\">setzen</td><td class=\"c-p\">1</td></tr>\n<tr><td>0</td><td>1</td><td class=\"c-o\">1</td><td class=\"l\">rücksetzen</td><td>0</td></tr>\n<tr><td>1</td><td>1</td><td class=\"c-o\">1</td><td class=\"l\">kippen: aus 1 wird 0</td><td>0</td></tr>\n</table></div>\n<p>Vereinfachen, getrennt nach Q:</p>\n<ul>\n<li><span class=\"c-g\">Q = 0</span> (obere Hälfte): D = 1 genau in den Zeilen mit J = 1. Daraus wird der Term <b>J &amp; Q̄</b>.</li>\n<li><span class=\"c-o\">Q = 1</span> (untere Hälfte): D = 1 genau in den Zeilen mit K = 0. Daraus wird der Term <b>K̄ &amp; Q</b>.</li>\n</ul>\n<p><span class=\"res mono\">D = (J &amp; Q̄) ∨ (K̄ &amp; Q)</span></p>\n<p><b>Probe:</b></p>\n<ul>\n<li>J = 1, K = 1, Q = 1: D = (1 &amp; 0) ∨ (0 &amp; 1) = 0 ✓ (kippen auf 0)</li>\n<li>J = 0, K = 0, Q = 1: D = (0 &amp; 0) ∨ (1 &amp; 1) = 1 ✓ (bleibt)</li>\n</ul>\n<div class=\"why\"><b>So kann man es sich merken</b>„Wenn Q aus ist, schaltet J es ein. Wenn Q an ist, bleibt es an, solange K nicht drückt.“</div>",
     "fehler": [
      "Q vergessen als Eingang zu berücksichtigen."
     ],
     "fix": true
    },
    {
     "id": "s3a2",
     "schwierigkeit": "leicht",
     "angabe": "Ein JK-Flip-Flop startet mit Q = 0. Bei den Flanken liegen an: (J, K) = (1,0), (1,1), (1,1), (0,0), (0,1), (1,1). Gib Q nach jeder Flanke an.",
     "hinweise": [
      "10 setzt, 01 löscht.",
      "11 kippt.",
      "00 hält."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th>Flanke</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><th>J K</th><td>1 0</td><td>1 1</td><td>1 1</td><td>0 0</td><td>0 1</td><td>1 1</td></tr><tr><th>Q</th><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td><td class=\"c-r\">1</td><td class=\"c-r\">0</td><td class=\"c-r\">1</td></tr></table></div>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s3a3",
     "schwierigkeit": "mittel",
     "angabe": "Wie baut man aus einem JK-Flip-Flop ein Flip-Flop, das bei T = 1 kippt und bei T = 0 hält (T-Flip-Flop)?",
     "hinweise": [
      "Welche JK-Kombinationen halten bzw. kippen?",
      "00 = halten, 11 = kippen.",
      "J und K zusammenschalten."
     ],
     "loesung": "<p>J = K = T. Bei T = 0 → JK = 00 → halten; bei T = 1 → JK = 11 → kippen. (Skript S. 93: „J und K zusammengeschaltet“.)</p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s4q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was ist die Setup-Zeit?",
     "optionen": [
      "Zeit, die D nach der Flanke stabil bleiben muss",
      "Zeit, die D vor der Flanke stabil anliegen muss",
      "Verzögerung von Flanke bis Ausgang",
      "Dauer eines Taktimpulses"
     ],
     "richtig": 1,
     "erklaerung": "Setup = vorher, Hold = nachher."
    },
    {
     "id": "s4q2",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was ist die Hold-Zeit?",
     "optionen": [
      "Zeit, die D nach der Flanke stabil bleiben muss",
      "Zeit vor der Flanke",
      "maximale Taktfrequenz",
      "Zeit bis zum Refresh"
     ],
     "richtig": 0,
     "erklaerung": "Der Eingang muss auch kurz nach der Flanke noch halten."
    },
    {
     "id": "s4q3",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welcher Taktgenerator liefert die genaueste Frequenz?",
     "optionen": [
      "RC-Glied mit Schmitt-Trigger",
      "Inverter mit Verzögerungsglied",
      "Schwingquarz",
      "RS-Flip-Flop"
     ],
     "richtig": 2,
     "erklaerung": "Quarz: mechanische Resonanz über den Piezoeffekt."
    },
    {
     "id": "s4q4",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Ein Inverter wird über ein Verzögerungsglied (t₀) rückgekoppelt. Wie lang ist die Taktperiode?",
     "optionen": [
      "t₀",
      "2 · t₀",
      "t₀ / 2",
      "4 · t₀"
     ],
     "richtig": 1,
     "erklaerung": "Nach t₀ kippt der Ausgang auf 1, nach weiteren t₀ wieder auf 0."
    },
    {
     "id": "s4q5",
     "typ": "wahrfalsch",
     "niveau": "erinnern",
     "frage": "Ein Schmitt-Trigger hat unterschiedliche Ein- und Ausschaltschwellen.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Darum kann er die langsam steigende Kondensatorspannung sauber in ein Digitalsignal umwandeln."
    }
   ],
   "aufgaben": [
    {
     "id": "s4a1",
     "schwierigkeit": "leicht",
     "angabe": "Ein rückgekoppelter Inverter hat eine Verzögerung von 50 ns. Welche Taktfrequenz entsteht?",
     "hinweise": [
      "Periode = doppelte Verzögerung.",
      "f = 1 / T.",
      "1 / 100 ns."
     ],
     "loesung": "<p>T = 2 · 50 ns = 100 ns → f = 1 / 100 ns = <span class=\"res\">10 MHz</span></p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s4a2",
     "schwierigkeit": "mittel",
     "angabe": "Ein D-Flip-Flop hat eine Setup-Zeit von 20 ns. D ändert sich 10 ns vor der Taktflanke. Was ist das Problem?",
     "hinweise": [
      "Wie lange vorher muss D stabil sein?",
      "10 < 20.",
      "Was kann bei Verletzung passieren?"
     ],
     "loesung": "<p>D liegt nur 10 ns vor der Flanke stabil an, gefordert sind 20 ns → Setup-Zeit verletzt → Fehlfunktion möglich (der neue Wert wird evtl. nicht oder falsch übernommen).</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s4a3",
     "schwierigkeit": "mittel",
     "angabe": "Nenne die fünf Zeitangaben eines Flip-Flops aus dem Skript und die Werte des 74LS74.",
     "hinweise": [
      "Zwei Zeiten rund um die Flanke.",
      "Eine Frequenz, eine Impulsdauer.",
      "Eine Verzögerung."
     ],
     "loesung": "<p>Setup time 20 ns · Hold time 5 ns · max. Taktfrequenz 33 MHz · min. Taktimpulsdauer 25 ns · Propagation delay 20 ns</p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s5q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was passiert in einem Schieberegister bei jedem Takt?",
     "optionen": [
      "Alle Bits werden gelöscht",
      "Jedes Bit wandert eine Stelle weiter",
      "Alle Bits werden parallel neu geladen",
      "Das Register zählt hoch"
     ],
     "richtig": 1,
     "erklaerung": "Vorne kommt ein neues Bit hinein, das letzte geht verloren."
    },
    {
     "id": "s5q2",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Warum funktioniert ein Schieberegister aus D-Flip-Flops überhaupt?",
     "optionen": [
      "Weil die Flip-Flops ihren neuen Wert erst nach einer Verzögerung ausgeben",
      "Weil es Latches sind",
      "Weil alle FF unterschiedliche Takte haben",
      "Weil D = Q̄ ist"
     ],
     "richtig": 0,
     "erklaerung": "Sonst würde sich der D-Eingang des nächsten FF schon während der Flanke ändern."
    },
    {
     "id": "s5q3",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was macht ein Parallelregister?",
     "optionen": [
      "Es schiebt Bits",
      "Es übernimmt bei jedem Takt alle Eingangsbits gleichzeitig",
      "Es zählt",
      "Es teilt die Frequenz"
     ],
     "richtig": 1,
     "erklaerung": "Abbildung 4-17."
    },
    {
     "id": "s5q4",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "4-Bit-Schieberegister (FF1 FF2 FF3 FF4) enthält 1011, am Eingang liegt 0. Was steht nach einem Takt drin?",
     "antwort": "0101",
     "akzeptiert": [
      "0101"
     ],
     "erklaerung": "Neuer Wert 0 in FF1, alles rückt nach rechts, die letzte 1 fällt raus: 0 101."
    },
    {
     "id": "s5q5",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Wofür nutzt man die Kombination aus Parallel- und Schieberegister (P/S̄)?",
     "optionen": [
      "Frequenzteilung",
      "Parallel-Serien-Umsetzung",
      "Addition",
      "Refresh von DRAM"
     ],
     "richtig": 1,
     "erklaerung": "Parallel laden, dann seriell hinausschieben (oder umgekehrt)."
    }
   ],
   "aufgaben": [
    {
     "id": "s5a1",
     "schwierigkeit": "leicht",
     "angabe": "Ein 4-Bit-Schieberegister startet mit 0000. Am Eingang liegen bei drei Takten nacheinander 1, 1, 0. Gib den Inhalt (FF1…FF4) nach jedem Takt an.",
     "hinweise": [
      "Der Eingang geht in FF1.",
      "Alle anderen übernehmen den Wert ihres linken Nachbarn.",
      "Der Wert von FF4 geht verloren."
     ],
     "loesung": "<p>Takt 1: <b>1000</b> · Takt 2: <b>1100</b> · Takt 3: <b>0110</b></p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s5a2",
     "schwierigkeit": "mittel",
     "angabe": "Wie wird aus einem Schieberegister eines, das wahlweise links oder rechts schiebt?",
     "hinweise": [
      "Jeder D-Eingang braucht zwei mögliche Quellen.",
      "Welcher Baustein wählt zwischen zwei Signalen?",
      "2-zu-1-Multiplexer mit Steuersignal R/L̄."
     ],
     "loesung": "<p>Vor jeden D-Eingang einen 2-zu-1-Multiplexer: Bei R/L̄ = 1 kommt der linke Nachbar (Rechtsschieben), bei 0 der rechte Nachbar (Linksschieben).</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s5a3",
     "schwierigkeit": "mittel",
     "angabe": "Ein Byte soll über eine einzige Leitung übertragen werden. Beschreibe den Ablauf mit dem P/S̄-Register.",
     "hinweise": [
      "Zuerst parallel laden.",
      "Dann umschalten.",
      "Pro Takt ein Bit hinaus."
     ],
     "loesung": "<p>P/S̄ = 1: Das Byte wird bei einem Takt parallel übernommen. Dann P/S̄ = 0: Bei jedem der nächsten 8 Takte wird ein Bit hinausgeschoben (Parallel-Serien-Umsetzung).</p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s6q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie speichert ein DRAM ein Bit?",
     "optionen": [
      "In einem Flip-Flop",
      "Als Ladung in einem Kondensator",
      "Durch durchgebrannte Verbindungen",
      "Magnetisch"
     ],
     "richtig": 1,
     "erklaerung": "Geladener Kondensator = 1."
    },
    {
     "id": "s6q2",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Welcher Speicher muss regelmäßig aufgefrischt werden?",
     "optionen": [
      "SRAM",
      "DRAM",
      "EPROM",
      "Flash"
     ],
     "richtig": 1,
     "erklaerung": "Die Ladung geht langsam verloren → Refresh etwa alle paar ms."
    },
    {
     "id": "s6q3",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie wird ein EPROM gelöscht?",
     "optionen": [
      "Elektrisch",
      "Mit UV-Licht durch ein Fenster",
      "Gar nicht",
      "Durch Refresh"
     ],
     "richtig": 1,
     "erklaerung": "EEPROM und Flash werden elektrisch gelöscht."
    },
    {
     "id": "s6q4",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welche Speicher sind flüchtig (Inhalt weg ohne Strom)?",
     "optionen": [
      "ROM und PROM",
      "SRAM und DRAM",
      "EEPROM und Flash",
      "Alle"
     ],
     "richtig": 1,
     "erklaerung": "RAM ist flüchtig, alle ROM-Arten nicht."
    },
    {
     "id": "s6q5",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Wie viele Adressleitungen braucht ein 2 Ki × 8 Bit Speicher?",
     "antwort": "11",
     "akzeptiert": [
      "11"
     ],
     "erklaerung": "2 Ki = 2¹ · 2¹⁰ = 2¹¹ Wörter → 11 Leitungen (A0–A10)."
    },
    {
     "id": "s6q6",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was ist ein NV-RAM?",
     "optionen": [
      "RAM ohne Refresh",
      "Pro Bit eine RAM- und eine EEPROM-Zelle",
      "ROM mit Batterie",
      "DRAM mit Flip-Flops"
     ],
     "richtig": 1,
     "erklaerung": "Beim Abschalten RAM → EEPROM, beim Einschalten zurück."
    },
    {
     "id": "s6q7",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "SRAM hat eine höhere Integrationsdichte als DRAM.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "Umgekehrt: DRAM-Zellen sind kleiner (Kondensator + 1 Transistor)."
    },
    {
     "id": "s6q8",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Ein 16 Ki × 1 Bit Speicher ist quadratisch aufgebaut. Wie viele Zeilen hat die Matrix?",
     "optionen": [
      "64",
      "128",
      "256",
      "16 384"
     ],
     "richtig": 1,
     "erklaerung": "16 384 = 128 · 128 → 7 Adressbits für die Zeile, 7 für die Spalte."
    }
   ],
   "aufgaben": [
    {
     "id": "s6a1",
     "schwierigkeit": "mittel",
     "angabe": "Ein Speicher ist als 8 Ki × 8 Bit organisiert. Wie viele Adressleitungen, Datenleitungen und Byte hat er?",
     "hinweise": [
      "8 Ki = 2³ · 2¹⁰.",
      "Datenleitungen = Wortbreite.",
      "Byte = Wörter × 1."
     ],
     "loesung": "<p>8 Ki = 2¹³ → <b>13 Adressleitungen</b> · Wortbreite 8 → <b>8 Datenleitungen</b> · 8192 Wörter à 1 Byte = <b>8192 Byte</b> = 8 KiB</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s6a2",
     "schwierigkeit": "leicht",
     "angabe": "Vergleiche SRAM und DRAM in einer Tabelle (Speicherprinzip, Refresh, Geschwindigkeit, Dichte).",
     "hinweise": [
      "Flip-Flop vs. Kondensator.",
      "Wer verliert Ladung?",
      "Wer braucht weniger Platz?"
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th></th><th>SRAM</th><th>DRAM</th></tr><tr><td>Prinzip</td><td>Flip-Flop</td><td>Kondensator</td></tr><tr><td>Refresh</td><td>nein</td><td>ja, ca. alle ms</td></tr><tr><td>Geschwindigkeit</td><td>schneller</td><td>langsamer</td></tr><tr><td>Dichte</td><td>gering</td><td>hoch</td></tr></table></div>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s6a3",
     "schwierigkeit": "pruefung",
     "angabe": "Ein 64 Ki × 1 Bit Speicher soll quadratisch aufgebaut werden. Wie viele Zeilen und Spalten? Wie viele Adressbits je Richtung?",
     "hinweise": [
      "64 Ki = 2¹⁶.",
      "Quadratisch: halbe Bits für Zeile, halbe für Spalte.",
      "2⁸ = 256."
     ],
     "loesung": "<p>2¹⁶ Zellen → 8 Bit Zeilenadresse, 8 Bit Spaltenadresse → <b>256 × 256</b></p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s7q1",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was kennzeichnet einen synchronen Zähler?",
     "optionen": [
      "Alle Flip-Flops bekommen denselben Takt",
      "Jedes FF taktet das nächste",
      "Er hat keine Flip-Flops",
      "Er zählt nur rückwärts"
     ],
     "richtig": 0,
     "erklaerung": "Darum ändern sich alle Ausgänge gleichzeitig."
    },
    {
     "id": "s7q2",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Was ist der Nachteil eines asynchronen Zählers?",
     "optionen": [
      "Er ist komplizierter gebaut",
      "Kurzzeitig falsche Zwischenzustände",
      "Er kann nicht als Frequenzteiler dienen",
      "Er braucht mehr Flip-Flops"
     ],
     "richtig": 1,
     "erklaerung": "Die Stufen kippen nacheinander."
    },
    {
     "id": "s7q3",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Welche Zwischenzustände durchläuft ein asynchroner 4-Bit-Dualzähler beim Übergang von 7 nach 8?",
     "optionen": [
      "6, 4, 0",
      "8, 9",
      "3, 1",
      "keine"
     ],
     "richtig": 0,
     "erklaerung": "0111 → 0110 (6) → 0100 (4) → 0000 (0) → 1000 (8)."
    },
    {
     "id": "s7q4",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welchen Code verwendet ein Ringzähler?",
     "optionen": [
      "Dualcode",
      "BCD",
      "1-aus-n-Code",
      "Gray-Code"
     ],
     "richtig": 2,
     "erklaerung": "Genau eine 1 läuft um."
    },
    {
     "id": "s7q5",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Wann kippt beim synchronen Dualzähler (vorwärts) eine Stelle?",
     "optionen": [
      "Wenn die Stelle davor 0 ist",
      "Wenn alle vorherigen Stellen 1 sind",
      "Bei jedem Takt",
      "Wenn das MSB 1 ist"
     ],
     "richtig": 1,
     "erklaerung": "Genau wie beim Weiterzählen von 0111 auf 1000."
    },
    {
     "id": "s7q6",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Wie viele Flip-Flops braucht ein Zähler von 0 bis 9 mindestens?",
     "antwort": "4",
     "akzeptiert": [
      "4"
     ],
     "erklaerung": "10 Zustände, 2³ = 8 reicht nicht, 2⁴ = 16 → 4."
    },
    {
     "id": "s7q7",
     "typ": "wahrfalsch",
     "niveau": "erinnern",
     "frage": "Asynchrone Zähler werden häufig zur Frequenzteilung verwendet.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 0,
     "erklaerung": "Skript S. 86."
    },
    {
     "id": "s7q8",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wann ist der Erweiterungsausgang EWA eines synchronen 4-Bit-Zählers 1?",
     "optionen": [
      "Immer bei EWE = 1",
      "Wenn der Zählerstand 15 ist und EWE = 1",
      "Wenn der Zählerstand 0 ist",
      "Bei jedem Takt"
     ],
     "richtig": 1,
     "erklaerung": "Erst dann soll der nächste Baustein weiterzählen."
    }
   ],
   "aufgaben": [
    {
     "id": "s7a1",
     "schwierigkeit": "mittel",
     "angabe": "Ein asynchroner 3-Bit-Zähler (Q₂Q₁Q₀) geht von 3 auf 4. Welche Zwischenzustände entstehen?",
     "hinweise": [
      "3 = 011.",
      "Zuerst kippt Q₀ (1 → 0).",
      "Jede Stufe, die von 1 auf 0 springt, löst die nächste aus."
     ],
     "loesung": "<p>011 (3) → Q₀ kippt: <b>010 (2)</b> → Q₁ kippt: <b>000 (0)</b> → Q₂ kippt: 100 (4). Falsche Zwischenzustände: <span class=\"res\">2 und 0</span></p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s7a2",
     "schwierigkeit": "leicht",
     "angabe": "Ein 4-Bit-Ringzähler wird auf 1000 zurückgesetzt. Gib die nächsten vier Zustände an.",
     "hinweise": [
      "Eine 1 läuft um.",
      "Das letzte FF speist das erste.",
      "Nach 4 Takten ist man wieder am Anfang."
     ],
     "loesung": "<p>0100 → 0010 → 0001 → 1000</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s7a3",
     "schwierigkeit": "mittel",
     "angabe": "Ein asynchroner 4-Bit-Zähler bekommt einen Takt von 16 MHz. Welche Frequenz hat das MSB?",
     "hinweise": [
      "Jede Stufe halbiert.",
      "16 : 2 : 2 : 2 : 2.",
      "2⁴ = 16."
     ],
     "loesung": "<p>16 MHz : 2⁴ = <span class=\"res\">1 MHz</span></p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s8q1",
     "typ": "mc",
     "niveau": "anwenden",
     "frage": "Wie viele Flip-Flops braucht ein Schaltwerk mit 5 Zuständen mindestens?",
     "optionen": [
      "2",
      "3",
      "5",
      "4"
     ],
     "richtig": 1,
     "erklaerung": "2² = 4 < 5 ≤ 8 = 2³."
    },
    {
     "id": "s8q2",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Ein Schaltwerk hat 2 Eingänge. Wie viele Pfeile gehen von jedem Zustand weg?",
     "optionen": [
      "2",
      "4",
      "1",
      "beliebig viele"
     ],
     "richtig": 1,
     "erklaerung": "Einer für jede der 2² = 4 Eingangskombinationen (Schleifen mitgezählt)."
    },
    {
     "id": "s8q3",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Welche Vorbereitung braucht ein D-Flip-Flop im Zustandsspeicher?",
     "optionen": [
      "D = Q_alt",
      "D = Q_neu",
      "D = Q̄",
      "D = Takt"
     ],
     "richtig": 1,
     "erklaerung": "Das D-FF übernimmt D – also einfach den gewünschten neuen Zustand anlegen."
    },
    {
     "id": "s8q4",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Wovon hängt beim Mealy-Automaten die Ausgabe ab?",
     "optionen": [
      "Nur vom Zustand",
      "Vom Zustand und den Eingängen",
      "Nur von den Eingängen",
      "Nur vom Takt"
     ],
     "richtig": 1,
     "erklaerung": "Darum stehen die Ausgaben an den Pfeilen."
    },
    {
     "id": "s8q5",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Welchen Vorteil bringt ein Power-On-Reset beim Entwurf?",
     "optionen": [
      "Man braucht keine Flip-Flops",
      "Unbenützte Zustände dürfen als X behandelt werden → einfachere Formeln",
      "Der Takt wird schneller",
      "Man braucht keinen Zustandsgraphen"
     ],
     "richtig": 1,
     "erklaerung": "Der Reset garantiert, dass unbenützte Zustände nie auftreten."
    },
    {
     "id": "s8q6",
     "typ": "wahrfalsch",
     "niveau": "verstehen",
     "frage": "Bei der Anfangsinitialisierung ist der Initialzustand sofort beim Einschalten erreicht.",
     "optionen": [
      "Wahr",
      "Falsch"
     ],
     "richtig": 1,
     "erklaerung": "Erst nach der ersten Taktflanke – bis zu einer Taktperiode kann ein falscher Zustand bestehen."
    },
    {
     "id": "s8q7",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Was ist im Schaltwerk-Modell die Funktion G?",
     "optionen": [
      "Ausgabefunktion",
      "Übergangsfunktion (bestimmt den Folgezustand)",
      "Zustandsspeicher",
      "Takt"
     ],
     "richtig": 1,
     "erklaerung": "F = Ausgabe, G = Übergang, Z = Zustandsspeicher."
    },
    {
     "id": "s8q8",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Zähler 0…5 (Ü4): Welcher Folgezustand gehört zu Q₂Q₁Q₀ = 101? (als 3 Bit)",
     "antwort": "000",
     "akzeptiert": [
      "000"
     ],
     "erklaerung": "5 → 0."
    }
   ],
   "aufgaben": [
    {
     "id": "s8a1",
     "schwierigkeit": "pruefung",
     "angabe": "Ü4 · 3: Baue einen synchronen Zähler 0, 1, 2, 3, 4, 5, 0, … aus drei Flip-Flops. Gesucht: Zustandsgraph, Übergangstabelle, Implementierung. Der Zählerstand wird direkt an Q₀, Q₁, Q₂ abgelesen.",
     "hinweise": [
      "Wie viele Zustände sind maximal möglich, wie viele brauchst du?",
      "Codierung = Binärzahl des Zählerstands; 110 und 111 sind X.",
      "D₀ ist einfach Q̄₀; für D₁ und D₂ die X günstig nutzen."
     ],
     "loesung": "<div class=\"step\"><h4 data-n=\"1\">Wie viele Zustände?</h4>\n<p>3 Flip-Flops ergeben 2³ = 8 mögliche Zustände. Das ist auch die Antwort auf die Frage „maximal wie viele?“. Wir brauchen 6 (Z0 bis Z5), zwei bleiben unbenützt.</p></div>\n<div class=\"step\"><h4 data-n=\"2\">Zustandsgraph</h4>\n<p>Der Zähler hat <b>keine Eingänge</b>. Deshalb geht von jedem Zustand genau 2⁰ = 1 Pfeil weg. Es gibt auch keine eigenen Ausgänge, der Zählerstand sind die Flip-Flop-Ausgänge selbst. Die Pfeile sind daher mit „−/−“ beschriftet.</p>\n<figure aria-label=\"Zustandsgraph Zähler 0 bis 5\"><svg viewBox=\"0 0 560 120\" width=\"560\">\n <defs><marker id=\"ar2\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"var(--v)\"/></marker></defs>\n <g fill=\"var(--paper)\" stroke=\"var(--ink)\" stroke-width=\"2\">\n  <circle cx=\"40\" cy=\"45\" r=\"24\"/><circle cx=\"135\" cy=\"45\" r=\"24\"/><circle cx=\"230\" cy=\"45\" r=\"24\"/><circle cx=\"325\" cy=\"45\" r=\"24\"/><circle cx=\"420\" cy=\"45\" r=\"24\"/><circle cx=\"515\" cy=\"45\" r=\"24\"/>\n </g>\n <g fill=\"none\" stroke=\"var(--v)\" stroke-width=\"2\" marker-end=\"url(#ar2)\">\n  <path d=\"M64 45 L109 45\"/><path d=\"M159 45 L204 45\"/><path d=\"M254 45 L299 45\"/><path d=\"M349 45 L394 45\"/><path d=\"M444 45 L489 45\"/>\n  <path d=\"M515 69 C 480 115, 80 115, 44 72\"/>\n </g>\n <g style=\"font-size:16px\" text-anchor=\"middle\">\n  <text x=\"40\" y=\"51\">Z0</text><text x=\"135\" y=\"51\">Z1</text><text x=\"230\" y=\"51\">Z2</text><text x=\"325\" y=\"51\">Z3</text><text x=\"420\" y=\"51\">Z4</text><text x=\"515\" y=\"51\">Z5</text>\n  <text x=\"280\" y=\"114\" style=\"font-size:13px;fill:var(--muted)\">jeder Pfeil: −/− (kein Eingang, kein extra Ausgang)</text>\n </g>\n</svg></figure></div>\n<div class=\"step\"><h4 data-n=\"3\">Codierung</h4>\n<p>Der Zählerstand soll direkt an Q₂Q₁Q₀ ablesbar sein. Deshalb bekommt jeder Zustand <b>seine eigene Binärzahl</b>: Z0 = 000, Z1 = 001, … , Z5 = 101. Die Muster 110 und 111 sind unbenützt. Wir nehmen einen Power-On-Reset an, also sind diese Zeilen X.</p></div>\n<div class=\"step\"><h4 data-n=\"4\">Übergangstabelle (D = Q<sub>neu</sub>)</h4>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th>Z<sub>alt</sub></th><th>Q₂</th><th>Q₁</th><th>Q₀</th><th></th><th>Z<sub>neu</sub></th><th>Q₂ = D₂</th><th>Q₁ = D₁</th><th>Q₀ = D₀</th></tr>\n<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>→</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>\n<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>→</td><td>2</td><td>0</td><td class=\"c-p\">1</td><td>0</td></tr>\n<tr><td>2</td><td>0</td><td>1</td><td>0</td><td>→</td><td>3</td><td>0</td><td class=\"c-p\">1</td><td>1</td></tr>\n<tr><td>3</td><td>0</td><td>1</td><td>1</td><td>→</td><td>4</td><td class=\"c-p\">1</td><td>0</td><td>0</td></tr>\n<tr><td>4</td><td>1</td><td>0</td><td>0</td><td>→</td><td>5</td><td class=\"c-p\">1</td><td>0</td><td>1</td></tr>\n<tr><td>5</td><td>1</td><td>0</td><td>1</td><td>→</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>\n<tr><td>6</td><td>1</td><td>1</td><td>0</td><td>→</td><td>−</td><td class=\"c-o\">X</td><td class=\"c-o\">X</td><td class=\"c-o\">X</td></tr>\n<tr><td>7</td><td>1</td><td>1</td><td>1</td><td>→</td><td>−</td><td class=\"c-o\">X</td><td class=\"c-o\">X</td><td class=\"c-o\">X</td></tr>\n</table></div>\n<p class=\"src\">Bis hierher ist das die offizielle Lösung. Die Formeln darunter habe ich ergänzt und für alle Zustände geprüft.</p></div>\n<div class=\"step\"><h4 data-n=\"5\">Formeln (X-Stellen günstig gewählt)</h4>\n<ul>\n<li><b>D₀:</b> Die Spalte lautet 1, 0, 1, 0, 1, 0. Das ist immer das Gegenteil des alten Q₀ → <span class=\"mono res\">D₀ = Q̄₀</span></li>\n<li><b>D₂:</b> Eine 1 steht bei 011 und bei 100.\n  <ul>\n  <li>011 zusammen mit dem X bei 111 ergibt den Term Q₁ &amp; Q₀.</li>\n  <li>100 zusammen mit dem X bei 110 ergibt den Term Q₂ &amp; Q̄₀.</li>\n  <li>→ <span class=\"mono res\">D₂ = (Q₁ &amp; Q₀) ∨ (Q₂ &amp; Q̄₀)</span></li>\n  </ul></li>\n<li><b>D₁:</b> Eine 1 steht bei 001 und bei 010.\n  <ul>\n  <li>010 zusammen mit dem X bei 110 ergibt den Term Q₁ &amp; Q̄₀.</li>\n  <li>001 hat keinen Partner, alle Nachbarn sind 0. Also bleibt der volle Term Q̄₂ &amp; Q̄₁ &amp; Q₀.</li>\n  <li>→ <span class=\"mono res\">D₁ = (Q₁ &amp; Q̄₀) ∨ (Q̄₂ &amp; Q̄₁ &amp; Q₀)</span></li>\n  </ul></li>\n</ul>\n<p><b>Probe mit Zustand 5</b> (Q₂Q₁Q₀ = 101):</p>\n<ul>\n<li>D₀ = Q̄₀ = 0</li>\n<li>D₁ = (0 &amp; 0) ∨ (0 &amp; 1 &amp; 1) = 0</li>\n<li>D₂ = (0 &amp; 1) ∨ (1 &amp; 0) = 0</li>\n</ul>\n<p>Der neue Zustand ist 000 = Z0 ✓</p></div>",
     "fehler": [
      "Unbenützte Zustände ohne Reset-Annahme als X verwendet – Annahme hinschreiben!"
     ],
     "fix": true
    },
    {
     "id": "s8a2",
     "schwierigkeit": "pruefung",
     "angabe": "Ü4 · 4: Blinklicht mit Ausgang L, Taste S (Stopp: Helligkeit halten) und Taste H (halb so schnell). Gesucht: Zustandsgraph, Übergangstabelle, Implementierung.",
     "hinweise": [
      "Für „halb so schnell“ braucht man zusätzlich einen Merker für den 1./2. Takt.",
      "Vier Zustände E0, E1, A0, A1.",
      "S = 1 → Schleife; 00 → Lampe wechselt; 01 → Kreis E0 → E1 → A1 → A0."
     ],
     "loesung": "<p>Angabe:</p>\n<ul>\n<li>Normal blinkt die Lampe L im Takt.</li>\n<li>Taste S (Stopp): Die momentane Helligkeit bleibt, solange S gedrückt ist.</li>\n<li>Taste H: Die Lampe blinkt halb so schnell, also nur bei jedem zweiten Takt ein Wechsel.</li>\n</ul>\n<div class=\"step\"><h4 data-n=\"1\">Welche Zustände braucht man?</h4>\n<div class=\"q3\"><span><b>Was wollen wir?</b> Dass sich das Schaltwerk merkt, ob die Lampe an oder aus ist.</span>\n<span><b>Problem:</b> Für „halb so schnell“ muss es zusätzlich wissen, ob es im 1. oder im 2. Takt der Phase ist. Zwei Zustände reichen also nicht.</span>\n<span><b>Lösung:</b> vier Zustände. E0 und E1 = Lampe <b>ein</b> (1. bzw. 2. Takt), A0 und A1 = Lampe <b>aus</b> (1. bzw. 2. Takt). Das ergibt 2 Flip-Flops: E0 = 00, E1 = 01, A0 = 10, A1 = 11 (Q₁Q₀). Damit gilt: Q₁ = 1 heißt aus.</span></div></div>\n<div class=\"step\"><h4 data-n=\"2\">Übergänge</h4>\n<ul>\n<li><b>S = 1 (SH = 10 oder 11):</b> Der Zustand bleibt, im Graphen eine Schleife.</li>\n<li><b>SH = 00 (normal):</b> Die Lampe wechselt, und man startet wieder im 1. Takt. E0 und E1 gehen nach A0, A0 und A1 gehen nach E0.</li>\n<li><b>SH = 01 (halb so schnell):</b> Eine Stufe weiter im Kreis <span class=\"c-v\">E0 → E1 → A1 → A0 → E0</span>. Die Lampe wechselt nur bei jedem zweiten Schritt.</li>\n<li><b>L</b> ist die Helligkeit <b>nach</b> dem Übergang, also L = 1, wenn der neue Zustand ein E-Zustand ist.</li>\n</ul>\n<figure aria-label=\"Zustandsgraph Blinklicht\"><svg viewBox=\"0 0 560 360\" width=\"560\">\n <defs>\n  <marker id=\"arv\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"var(--v)\"/></marker>\n  <marker id=\"arp\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"var(--p)\"/></marker>\n  <marker id=\"arg\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"var(--g)\"/></marker>\n </defs>\n <!-- H-cycle (violet) -->\n <g fill=\"none\" stroke=\"var(--v)\" stroke-width=\"2\" marker-end=\"url(#arv)\">\n  <path d=\"M168 70 L392 70\"/><path d=\"M430 102 L430 248\"/><path d=\"M392 280 L168 280\"/><path d=\"M118 248 L118 102\"/>\n </g>\n <!-- normal 00 (pink) -->\n <g fill=\"none\" stroke=\"var(--p)\" stroke-width=\"2\" marker-end=\"url(#arp)\">\n  <path d=\"M142 104 L142 246\"/>\n  <path d=\"M404 96 L160 258\"/>\n  <path d=\"M404 254 L160 94\"/>\n </g>\n <!-- self loops (green) -->\n <g fill=\"none\" stroke=\"var(--g)\" stroke-width=\"2\" marker-end=\"url(#arg)\">\n  <path d=\"M110 50 C 60 0, 30 60, 102 72\"/><path d=\"M448 50 C 500 0, 530 60, 458 72\"/>\n  <path d=\"M110 300 C 60 350, 30 290, 102 278\"/><path d=\"M448 300 C 500 350, 530 290, 458 278\"/>\n </g>\n <g fill=\"var(--paper)\" stroke=\"var(--ink)\" stroke-width=\"2\">\n  <circle cx=\"130\" cy=\"70\" r=\"34\"/><circle cx=\"430\" cy=\"70\" r=\"34\"/><circle cx=\"130\" cy=\"280\" r=\"34\"/><circle cx=\"430\" cy=\"280\" r=\"34\"/>\n </g>\n <g text-anchor=\"middle\" style=\"font-size:17px\">\n  <text x=\"130\" y=\"68\">E0</text><text x=\"130\" y=\"86\" style=\"font-size:12px;fill:var(--muted)\">00 · ein</text>\n  <text x=\"430\" y=\"68\">E1</text><text x=\"430\" y=\"86\" style=\"font-size:12px;fill:var(--muted)\">01 · ein</text>\n  <text x=\"130\" y=\"278\">A0</text><text x=\"130\" y=\"296\" style=\"font-size:12px;fill:var(--muted)\">10 · aus</text>\n  <text x=\"430\" y=\"278\">A1</text><text x=\"430\" y=\"296\" style=\"font-size:12px;fill:var(--muted)\">11 · aus</text>\n </g>\n <g style=\"font-size:14px\" class=\"mono\">\n  <text x=\"250\" y=\"60\" style=\"fill:var(--v)\">01/1</text>\n  <text x=\"440\" y=\"180\" style=\"fill:var(--v)\">01/0</text>\n  <text x=\"250\" y=\"300\" style=\"fill:var(--v)\">01/0</text>\n  <text x=\"30\" y=\"180\" style=\"fill:var(--v)\">01/1</text>\n  <text x=\"148\" y=\"200\" style=\"fill:var(--p)\">00/0</text>\n  <text x=\"60\" y=\"150\" style=\"fill:var(--p)\"></text>\n  <text x=\"300\" y=\"138\" style=\"fill:var(--p)\">00/0 (E1→A0)</text>\n  <text x=\"300\" y=\"226\" style=\"fill:var(--p)\">00/1 (A1→E0)</text>\n  <text x=\"20\" y=\"22\" style=\"fill:var(--g)\">10/1, 11/1</text><text x=\"455\" y=\"22\" style=\"fill:var(--g)\">10/1, 11/1</text>\n  <text x=\"20\" y=\"350\" style=\"fill:var(--g)\">10/0, 11/0</text><text x=\"455\" y=\"350\" style=\"fill:var(--g)\">10/0, 11/0</text>\n </g>\n</svg>\n<figcaption>Pfeile sind mit „SH / L“ beschriftet. <span class=\"c-v\">Lila</span> = H-Kreis (01). <span class=\"c-p\">Pink</span> = normal (00). Die linke senkrechte pinke Linie steht für E0 → A0 mit 00/0. A0 → E0 gilt sowohl für 00/1 als auch für 01/1, deshalb ist die lila Linie links mit beidem gemeint. <span class=\"c-g\">Grün</span> = Stopp-Schleifen.</figcaption></figure></div>\n<div class=\"step\"><h4 data-n=\"3\">Übergangstabelle (wie in der Lösung)</h4>\n<div class=\"scroll\"><table class=\"t\">\n<tr><th class=\"l\">alt</th><th colspan=\"4\">E0 (00)</th><th colspan=\"4\">E1 (01)</th><th colspan=\"4\">A0 (10)</th><th colspan=\"4\">A1 (11)</th></tr>\n<tr><th class=\"l\">S</th><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>\n<tr><th class=\"l\">H</th><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>\n<tr><th class=\"l\">neu</th><td>A0</td><td>E1</td><td>E0</td><td>E0</td><td>A0</td><td>A1</td><td>E1</td><td>E1</td><td>E0</td><td>E0</td><td>A0</td><td>A0</td><td>E0</td><td>A0</td><td>A1</td><td>A1</td></tr>\n<tr><th class=\"l\">Q₁ neu</th><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>\n<tr><th class=\"l\">Q₀ neu</th><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>\n<tr><th class=\"l\">L</th><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>\n</table></div>\n<p>Wenn du die Zeilen „Q₁ neu“ und „L“ vergleichst, siehst du: <b>L ist überall das Gegenteil von Q₁ neu</b>. Das liegt an der Codierung, denn Q₁ = 1 heißt aus.</p></div>\n<div class=\"step\"><h4 data-n=\"4\">Formeln mit D-Flip-Flops</h4>\n<p class=\"src\">Diesen Schritt habe ich ergänzt (die Lösung endet bei der Tabelle) und gegen alle 16 Zeilen geprüft.</p>\n<p class=\"mono\">D₁ = (S &amp; Q₁) ∨ (S̄ &amp; Q̄₁ &amp; H̄) ∨ (S̄ &amp; Q₀ &amp; H)<br>D₀ = (S &amp; Q₀) ∨ (S̄ &amp; Q̄₁ &amp; H)<br>L = D̄₁</p>\n<p>So liest man die Formeln:</p>\n<ul>\n<li>(S &amp; Q₁) und (S &amp; Q₀) bedeuten: Bei Stopp bleibt der alte Wert.</li>\n<li>Die anderen Terme beschreiben den Fall S = 0.</li>\n</ul>\n<p><b>Probe mit A1 (Q₁Q₀ = 11), SH = 01:</b></p>\n<ul>\n<li>D₁ = (0 &amp; 1) ∨ (1 &amp; 0 &amp; 0) ∨ (1 &amp; 1 &amp; 1) = 1</li>\n<li>D₀ = (0 &amp; 1) ∨ (1 &amp; 0 &amp; 1) = 0</li>\n</ul>\n<p>Der neue Zustand ist 10 = A0, und L = 0 ✓</p></div>\n\n<!-- ===================== TRAINER ===================== -->",
     "fehler": [
      "Nur zwei Zustände verwendet (dann geht „halb so schnell“ nicht)."
     ],
     "fix": true
    },
    {
     "id": "s8a3",
     "schwierigkeit": "mittel",
     "angabe": "Entwirf einen 2-Bit-Zähler, der zyklisch 00 → 01 → 11 → 10 → 00 zählt (Gray-Code), mit D-Flip-Flops (Q₁Q₀). Bestimme D₁ und D₀.",
     "hinweise": [
      "Tabelle alt → neu aufstellen.",
      "D = Q_neu.",
      "Vergleiche die Spalten mit Q₁ und Q₀."
     ],
     "loesung": "<div class=\"scroll\"><table class=\"t\"><tr><th>Q₁Q₀ alt</th><th>Q₁Q₀ neu</th><th>D₁</th><th>D₀</th></tr><tr><td>00</td><td>01</td><td>0</td><td>1</td></tr><tr><td>01</td><td>11</td><td>1</td><td>1</td></tr><tr><td>11</td><td>10</td><td>1</td><td>0</td></tr><tr><td>10</td><td>00</td><td>0</td><td>0</td></tr></table></div><p>D₁ ist genau die alte Spalte Q₀ → <span class=\"res mono\">D₁ = Q₀</span>. D₀ ist genau das Gegenteil von Q₁ → <span class=\"res mono\">D₀ = Q̄₁</span>.</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s8a4",
     "schwierigkeit": "schwer",
     "angabe": "Lichtsteuerung aus dem Skript: Wie ändert sich der Entwurf, wenn es KEINEN Power-On-Reset gibt?",
     "hinweise": [
      "Was passiert mit dem unbenützten Zustand 10?",
      "Er muss im Graphen auftauchen.",
      "Alle Pfeile von dort führen in einen Initialzustand."
     ],
     "loesung": "<p>Der Zustand 10 („n.v.“) wird eingezeichnet; alle vier Eingangskombinationen führen nach „aus“ (Ausgang P = 0). In der Tabelle gibt es keine X mehr, die Formeln werden länger (Skript S. 93):</p><p class=\"mono\">D₀ = (D̄ &amp; H &amp; Q̄₀) ∨ (Q₀ &amp; Q₁ &amp; D̄)<br>D₁ = (Q₁ &amp; D̄) ∨ (Q₁ &amp; H) ∨ (Q̄₀ &amp; H)</p><p>Der Initialzustand wird erst nach der ersten Taktflanke erreicht.</p>",
     "fehler": [],
     "fix": false
    }
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
   ],
   "fragen": [
    {
     "id": "s9q1",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Wie realisiert ein ROM eine logische Funktion?",
     "optionen": [
      "Die Eingänge bilden die Adresse, das gespeicherte Bit ist der Funktionswert",
      "Durch ein KV-Diagramm im Chip",
      "Durch einen Zähler",
      "Durch Flip-Flops"
     ],
     "richtig": 0,
     "erklaerung": "Die ganze Wahrheitstabelle liegt im Speicher."
    },
    {
     "id": "s9q2",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "Eine Funktion hat 8 Eingänge und 1 Ausgang. Wie viele Speicherzellen (Bit) braucht das ROM?",
     "antwort": "256",
     "akzeptiert": [
      "256"
     ],
     "erklaerung": "2⁸ = 256 Adressen × 1 Bit."
    },
    {
     "id": "s9q3",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wie berechnet man die maximale Taktfrequenz eines Schaltwerks?",
     "optionen": [
      "f = t₁ + t₂ + t₃",
      "f_max = 1 / (t₁ + t₂ + t₃)",
      "f_max = 1 / t₁",
      "f_max = 2 / T"
     ],
     "richtig": 1,
     "erklaerung": "t₁ FF-Verzögerung, t₂ Übergangsfunktion, t₃ Setup-Zeit."
    },
    {
     "id": "s9q4",
     "typ": "mc",
     "niveau": "erinnern",
     "frage": "Wo liegt die Konfiguration eines FPGA meistens?",
     "optionen": [
      "Im Flash, sofort verfügbar",
      "Im flüchtigen RAM – bei jedem Start neu laden",
      "In einem EPROM mit UV-Fenster",
      "In Flip-Flops ohne Strom"
     ],
     "richtig": 1,
     "erklaerung": "Beim CPLD liegt sie dagegen in Flash/EEPROM."
    },
    {
     "id": "s9q5",
     "typ": "mc",
     "niveau": "verstehen",
     "frage": "Wodurch unterscheidet sich ein CPLD von einem FPGA?",
     "optionen": [
      "CPLD: wenige komplexe Blöcke; FPGA: sehr viele kleine Logikblöcke",
      "CPLD ist flüchtig, FPGA nicht",
      "CPLD hat keine Flip-Flops",
      "Es gibt keinen Unterschied"
     ],
     "richtig": 0,
     "erklaerung": "FPGA ist feingranular mit hunderttausenden Blöcken."
    },
    {
     "id": "s9q6",
     "typ": "eingabe",
     "niveau": "anwenden",
     "frage": "t₁ = 10 ns, t₂ = 25 ns, t₃ = 15 ns. Wie groß ist f_max in MHz?",
     "antwort": "20",
     "akzeptiert": [
      "20",
      "20 mhz",
      "20mhz"
     ],
     "erklaerung": "T_min = 50 ns → 1 / 50 ns = 20 MHz."
    }
   ],
   "aufgaben": [
    {
     "id": "s9a1",
     "schwierigkeit": "mittel",
     "angabe": "Ein Schaltwerk hat t₁ = 20 ns (Flip-Flop), t₂ = 30 ns (Übergangslogik), t₃ = 20 ns (Setup). Berechne T_min und f_max.",
     "hinweise": [
      "Alle drei Zeiten addieren.",
      "f = 1 / T.",
      "1 / 70 ns."
     ],
     "loesung": "<p>T_min = 20 + 30 + 20 = 70 ns → f_max = 1 / 70 ns ≈ <span class=\"res\">14,29 MHz</span></p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s9a2",
     "schwierigkeit": "leicht",
     "angabe": "Wie groß muss ein ROM sein, das 8 Funktionen mit je 13 Eingängen gleichzeitig bildet?",
     "hinweise": [
      "13 Eingänge → 2¹³ Adressen.",
      "8 Funktionen → 8 Bit pro Adresse.",
      "2¹³ = 8 Ki."
     ],
     "loesung": "<p><b>8 Ki × 8 Bit</b> (8192 Wörter à 8 Bit).</p>",
     "fehler": [],
     "fix": false
    },
    {
     "id": "s9a3",
     "schwierigkeit": "pruefung",
     "angabe": "Die Lichtsteuerung (Eingänge D, H; Zustand Q₀, Q₁; Ausgänge D₀, D₁, P) soll mit einem ROM gebaut werden. Welche Organisation braucht das ROM?",
     "hinweise": [
      "Was ist die Adresse?",
      "Was sind die Daten?",
      "2^Adressbits × Datenbits."
     ],
     "loesung": "<p>Adresse = D, H, Q₀, Q₁ → 4 Bit → 16 Adressen. Daten = D₀, D₁, P → 3 Bit. ROM: <b>16 × 3 Bit</b> (Abbildung 4-34).</p>",
     "fehler": [],
     "fix": false
    }
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

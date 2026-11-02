# Übung 3 – Lösungen mit Erklärung

Der vollständige Code steht in `App.java`. Hier wird **jede Aufgabe Schritt für Schritt** erklärt,
inklusive *warum* man es so macht und welche Fragen dir dabei gestellt werden könnten.

---

## Aufgabe 1 – One Month Calendar

```java
public static void oneMonthCalendar(int days, int firstDay) {
    int column = firstDay - 1;
    for (int i = 0; i < column; i++) {
        System.out.print("   ");
    }
    for (int day = 1; day <= days; day++) {
        System.out.printf("%2d ", day);
        column++;
        if (column == 7) {
            System.out.println();
            column = 0;
        }
    }
    System.out.println();
}
```

### Idee
Ein Kalender ist eine Tabelle mit 7 Spalten (Mo–So). Wir geben die Tage der Reihe nach aus und
merken uns in `column`, **in welcher Spalte wir gerade sind**. Sobald 7 Spalten voll sind
(Sonntag), kommt ein Zeilenumbruch.

### Schritt für Schritt
1. **`column = firstDay - 1`**: `firstDay` geht von 1 (Mo) bis 7 (So). Spalten zählen wir aber ab 0.
   Beginnt der Monat am Mittwoch (3), müssen davor 2 Spalten (Mo, Di) leer bleiben → `3 - 1 = 2`.
2. **Leerräume ausgeben**: Jede Zahl wird mit `"%2d "` ausgegeben, belegt also immer **3 Zeichen**
   (2 für die Zahl, 1 Leerzeichen). Ein leeres Feld muss deshalb auch genau 3 Zeichen breit sein: `"   "`.
   Sonst wären die Spalten verschoben.
3. **`printf("%2d ", day)`**: `%2d` heißt „ganze Zahl, mindestens 2 Zeichen breit, rechtsbündig“.
   Aus `5` wird `" 5"`, aus `12` bleibt `"12"`. Dadurch stehen die Zahlen sauber untereinander.
4. **`column++` und `if (column == 7)`**: Nach jedem Tag rücken wir eine Spalte weiter. Bei 7 ist
   die Woche voll → `println()` (neue Zeile) und `column` wieder auf 0.
5. **Abschließendes `println()`**: Laut Angabe wird am Ende noch eine Leerzeile ausgegeben.
   - Endet der Monat mitten in der Woche (Beispiel 1), schließt dieses `println()` die letzte Zeile ab.
   - Endet er genau am Sonntag (Beispiel 2: 28 Tage ab Montag), wurde die Zeile schon beendet →
     es entsteht eine echte Leerzeile.

### Mögliche Prüfungsfragen
- *Warum nicht einfach `print(day + " ")`?* → Einstellige Zahlen wären nur 2 Zeichen breit, die
  Spalten würden verrutschen.
- *Warum brauchst du `column` und rechnest nicht mit `day % 7`?* → Das ginge auch
  (`(day + firstDay - 1) % 7 == 0` → Zeilenumbruch), aber die Zählvariable ist leichter verständlich.

---

## Aufgabe 2 – Pseudo Random Numbers (LCG)

```java
public static long[] lcg(long seed) {
    final long m = 2147483648L;   // 2^31
    final long a = 1103515245L;
    final long c = 12345L;

    long[] numbers = new long[10];
    long x = seed;
    for (int i = 0; i < numbers.length; i++) {
        x = (a * x + c) % m;
        numbers[i] = x;
    }
    return numbers;
}
```

### Idee
Ein **linearer Kongruenzgenerator** erzeugt „Zufallszahlen“ mit einer einfachen Formel: Jede neue
Zahl wird aus der vorherigen berechnet: `X(i+1) = (a · X(i) + c) mod m`.
Die Zahlen sind nicht wirklich zufällig (**pseudo**-zufällig): Mit dem gleichen Seed kommt immer
die gleiche Folge heraus. Das ist z. B. für Tests praktisch.

### Warum `long`? (wichtigste Frage!)
- `m = 2^31 = 2 147 483 648`. Der größte `int` ist `2^31 - 1 = 2 147 483 647`.
  **m passt also nicht in einen `int`** → `long`.
- `a · X` kann bis ca. `1,1·10^9 · 2,1·10^9 ≈ 2,4·10^18` werden. Das sprengt `int` bei Weitem
  (Überlauf → falsche, evtl. negative Ergebnisse), passt aber in `long` (max. ca. `9,2·10^18`).
- Das `L` hinter den Zahlen (`2147483648L`) sagt dem Compiler, dass es ein `long`-Literal ist.
  Ohne `L` wäre `2147483648` ein Compile-Fehler („integer number too large“).
- `final` → es sind Konstanten, sie sollen sich nicht ändern.

### Ablauf
- `x` startet mit dem Seed `X0`.
- In jedem Schleifendurchlauf wird aus dem alten `x` das neue berechnet und ins Array geschrieben.
- Das Array hat 10 Plätze → genau 10 Zufallszahlen `X1 … X10`.
- `% m` (Modulo) liefert den Rest der Division durch m → das Ergebnis liegt immer zwischen `0` und `m-1`.

### Test in `main`
```java
long[] randoms = lcg(0);
for (long r : randoms) {
    System.out.println(r);
}
```
Mit Seed 0 kommt z. B. als erste Zahl `12345` heraus (`1103515245 · 0 + 12345 = 12345`).

---

## Aufgabe 3 – Guessing Game

```java
public static void guessingGame(int numberToGuess) {
    Scanner scanner = new Scanner(System.in);
    boolean won = false;

    for (int attempt = 1; attempt <= 10; attempt++) {
        System.out.print("Guess number " + attempt + ": ");
        int guess = scanner.nextInt();

        if (guess == numberToGuess) {
            System.out.println("You won wisenheimer!");
            won = true;
            break;
        } else if (numberToGuess < guess) {
            System.out.println("The number AI picked is lower than your guess.");
        } else {
            System.out.println("The number AI picked is higher than your guess.");
        }
    }
    if (!won) {
        System.out.println("You lost! Have you ever heard of divide & conquer?");
    }
}

public static int randomNumberBetweenOneAndHundred() {
    Random random = new Random();
    return random.nextInt(100) + 1;
}
```

### Idee
Maximal 10 Versuche → eine **`for`-Schleife von 1 bis 10**. Wird die Zahl erraten, brechen wir mit
`break` vorzeitig ab. Damit erfüllen wir beide Abbruchbedingungen („10 Versuche“ **oder** „erraten“).

### Details
- **`Scanner(System.in)`** liest Eingaben von der Tastatur. `nextInt()` liest die nächste ganze Zahl.
- **`print` statt `println`** bei `"Guess number 1: "` → der Cursor bleibt in derselben Zeile, der
  Benutzer tippt direkt dahinter (wie im Beispiel).
- **Vergleich**: Ist die gesuchte Zahl *kleiner* als der Tipp → „lower“, sonst → „higher“.
  Achtung auf die Richtung: Der Satz beschreibt die **gesuchte** Zahl im Verhältnis zum Tipp.
- **`boolean won`**: Nach der Schleife wissen wir sonst nicht, *warum* sie geendet hat (erraten
  oder 10 Versuche aufgebraucht). Die Flag-Variable merkt sich das, damit „You lost!“ nur bei
  Niederlage kommt.
  (Alternative: die Methode bei Erfolg direkt mit `return` verlassen – dann braucht man keine Flag.)

### Zufallszahl 1–100
- `random.nextInt(100)` liefert eine Zahl von **0 bis 99** (die 100 selbst ist exklusiv!).
- `+ 1` verschiebt den Bereich auf **1 bis 100**.
- Alternative aus der Fußnote: `1 + (int)(Math.random() * 100)` – `Math.random()` liefert eine
  Kommazahl in `[0, 1)`, mal 100 → `[0, 100)`, abgeschnitten → 0..99, plus 1 → 1..100.

### Aufruf in `main`
```java
guessingGame(randomNumberBetweenOneAndHundred());
```
Der Rückgabewert der einen Methode wird direkt als Parameter an die andere übergeben.

### Warum „divide & conquer“?
Mit der Strategie *immer die Mitte raten* (50, dann 25 oder 75, …) halbiert man den Suchbereich
jedes Mal. 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1: spätestens nach **7 Versuchen** hat man die Zahl
(binäre Suche, `log2(100) ≈ 6,6`). Mit 10 Versuchen kann man also nur verlieren, wenn man schlecht rät.

---

## Aufgabe 4 – Swap Arrays

```java
public static boolean swapArrays(int[] array1, int[] array2) {
    if (array1.length != array2.length) {
        return false;
    }
    for (int i = 0; i < array1.length; i++) {
        int temp = array1[i];
        array1[i] = array2[i];
        array2[i] = temp;
    }
    return true;
}
```

### Idee
1. Zuerst prüfen, ob die Längen gleich sind – sonst sofort `false` zurückgeben (frühes `return`).
2. Dann **Element für Element** tauschen, mit einer Hilfsvariable `temp` („Dreieckstausch“):
   - `temp` merkt sich den alten Wert von `array1[i]`,
   - `array1[i]` bekommt den Wert aus `array2[i]`,
   - `array2[i]` bekommt den gemerkten alten Wert.

   Ohne `temp` wäre der ursprüngliche Wert von `array1[i]` nach der ersten Zuweisung verloren.

### Die wichtigste Frage: Warum nicht einfach die Arrays selbst tauschen?
```java
int[] temp = array1;   // FUNKTIONIERT NICHT wie gewünscht!
array1 = array2;
array2 = temp;
```
In Java werden Parameter **by value** übergeben. Bei Arrays ist dieser „Wert“ eine **Referenz**
(eine Adresse, wo das Array im Speicher liegt). Die Methode bekommt also **Kopien der Referenzen**.
Tauscht man diese Kopien, ändert sich nur, worauf die *lokalen* Variablen zeigen – die Variablen
in `main` zeigen weiterhin auf dieselben Arrays wie vorher.

Ändert man dagegen den **Inhalt** (`array1[i] = …`), dann ändert man das Array-Objekt selbst, auf
das auch `main` zeigt → die Änderung ist außerhalb sichtbar. Deshalb muss man elementweise tauschen.

- *Keine API-Klassen*: Deshalb kein `Arrays.copyOf`, `System.arraycopy` o. Ä. – nur die Schleife.

---

## Aufgabe 5 – CamelCase

```java
public static String camelCase(String sentence) {
    char[] chars = sentence.toCharArray();
    StringBuilder result = new StringBuilder();
    boolean newWord = true;

    for (char ch : chars) {
        if (ch == ' ') {
            newWord = true;
        } else if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            if (newWord) {
                if (ch >= 'a' && ch <= 'z') {
                    ch = (char) (ch - 'a' + 'A');
                }
                newWord = false;
            } else {
                if (ch >= 'A' && ch <= 'Z') {
                    ch = (char) (ch - 'A' + 'a');
                }
            }
            result.append(ch);
        }
    }
    return result.toString();
}
```

### Idee
Wir gehen Zeichen für Zeichen durch und merken uns mit **`newWord`**, ob der nächste Buchstabe der
**erste eines Wortes** ist. Für jedes Zeichen gibt es drei Fälle:

| Zeichen | Was passiert |
|---|---|
| Leerzeichen | wird nicht übernommen, aber `newWord = true` → nächster Buchstabe wird groß |
| Buchstabe | erster im Wort → **groß**, sonst → **klein**; dann anhängen |
| alles andere (`. , ' ?` …) | wird ignoriert (nicht angehängt) |

`newWord` startet mit `true`, weil der allererste Buchstabe auch groß werden muss.

### Groß-/Kleinschreibung „manuell mit chars rechnen“
`char`s sind in Java intern **Zahlen** (Unicode/ASCII-Codes): `'A' = 65 … 'Z' = 90`,
`'a' = 97 … 'z' = 122`. Klein- und Großbuchstaben haben also immer denselben Abstand (32).

- **klein → groß**: `ch - 'a' + 'A'`
  Beispiel `'m'`: `'m' - 'a'` = 12 (Position im Alphabet), `+ 'A'` → 65 + 12 = 77 = `'M'`.
- **groß → klein**: `ch - 'A' + 'a'` (genau umgekehrt).
- Der Cast `(char)` ist nötig, weil das Rechnen mit chars ein `int` ergibt.

Die Bereichsprüfung `ch >= 'a' && ch <= 'z'` funktioniert aus demselben Grund: Die Buchstaben
liegen im Code direkt hintereinander.

### Warum `StringBuilder`?
Strings sind in Java **unveränderlich (immutable)**. `result = result + ch` würde bei jedem Zeichen
einen **neuen** String erzeugen. `StringBuilder` ist ein veränderbarer Puffer, `append` hängt
einfach an – effizienter. (Mit `String` und `+=` wäre es laut Angabe aber auch erlaubt.)

### Durchgespielt: `"my name isn't Alice"`
- `m` → neues Wort → `M`; `y` → `y` → „My“
- Leerzeichen → `newWord = true`
- `name` → „Name“, `isn't` → `i`→`I`, `s`, `n`, `'` ignoriert, `t` → „Isnt“
- `Alice` → „Alice“
- Ergebnis: **`MyNameIsntAlice`** ✔

Beim zweiten Beispiel macht der `else`-Zweig aus `AnY` → `Any` und aus `oYster` → `Oyster`.

---

## Aufgabe 6 – Check Digit (Modulo 11)

```java
public static int checkDigit(int[] code) {
    int sum = 0;
    for (int i = 0; i < code.length; i++) {
        sum += code[i] * (i + 2);
    }
    int rest = sum % 11;
    int digit = 11 - rest;

    if (digit == 10) {
        digit = 0;
    } else if (digit == 11) {
        digit = 5;
    }
    return digit;
}
```

### Idee
Die Methode setzt die 5 Schritte aus der Angabe **1:1** um:

1. **Gewicht = Position + 2** → im Array ist die Position der Index `i` (beginnt bei 0),
   also Gewicht `i + 2` (2, 3, 4, …).
2. **Produkte aufsummieren** → `sum += code[i] * (i + 2)` in der Schleife.
3. **Rest bei Division durch 11** → `sum % 11`.
4. **Prüfziffer = 11 − Rest**.
5. **Ausnahmen**: Die Prüfziffer muss eine einzelne Ziffer sein. 10 und 11 sind zweistellig, deshalb
   10 → 0 und 11 → 5. (Da der Rest zwischen 0 und 10 liegt, ist `11 - rest` zwischen 1 und 11.)

### Durchgerechnet (Beispiel aus der Angabe)
| Code | 3 | 9 | 1 | 5 | 8 |
|---|---|---|---|---|---|
| Gewicht | 2 | 3 | 4 | 5 | 6 |
| Produkt | 6 | 27 | 4 | 25 | 48 |

Summe = 110, `110 % 11 = 0`, `11 - 0 = 11` → Ausnahme → **5** ✔

### Warum macht man so etwas?
Durch die unterschiedlichen Gewichte erkennt das Verfahren nicht nur eine falsche Ziffer, sondern
auch **vertauschte Nachbarziffern** (z. B. `39` statt `93`), weil sich dann die Summe ändert.
Bei einer einfachen Quersumme würde ein Zahlendreher nicht auffallen.

---

## Allgemeine Punkte, die oft gefragt werden

- **`public static`**: `public` = von überall aufrufbar (auch von den Tests), `static` = gehört zur
  Klasse, man braucht kein Objekt (`App.camelCase(...)` direkt aufrufbar, auch aus `main`, das selbst static ist).
- **`void` vs. Rückgabetyp**: Aufgabe 1 und 3 *geben aus* (→ `void`), Aufgabe 2, 4, 5, 6 *liefern
  ein Ergebnis zurück* (`long[]`, `boolean`, `String`, `int`), das der Aufrufer weiterverwenden kann.
- **Array-Index beginnt bei 0**, deshalb Schleifen `for (int i = 0; i < arr.length; i++)`.
- **`for` vs. `for-each`**: `for (char ch : chars)` ist praktisch, wenn man nur liest. Braucht man
  den Index (Aufgabe 4, 6: zwei Arrays bzw. Gewicht `i + 2`), nimmt man die normale `for`-Schleife.

# Programmierung 1 – Übungsfragen zu Skripten 01–04

Aufbau: **Teil A** Multiple Choice (genau eine richtige Antwort, sofern nicht anders angegeben), **Teil B** Code lesen („Was gibt das Programm aus?"), **Teil C** Code schreiben. Alle Lösungen stehen am Ende. Die Ausgaben in Teil B wurden mit Java geprüft.

Tipp: Erst selbst lösen, dann erst die Lösungen ansehen.

---

## Teil A – Multiple Choice

### Skript 01 – Einführung, Informationsdarstellung, Java-Grundlagen

**A1.** Wie wird das Zeichen „A“ in ASCII gespeichert?
- a) 65 (dezimal), 01000001 (binär)
- b) 64 (dezimal), 01000000 (binär)
- c) 97 (dezimal), 01100001 (binär)
- d) 1 (dezimal), 00000001 (binär)

**A2.** Wie wird im RGB-Modell ein reines Rot gespeichert (je Kanal 8 Bit)?
- a) 00000000 11111111 00000000
- b) 11111111 00000000 00000000
- c) 11111111 11111111 11111111
- d) 00000000 00000000 11111111

**A3.** Was beschreibt den Unterschied zwischen *Syntax* und *Semantik*?
- a) Syntax ist die Bedeutung des Codes, Semantik sind die Grammatikregeln.
- b) Syntax sind die Grammatikregeln der Sprache, Semantik ist die Bedeutung. Ein semantischer Fehler heißt Bug.
- c) Beides bedeutet dasselbe.
- d) Semantik betrifft nur Kommentare.

**A4.** Welche Aussage über Compiler und Interpreter ist laut Skript richtig?
- a) Interpretierte Programme sind in der Regel schneller als kompilierte.
- b) Bei kompilierten Programmen werden Fehler erst zur Laufzeit gefunden.
- c) Kompilierter Code ist meist schneller, Fehler werden schon zur Compile-Zeit erkannt.
- d) Java verwendet ausschließlich Interpretation.

**A5.** Was erzeugt der Befehl `javac HelloWorld.java`?
- a) Eine Datei `HelloWorld.exe`
- b) Eine Datei `HelloWorld.class` mit Bytecode
- c) Eine Datei `HelloWorld.txt`
- d) Nichts, er startet das Programm direkt

**A6.** Wie wird ein Java-Programm nach dem Kompilieren gestartet?
- a) `javac HelloWorld`
- b) `java HelloWorld.java`
- c) `java HelloWorld`
- d) `run HelloWorld.class`

**A7.** Was ist die Aufgabe der JVM?
- a) Quellcode in Bytecode übersetzen
- b) Bytecode plattformunabhängig ausführen (interpretieren und per JIT-Compiler übersetzen)
- c) Syntaxfehler im Editor markieren
- d) Pakete auf der Festplatte organisieren

**A8.** Welche vier Techniken gehören zum *Computational Thinking*?
- a) Decomposition, Pattern Recognition, Abstraction, Algorithms
- b) Compilation, Interpretation, Execution, Debugging
- c) Input, Output, Storage, Processing
- d) Syntax, Semantik, Pragmatik, Grammatik

**A9.** Welche Aussage zur Struktur eines Java-Programms ist richtig?
- a) Der Klassenname muss dem Dateinamen entsprechen (`HelloWorld` in `HelloWorld.java`).
- b) Java unterscheidet nicht zwischen Groß- und Kleinschreibung.
- c) Jede Zeile muss mit einem Doppelpunkt enden.
- d) Die `main`-Methode ist optional, wenn man das Programm eigenständig ausführen will.

**A10.** Welche Namenskonvention ist laut Skript korrekt?
- a) Klasse `circleArea`, Methode `CircleArea`
- b) Klasse `CircleArea`, Methode `circleArea`, Konstante `PI`
- c) Klasse `circle_area`, Konstante `pi`
- d) Alles in Großbuchstaben

**A11.** Welche Signatur hat die Einstiegsmethode einer Java-Anwendung?
- a) `public void main(String args)`
- b) `static public main(String[] args)`
- c) `public static void main(String[] args)`
- d) `public static int main()`

### Skript 02 – Datentypen, Operatoren, Verzweigungen

**A12.** Welcher Typ hat den größten Wertebereich?
- a) `int`
- b) `short`
- c) `long`
- d) `byte`

**A13.** Wie viele Bit belegt ein `int` und ein `char` in Java?
- a) `int` 16 Bit, `char` 8 Bit
- b) `int` 32 Bit, `char` 16 Bit
- c) `int` 32 Bit, `char` 8 Bit
- d) `int` 64 Bit, `char` 16 Bit

**A14.** Welcher Bezeichner ist in Java **ungültig**?
- a) `_total`
- b) `value2`
- c) `2ndValue`
- d) `myCounter`

**A15.** Warum ist `int class = 5;` ungültig?
- a) Weil `class` ein reserviertes Schlüsselwort ist.
- b) Weil Variablennamen mindestens 6 Zeichen haben müssen.
- c) Weil `int` nur für negative Zahlen gilt.
- d) Weil `class` groß geschrieben werden muss.

**A16.** Was bedeutet „Java ist statisch typisiert“?
- a) Variablen können ihren Typ zur Laufzeit beliebig wechseln.
- b) Jede Variable und jeder Ausdruck hat schon zur Compile-Zeit einen festen Typ.
- c) Es gibt keine Variablen, nur Konstanten.
- d) Es gibt nur Zahlentypen.

**A17.** Welche Zeile kompiliert **nicht**?
- a) `long big = 3456789L;`
- b) `float f = 32.5f;`
- c) `float g = 32.5;`
- d) `double d = 3456.98;`

**A18.** Welche Zuweisung ist ohne explizites Casting erlaubt?
- a) `int y = someByte;`
- b) `byte b = someInt;`
- c) `int i = 3.5;`
- d) `short s = someLong;`

**A19.** Wie definiert man eine Konstante korrekt?
- a) `const int MAX = 10;`
- b) `final int MAX = 10;`
- c) `static int max = 10;`
- d) `constant int MAX = 10;`

**A20.** Was ist der Wert von `int z = 4 + 2 / 3 - 1;`?
- a) 3
- b) 3.67
- c) 1
- d) 4

**A21.** Was gibt `System.out.println(7 % 2);` aus?
- a) 3
- b) 3.5
- c) 1
- d) 0

**A22.** Was ist der Unterschied zwischen `print` und `println`?
- a) `println` gibt nichts aus.
- b) `println` hängt am Ende einen Zeilenumbruch an, `print` nicht.
- c) `print` kann nur Strings ausgeben.
- d) Es gibt keinen Unterschied.

**A23.** Wie vergleicht man zwei Strings auf gleichen Inhalt richtig?
- a) `a == b`
- b) `a = b`
- c) `a.equals(b)`
- d) `a.same(b)`

**A24.** Was ist in einem `switch` erlaubt?
- a) `case x > 5:`
- b) `case 5:` bei einem `int`-Ausdruck
- c) `case 1.5:` bei einem `double`-Ausdruck
- d) `case x && y:`

**A25.** Was passiert, wenn in einem `switch` das `break` fehlt?
- a) Compilerfehler
- b) Die folgenden `case`-Zweige werden weiter ausgeführt (Fall-through).
- c) Das Programm bricht ab.
- d) Es wird automatisch nur der erste Zweig ausgeführt.

**A26.** Wozu dient `Scanner scanner = new Scanner(System.in);`, und was muss importiert werden?
- a) Zum Lesen der Tastatureingabe; `import java.util.Scanner;`
- b) Zum Schreiben auf die Konsole; `import java.io.Print;`
- c) Zum Vergleichen von Strings; kein Import nötig
- d) Zum Kompilieren; `import java.lang.Compiler;`

**A27.** Was ergibt `String r = (grade >= 50) ? "Pass" : "Fail";` bei `grade = 49`?
- a) `"Pass"`
- b) `"Fail"`
- c) Compilerfehler
- d) `null`

### Skript 03 – Schleifen

**A28.** Welche Schleife wird **mindestens einmal** ausgeführt?
- a) `while`
- b) `for`
- c) `do-while`
- d) keine

**A29.** Welche Schleife ist eine Endlosschleife?
- a) `for (int i = 0; i < 5; i++) { }`
- b) `int i = 0; while (i < 5) { i++; }`
- c) `int i = 0; while (i < 5) { }`
- d) `do { } while (false);`

**A30.** Was macht `continue` innerhalb einer Schleife?
- a) Beendet die gesamte Schleife.
- b) Überspringt den Rest des aktuellen Durchlaufs und springt zum nächsten.
- c) Beendet das Programm.
- d) Startet die Schleife von Anfang an neu mit Zähler 0.

**A31.** In einer verschachtelten Schleife wird `break` ausgeführt. Was passiert?
- a) Alle Schleifen werden beendet.
- b) Nur die innerste Schleife wird beendet.
- c) Nur die äußerste Schleife wird beendet.
- d) Compilerfehler

**A32.** Welche Schleife ist typisch für **Datenvalidierung** („Eingabe wiederholen, bis sie gültig ist“)?
- a) `do-while`
- b) `switch`
- c) `if-else`
- d) `final`

**A33.** Wie oft wird „Hi“ ausgegeben?
```java
for (int i = 0; i < 10; i += 3) {
    System.out.println("Hi");
}
```
- a) 3
- b) 4
- c) 10
- d) 9

**A34.** Terminiert diese Schleife?
```java
int i = 1;
while (i != 50) { i = i + 2; }
```
- a) Ja, nach 25 Durchläufen
- b) Ja, nach 50 Durchläufen
- c) Nein, `i` wird nie 50 (immer ungerade)
- d) Compilerfehler

### Skript 04 – Methoden

**A35.** Was bedeutet `void` als Rückgabetyp?
- a) Die Methode gibt 0 zurück.
- b) Die Methode gibt keinen Wert zurück.
- c) Die Methode darf keine Parameter haben.
- d) Die Methode ist privat.

**A36.** Warum verwendet man Methoden? (Mehrfachauswahl, **zwei** richtige)
- a) Wiederverwendbarkeit (DRY)
- b) Um Variablen global zu machen
- c) Bessere Wartbarkeit und Lesbarkeit
- d) Damit der Code langsamer wird

**A37.** Was bedeutet *pass-by-value* bei primitiven Typen?
- a) Die Methode ändert direkt die Variable des Aufrufers.
- b) Der Wert des Arguments wird kopiert; Änderungen am Parameter wirken nicht auf die Variable des Aufrufers.
- c) Nur Strings können übergeben werden.
- d) Die Variable wird gelöscht.

**A38.** Wo ist eine in `greet()` deklarierte lokale Variable `y` sichtbar?
- a) In allen Methoden der Klasse
- b) Nur innerhalb von `greet()`
- c) Nur in `main`
- d) In allen Klassen des Pakets

**A39.** Welche Methodendeklaration ist **fehlerhaft**?
- a) `public static int sum(int a, int b) { return a + b; }`
- b) `public static void show(String s) { System.out.println(s); }`
- c) `public static int half(int a) { return a / 2.0; }`
- d) `public static boolean isEven(int n) { return n % 2 == 0; }`

**A40.** Was bewirkt der Modifier `private`?
- a) Die Methode ist überall sichtbar.
- b) Die Methode ist nur innerhalb der deklarierenden Klasse nutzbar.
- c) Die Methode ist nur im selben Paket sichtbar.
- d) Die Methode ist eine Konstante.

**A41.** Was bedeutet `static` bei einer Methode?
- a) Die Methode gehört zur Klasse und kann über den Klassennamen aufgerufen werden.
- b) Die Methode kann ihren Wert nicht ändern.
- c) Die Methode ist immer `void`.
- d) Die Methode ist nur im Paket sichtbar.

**A42.** Was passiert beim Erreichen eines `return`-Statements?
- a) Die Methode läuft weiter, der Wert wird gemerkt.
- b) Die Ausführung der Methode endet sofort und der Wert geht an den Aufrufer.
- c) Das Programm endet.
- d) Die Methode wird ein zweites Mal ausgeführt.

---

## Teil B – Code lesen: Was wird ausgegeben?

**B1.**
```java
int gross = 234;
final int TAXRATE = 20;
System.out.println(gross * (1 - TAXRATE / 100));
```

**B2.**
```java
System.out.println(1 + 2 + "3" + 4 + 5);
```

**B3.**
```java
System.out.println('A' + 1);
System.out.println((char) ('A' + 1));
```

**B4.**
```java
int x = 5;
int y = x++ + ++x;
System.out.println(y + " " + x);
```

**B5.**
```java
int i = 10;
i += 5;
i -= 3;
i *= 2;
System.out.println(i);
```

**B6.**
```java
double d = 10 / 4;
System.out.println(d);
System.out.println((int) 3.99 + " " + (int) -3.99);
```

**B7.**
```java
int sw = 2;
switch (sw) {
    case 1: System.out.print("A");
    case 2: System.out.print("B");
    case 3: System.out.print("C"); break;
    default: System.out.print("D");
}
```

**B8.**
```java
for (int p = 0; p < 10; p++) {
    if (p % 2 == 0) continue;
    if (p > 7) break;
    System.out.print(p + " ");
}
```

**B9.**
```java
int s = 0;
for (int p = 1; p <= 3; p++) {
    for (int q = 1; q <= p; q++) {
        s++;
    }
}
System.out.println(s);
```

**B10.**
```java
int c = 0;
do { c++; } while (c < 0);
System.out.println(c);
```

**B11.**
```java
public static int f(int x) {
    x++;
    return x * 2;
}
public static void main(String[] args) {
    int v = 3;
    System.out.println(f(v));
    System.out.println(v);
}
```

**B12.**
```java
boolean bb = 5 > 3 && 2 > 4 || true;
System.out.println(bb);
```

**B13.**
```java
System.out.println(Integer.MAX_VALUE + 1);
```

**B14.**
```java
byte b = (byte) 130;
System.out.println(b);
```

**B15. Fehlersuche:** Warum kompiliert bzw. funktioniert das nicht? Nenne jeweils den Fehler.
```java
// a)
byte b = 24;
int x = 24;
byte c = x;

// b)
public static void main(String[] args) {
    int x = 10;
    show();
}
public static void show() {
    System.out.println(x);
}

// c)
String a = new String("hi");
String b = new String("hi");
if (a == b) { System.out.println("gleich"); }   // läuft, gibt aber nichts aus: warum?

// d)
int count = 0;
while (count < 5) {
    System.out.println("*");
}
```

---

## Teil C – Code schreiben

**C1. Gerade/ungerade.** Schreibe eine Methode `public static boolean isEven(int number)`, die `true` zurückgibt, wenn die Zahl gerade ist. Gib in `main` für 7 und 12 aus, ob sie gerade sind.

**C2. Maximum von drei Zahlen.** Schreibe `public static int max3(int a, int b, int c)` ohne `Math.max`.

**C3. Notenbewertung.** Lies Punkte (0–40) ein, berechne den Prozentsatz und gib aus:
≥ 90 „Excellent“, ≥ 75 „Good job“, ≥ 60 „Passed“, sonst „Needs improvement“. (Achtung auf Ganzzahldivision!)

**C4. Countdown.** Lies eine Startzahl ein und gib `n n-1 … 0` aus. Beispiel: Eingabe 5 → `5 4 3 2 1 0`.

**C5. Fakultät.** Schreibe `public static int factorial(int n)` mit einer Schleife. Beispiel: `factorial(4)` → 24.

**C6. Passwort mit drei Versuchen.** Der Benutzer hat höchstens 3 Versuche. Bei korrekter Eingabe: „Access granted“, sonst nach 3 Fehlversuchen: „Access denied“. Verwende eine Schleife und `equals`.

**C7. Umgekehrte Treppe.** Lies `n` ein und gib `n` Zeilen aus. Beispiel `n = 4`:
```
****
***
**
*
```

**C8. Ziffern zählen.** Lies eine positive ganze Zahl ein und gib aus, wie viele Ziffern sie hat. Beispiel: 12345 → `5 digits`.

**C9. Eingabe validieren.** Lies mit einer `do-while`-Schleife so lange eine Zahl ein, bis sie positiv ist. Gib sie dann aus.

**C10. Summe von … bis ….** Schreibe `public static int sumOfNumbers(int start, int end)`, das die Summe aller ganzen Zahlen von `start` bis `end` (inklusive) liefert. Beispiel: `sumOfNumbers(2, 4)` → 9.

**C11. Hypotenuse.** Schreibe `public static double hypotenuse(double side1, double side2)` mit `Math.sqrt`. Beispiel: `hypotenuse(3, 4)` → 5.0.

**C12. Händeschütteln (Computational Thinking).** In Sillyville schütteln sich 50 Bürger jeweils genau einmal die Hand. Schreibe (a) Pseudocode und (b) eine Java-Methode `handshakes(int people)`, die die Anzahl berechnet. Nutze das Muster n·(n−1)/2.

**C13. Menü mit `switch`.** Lies in einer `do-while`-Schleife eine Auswahl (1 = Sales, 2 = Stock, 3 = Admin, 0 = Ende) ein. Gib für jede Auswahl eine Meldung aus, bei ungültiger Eingabe „invalid selection“, bei 0 „goodbye“.

---

# Lösungen

## Teil A

| Nr. | Antwort | Nr. | Antwort | Nr. | Antwort |
|---|---|---|---|---|---|
| A1 | a | A15 | a | A29 | c |
| A2 | b | A16 | b | A30 | b |
| A3 | b | A17 | c | A31 | b |
| A4 | c | A18 | a | A32 | a |
| A5 | b | A19 | b | A33 | b |
| A6 | c | A20 | a | A34 | c |
| A7 | b | A21 | c | A35 | b |
| A8 | a | A22 | b | A36 | a und c |
| A9 | a | A23 | c | A37 | b |
| A10 | b | A24 | b | A38 | b |
| A11 | c | A25 | b | A39 | c |
| A12 | c | A26 | a | A40 | b |
| A13 | b | A27 | b | A41 | a |
| A14 | c | A28 | c | A42 | b |

Kurzbegründungen zu den kniffligen Fragen:
- **A17:** `32.5` ist ein `double`-Literal, für `float` braucht man `f`.
- **A20:** `2 / 3` ist Ganzzahldivision = 0, also 4 + 0 − 1 = 3.
- **A28:** Bei `do-while` wird die Bedingung erst nach dem ersten Durchlauf geprüft.
- **A29:** In c) wird `i` nie verändert.
- **A33:** `i` = 0, 3, 6, 9 → 4 Durchläufe.
- **A34:** `i` startet bei 1 und steigt um 2, ist also immer ungerade und trifft 50 nie. Besser: `i < 50`.
- **A39:** `a / 2.0` ist ein `double`, der Rückgabetyp ist aber `int` (ohne Cast Compilerfehler).

## Teil B

| Nr. | Ausgabe | Erklärung |
|---|---|---|
| B1 | `234` | `20/100` = 0 (Ganzzahldivision), also `234 * 1`. |
| B2 | `3345` | `1+2` = 3, dann Stringverkettung: `"3"+"3"+"4"+"5"`. |
| B3 | `66` und `B` | `'A'` ist 65, `char + int` ergibt `int`. Mit Cast `(char)` kommt `B`. |
| B4 | `12 7` | `x++` liefert 5 (x wird 6), `++x` liefert 7 (x wird 7), also 5 + 7 = 12. |
| B5 | `24` | 10 → 15 → 12 → 24. |
| B6 | `2.0` und `3 -3` | `10/4` ist erst 2 (int), dann zu 2.0. Cast schneidet Nachkommastellen ab. |
| B7 | `BC` | Fall-through von `case 2` nach `case 3`, dort `break`. |
| B8 | `1 3 5 7 ` | Gerade werden übersprungen, bei p = 9 ist `p > 7` und die Schleife bricht ab. |
| B9 | `6` | 1 + 2 + 3 Durchläufe der inneren Schleife. |
| B10 | `1` | `do-while` läuft mindestens einmal. |
| B11 | `8` und `3` | `f` bekommt eine Kopie: (3+1)·2 = 8. `v` bleibt 3 (pass-by-value). |
| B12 | `true` | `&&` bindet stärker als `||`: `(true && false) || true`. |
| B13 | `-2147483648` | Überlauf, der Wert springt zum kleinsten `int`. |
| B14 | `-126` | 130 passt nicht in ein `byte` (−128…127), Überlauf: 130 − 256 = −126. |
| B15a | | `int` in `byte` braucht expliziten Cast: `byte c = (byte) x;` (auch wenn der Wert 24 passen würde, prüft der Compiler nur den Typ). |
| B15b | | `x` ist lokal in `main` und in `show()` nicht sichtbar (Function Scope). `x` als Parameter übergeben. |
| B15c | | `==` vergleicht bei Strings Referenzen, nicht Inhalte. Richtig: `a.equals(b)`. |
| B15d | | Endlosschleife: `count` wird nie erhöht (`count++;` fehlt). |

## Teil C – Musterlösungen

**C1**
```java
public static boolean isEven(int number) {
    return number % 2 == 0;
}

public static void main(String[] args) {
    System.out.println(isEven(7));   // false
    System.out.println(isEven(12));  // true
}
```

**C2**
```java
public static int max3(int a, int b, int c) {
    int max = a;
    if (b > max) {
        max = b;
    }
    if (c > max) {
        max = c;
    }
    return max;
}
```

**C3**
```java
import java.util.Scanner;

public class Grade {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome!");
        System.out.println("Enter your name:");
        String name = scanner.next();
        System.out.println("Enter your exam points (0-40):");
        int points = scanner.nextInt();

        if (points % 2 == 0) {
            System.out.println(points + " is even");
        } else {
            System.out.println(points + " is odd");
        }

        double percentage = points / 40.0 * 100;   // 40.0, sonst Ganzzahldivision!
        System.out.println(name + ", you achieved " + percentage + "%");

        if (percentage >= 90) {
            System.out.println("Excellent");
        } else if (percentage >= 75) {
            System.out.println("Good job");
        } else if (percentage >= 60) {
            System.out.println("Passed");
        } else {
            System.out.println("Needs improvement");
        }
    }
}
```

**C4**
```java
Scanner scanner = new Scanner(System.in);
int n = scanner.nextInt();
while (n >= 0) {
    System.out.print(n + " ");
    n--;
}
```

**C5**
```java
public static int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result = result * i;
    }
    return result;   // factorial(4) = 24, factorial(0) = 1
}
```

**C6**
```java
Scanner scanner = new Scanner(System.in);
final String PASSWORD = "secret";
int attempts = 0;
boolean granted = false;

while (attempts < 3 && !granted) {
    System.out.println("Enter password:");
    String input = scanner.next();
    if (input.equals(PASSWORD)) {
        granted = true;
    }
    attempts++;
}

if (granted) {
    System.out.println("Access granted");
} else {
    System.out.println("Access denied");
}
```

**C7**
```java
Scanner scanner = new Scanner(System.in);
int n = scanner.nextInt();
for (int row = n; row >= 1; row--) {
    for (int j = 0; j < row; j++) {
        System.out.print("*");
    }
    System.out.println();
}
```

**C8**
```java
Scanner scanner = new Scanner(System.in);
int number = scanner.nextInt();
int digits = 0;
if (number == 0) {
    digits = 1;
}
while (number > 0) {
    number = number / 10;
    digits++;
}
System.out.println(digits + " digits");
```

**C9**
```java
Scanner scanner = new Scanner(System.in);
int value;
do {
    System.out.println("Enter a positive value:");
    value = scanner.nextInt();
} while (value <= 0);
System.out.println("Your value: " + value);
```

**C10**
```java
public static int sumOfNumbers(int start, int end) {
    int sum = 0;
    for (int i = start; i <= end; i++) {
        sum = sum + i;
    }
    return sum;   // sumOfNumbers(2, 4) = 2 + 3 + 4 = 9
}
```

**C11**
```java
public static double hypotenuse(double side1, double side2) {
    return Math.sqrt(side1 * side1 + side2 * side2);
}
```

**C12**
Pseudocode:
```
INPUT people
STORE people * (people - 1) / 2 in handshakes
OUTPUT 'Number of handshakes: ' + handshakes
```
Java:
```java
public static int handshakes(int people) {
    return people * (people - 1) / 2;   // handshakes(50) = 1225
}
```
Begründung: Jede der n Personen schüttelt n−1 Händen, dabei wird jedes Paar doppelt gezählt, daher durch 2. Man kann auch mit einer Schleife summieren: Person 1 schüttelt 49, Person 2 noch 48, … (Gauß-Trick, siehe Skript 01).

**C13**
```java
Scanner scanner = new Scanner(System.in);
int selection;
do {
    System.out.println("1 - sales");
    System.out.println("2 - stock");
    System.out.println("3 - admin");
    System.out.println("Select (0 to exit):");
    selection = scanner.nextInt();

    switch (selection) {
        case 1:
            System.out.println("sales things");
            break;
        case 2:
            System.out.println("stock things");
            break;
        case 3:
            System.out.println("admin things");
            break;
        case 0:
            break;
        default:
            System.out.println("invalid selection");
    }
} while (selection != 0);
System.out.println("goodbye");
```

# Java CheatSheet

## 1. Grundgerüst

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Welt");
    }
}
```

```bash
javac Main.java      # kompilieren
java Main            # ausführen
java Main.java       # Single-File direkt starten (ab Java 11)
```

## 2. Datentypen

| Typ | Größe | Beispiel |
|---|---|---|
| `byte` | 8 Bit | `byte b = 10;` |
| `short` | 16 Bit | `short s = 1000;` |
| `int` | 32 Bit | `int i = 42;` |
| `long` | 64 Bit | `long l = 10_000L;` |
| `float` | 32 Bit | `float f = 1.5f;` |
| `double` | 64 Bit | `double d = 3.14;` |
| `char` | 16 Bit | `char c = 'A';` |
| `boolean` | 1 Bit | `true` / `false` |

Wrapper: `Integer`, `Long`, `Double`, `Boolean`, `Character` … (Autoboxing)

```java
var x = 10;                       // Typinferenz (ab Java 10)
int n = (int) 3.9;                // Cast -> 3
int p = Integer.parseInt("42");
String s = String.valueOf(42);
```

## 3. Operatoren

```java
+ - * / %          // Arithmetik (int-Division: 7 / 2 == 3)
++ --  += -= *= /=
== != < > <= >=
&& || !            // logisch (Short-Circuit)
& | ^ ~ << >> >>>  // bitweise
cond ? a : b       // ternär
obj instanceof Foo f   // Pattern Matching
```

## 4. Kontrollstrukturen

```java
if (x > 0) { } else if (x == 0) { } else { }

for (int i = 0; i < 10; i++) { }
for (String s : list) { }          // for-each
while (cond) { }
do { } while (cond);
break; continue;

// switch-Expression (ab Java 14)
String name = switch (day) {
    case 1, 7 -> "Wochenende";
    case 2, 3, 4, 5, 6 -> "Werktag";
    default -> "?";
};
```

## 5. Strings

```java
String s = "Hallo";
s.length();  s.charAt(0);  s.substring(1, 3);
s.indexOf("l");  s.contains("al");  s.replace("a", "e");
s.toUpperCase();  s.toLowerCase();  s.trim();  s.strip();
s.split(",");  s.isEmpty();  s.isBlank();
s.equals("x");  s.equalsIgnoreCase("X");  s.compareTo("x");
String.join(", ", list);
"a".repeat(3);
String.format("%s ist %d Jahre, %.2f m", name, age, h);

// Textblock (ab Java 15)
String json = """
    { "a": 1 }
    """;

StringBuilder sb = new StringBuilder();
sb.append("a").append(1).reverse().toString();
```

> Strings **immer** mit `equals()` vergleichen, nie mit `==`.

## 6. Arrays

```java
int[] a = new int[5];
int[] b = {1, 2, 3};
int[][] m = new int[3][3];
a.length;

Arrays.sort(b);
Arrays.toString(b);
Arrays.fill(a, 0);
Arrays.copyOf(b, 10);
Arrays.asList(1, 2, 3);
Arrays.stream(b).sum();
```

## 7. Klassen & OOP

```java
public class Person {
    private String name;
    private int age;
    private static int count = 0;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        count++;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @Override
    public String toString() { return name + " (" + age + ")"; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person p)) return false;
        return age == p.age && Objects.equals(name, p.name);
    }

    @Override
    public int hashCode() { return Objects.hash(name, age); }
}
```

### Vererbung, Interface, abstract

```java
public class Student extends Person implements Lernbar {
    public Student(String n, int a) { super(n, a); }
    @Override public void lernen() { }
}

interface Lernbar {
    void lernen();
    default void pause() { }        // default-Methode
    static void hilfe() { }
}

abstract class Tier {
    abstract void laut();
}
```

### Zugriffsmodifizierer

| Modifier | Klasse | Package | Subklasse | Überall |
|---|---|---|---|---|
| `private` | ✔ | | | |
| *(default)* | ✔ | ✔ | | |
| `protected` | ✔ | ✔ | ✔ | |
| `public` | ✔ | ✔ | ✔ | ✔ |

`final` = nicht änderbar / nicht vererbbar / nicht überschreibbar · `static` = gehört zur Klasse

### Enum, Record, sealed

```java
enum Farbe { ROT, GRUEN, BLAU }
Farbe.valueOf("ROT");  Farbe.values();

record Punkt(int x, int y) { }        // ab Java 16, immutable
Punkt p = new Punkt(1, 2);  p.x();

sealed interface Form permits Kreis, Rechteck { }
```

## 8. Collections

```java
// List
List<String> list = new ArrayList<>();
list.add("a"); list.get(0); list.set(0, "b");
list.remove(0); list.size(); list.contains("a");
List<Integer> imm = List.of(1, 2, 3);   // unveränderlich

// Set (keine Duplikate)
Set<String> set = new HashSet<>();      // LinkedHashSet (Reihenfolge), TreeSet (sortiert)

// Map
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.get("a");
map.getOrDefault("x", 0);
map.putIfAbsent("b", 2);
map.merge("a", 1, Integer::sum);
map.containsKey("a");
for (var e : map.entrySet()) { e.getKey(); e.getValue(); }

// Queue / Deque / Stack
Queue<Integer> q = new LinkedList<>();  q.offer(1); q.poll(); q.peek();
Deque<Integer> st = new ArrayDeque<>(); st.push(1); st.pop(); st.peek();
PriorityQueue<Integer> pq = new PriorityQueue<>();

Collections.sort(list);
Collections.reverse(list);
Collections.max(list);
list.sort(Comparator.comparing(Person::getName).thenComparing(Person::getAge));
```

| Struktur | Zugriff | Einfügen | Hinweis |
|---|---|---|---|
| `ArrayList` | O(1) | O(n) | Standard-Liste |
| `LinkedList` | O(n) | O(1) | Queue/Deque |
| `HashMap/HashSet` | O(1) | O(1) | unsortiert |
| `TreeMap/TreeSet` | O(log n) | O(log n) | sortiert |

## 9. Generics

```java
class Box<T> {
    private T inhalt;
    public T get() { return inhalt; }
}

static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

List<? extends Number> l1;   // lesen
List<? super Integer> l2;    // schreiben
```

## 10. Lambdas & Streams

```java
Runnable r = () -> System.out.println("hi");
Function<Integer, Integer> sq = x -> x * x;
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
Predicate<String> leer = String::isEmpty;
Consumer<String> out = System.out::println;
Supplier<Double> rnd = Math::random;

List<String> result = list.stream()
    .filter(s -> s.length() > 2)
    .map(String::toUpperCase)
    .sorted()
    .distinct()
    .limit(10)
    .collect(Collectors.toList());     // oder .toList() (ab Java 16)

int sum = nums.stream().mapToInt(Integer::intValue).sum();
Optional<Integer> max = nums.stream().max(Integer::compare);
boolean any = list.stream().anyMatch(s -> s.startsWith("a"));
Map<Integer, List<String>> gr = list.stream()
    .collect(Collectors.groupingBy(String::length));
String joined = list.stream().collect(Collectors.joining(", "));
IntStream.range(0, 5).forEach(System.out::println);
```

## 11. Optional

```java
Optional<String> o = Optional.of("x");   // ofNullable(...) / empty()
o.isPresent();  o.isEmpty();
o.orElse("default");
o.orElseGet(() -> "x");
o.orElseThrow();
o.map(String::length);
o.ifPresent(System.out::println);
```

## 12. Exceptions

```java
try {
    int x = Integer.parseInt("abc");
} catch (NumberFormatException | NullPointerException e) {
    e.printStackTrace();
} finally {
    // immer
}

// try-with-resources (schließt automatisch)
try (BufferedReader br = new BufferedReader(new FileReader("f.txt"))) {
    br.readLine();
} catch (IOException e) { }

throw new IllegalArgumentException("Ungültig");

class MeineException extends Exception {
    MeineException(String msg) { super(msg); }
}
void foo() throws MeineException { }
```

- **Checked**: `IOException`, `SQLException` (müssen behandelt werden)
- **Unchecked**: `RuntimeException`, `NullPointerException`, `IllegalArgumentException`

## 13. Dateien & I/O (NIO)

```java
Path p = Path.of("datei.txt");
String text = Files.readString(p);
List<String> lines = Files.readAllLines(p);
Files.writeString(p, "Inhalt");
Files.write(p, lines, StandardOpenOption.APPEND);
Files.exists(p);  Files.delete(p);
try (Stream<String> s = Files.lines(p)) { }

Scanner sc = new Scanner(System.in);
String line = sc.nextLine();  int n = sc.nextInt();
```

## 14. Nebenläufigkeit

```java
Thread t = new Thread(() -> System.out.println("Thread"));
t.start();  t.join();

ExecutorService ex = Executors.newFixedThreadPool(4);
Future<Integer> f = ex.submit(() -> 42);
f.get();
ex.shutdown();

CompletableFuture.supplyAsync(() -> "a")
    .thenApply(String::toUpperCase)
    .thenAccept(System.out::println);

synchronized (lock) { }
AtomicInteger ai = new AtomicInteger();  ai.incrementAndGet();
ConcurrentHashMap<String, Integer> chm = new ConcurrentHashMap<>();

// Virtual Threads (ab Java 21)
Thread.startVirtualThread(() -> { });
```

## 15. Datum & Zeit

```java
LocalDate d = LocalDate.now();
LocalDateTime dt = LocalDateTime.of(2025, 1, 31, 12, 0);
d.plusDays(5);  d.getDayOfWeek();
ChronoUnit.DAYS.between(d1, d2);
Duration.ofMinutes(90);
d.format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
LocalDate.parse("2025-01-31");
```

## 16. Math & Utilities

```java
Math.max(a, b); Math.min(a, b); Math.abs(x);
Math.pow(2, 3); Math.sqrt(9); Math.round(2.5);
Math.floor(2.7); Math.ceil(2.1);
new Random().nextInt(100);
ThreadLocalRandom.current().nextInt(1, 7);
Objects.equals(a, b); Objects.requireNonNull(x);
System.currentTimeMillis(); System.nanoTime();
```

## 17. Annotationen

`@Override` · `@Deprecated` · `@FunctionalInterface` · `@SuppressWarnings("unchecked")` · `@SafeVarargs`

## 18. Nützliche Patterns

```java
// Singleton
public enum Singleton { INSTANCE; }

// Builder
Person p = new Person.Builder().name("A").age(3).build();

// Varargs
static int sum(int... n) { return Arrays.stream(n).sum(); }

// Pattern Matching für switch (ab Java 21)
String s = switch (obj) {
    case Integer i when i > 10 -> "große Zahl";
    case Integer i -> "Zahl";
    case String str -> "Text " + str;
    case null -> "null";
    default -> "anderes";
};
```

## 19. Maven / Gradle Kurzbefehle

```bash
mvn clean install        mvn test        mvn package
mvn dependency:tree
gradle build             gradle test     gradle run
```

## 20. Best Practices

- Felder `private`, Zugriff über Getter/Setter oder `record`
- Immutability bevorzugen (`final`, `List.of`, `record`)
- `equals()` und `hashCode()` immer gemeinsam überschreiben
- Interfaces als Typ verwenden: `List<String> l = new ArrayList<>()`
- try-with-resources für alles `AutoCloseable`
- Keine leeren `catch`-Blöcke
- `Optional` als Rückgabetyp statt `null`
- Aussagekräftige Namen: Klassen `PascalCase`, Methoden/Variablen `camelCase`, Konstanten `UPPER_SNAKE_CASE`

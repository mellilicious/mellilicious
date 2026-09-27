/**
 * Typische Stolperfallen zum Selbst-Ausprobieren.
 */
public class Pitfalls {
    public static void main(String[] args) {
        // 1. Ganzzahldivision
        System.out.println(7 / 2);        // 3   (int / int -> int, Rest wird abgeschnitten)
        System.out.println(7 / 2.0);      // 3.5 (sobald ein double beteiligt ist -> double)
        System.out.println(7 % 2);        // 1   (Rest)

        int z = 4 + 2 / 3 - 1;            // 2/3 ist 0 -> 4 + 0 - 1
        System.out.println("z = " + z);   // 3

        final int TAXRATE = 20;
        int gross = 234;
        double netWrong = gross * (1 - TAXRATE / 100);    // 20/100 = 0 -> 234 * 1
        double netRight = gross * (1 - TAXRATE / 100.0);  // 0.2       -> 234 * 0.8
        System.out.println("net wrong = " + netWrong + ", net right = " + netRight);

        // 2. Strings mit + : Reihenfolge zählt (von links nach rechts)
        System.out.println("Sum: " + 1 + 2);    // Sum: 12
        System.out.println("Sum: " + (1 + 2));  // Sum: 3
        System.out.println(1 + 2 + " is the sum"); // 3 is the sum

        // 3. Casting
        double d = 9.99;
        int cut = (int) d;                // Nachkommastellen werden abgeschnitten, NICHT gerundet
        System.out.println("(int) 9.99 = " + cut);
        long rounded = Math.round(d);     // runden
        System.out.println("Math.round(9.99) = " + rounded);

        // 4. Strings vergleichen
        String a = "hello";
        String b = new String("hello");
        System.out.println("a == b      -> " + (a == b));      // false (verschiedene Objekte)
        System.out.println("a.equals(b) -> " + a.equals(b));   // true  (gleicher Inhalt)

        // 5. i++ vs ++i
        int i = 5;
        int post = i++;   // post = 5, danach i = 6
        int pre = ++i;    // i = 7, danach pre = 7
        System.out.println("post=" + post + " pre=" + pre + " i=" + i);

        // 6. Ternärer Operator
        int grade = 55;
        String result = (grade >= 50) ? "Pass" : "Fail";
        System.out.println(result);
    }
}

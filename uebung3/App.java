import java.util.Random;
import java.util.Scanner;

public class App {

    // ---------------------------------------------------------------
    // Aufgabe 1: One Month Calendar
    // ---------------------------------------------------------------
    public static void oneMonthCalendar(int days, int firstDay) {
        // Spalte, in der wir gerade stehen (0 = Montag ... 6 = Sonntag)
        int column = firstDay - 1;

        // Leere "Kästchen" vor dem ersten Tag: jedes ist 3 Zeichen breit ("%2d " -> 2 Ziffern + Leerzeichen)
        for (int i = 0; i < column; i++) {
            System.out.print("   ");
        }

        for (int day = 1; day <= days; day++) {
            System.out.printf("%2d ", day);
            column++;
            if (column == 7) {          // Sonntag erreicht -> neue Woche = neue Zeile
                System.out.println();
                column = 0;
            }
        }
        System.out.println();           // abschließender Zeilenumbruch / Leerzeile
    }

    // ---------------------------------------------------------------
    // Aufgabe 2: Pseudo Random Numbers (linearer Kongruenzgenerator)
    // ---------------------------------------------------------------
    public static long[] lcg(long seed) {
        final long m = 2147483648L;     // 2^31 -> passt NICHT mehr in int, daher long
        final long a = 1103515245L;
        final long c = 12345L;

        long[] numbers = new long[10];
        long x = seed;                  // X0
        for (int i = 0; i < numbers.length; i++) {
            x = (a * x + c) % m;        // X(i+1) = (a * Xi + c) mod m
            numbers[i] = x;
        }
        return numbers;
    }

    // ---------------------------------------------------------------
    // Aufgabe 3: Guessing Game
    // ---------------------------------------------------------------
    public static void guessingGame(int numberToGuess) {
        Scanner scanner = new Scanner(System.in);
        boolean won = false;

        for (int attempt = 1; attempt <= 10; attempt++) {
            System.out.print("Guess number " + attempt + ": ");
            int guess = scanner.nextInt();

            if (guess == numberToGuess) {
                System.out.println("You won wisenheimer!");
                won = true;
                break;                  // Schleife sofort beenden
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
        return random.nextInt(100) + 1; // nextInt(100) liefert 0..99 -> +1 ergibt 1..100
    }

    // ---------------------------------------------------------------
    // Aufgabe 4: Swap Arrays
    // ---------------------------------------------------------------
    public static boolean swapArrays(int[] array1, int[] array2) {
        if (array1.length != array2.length) {
            return false;
        }
        for (int i = 0; i < array1.length; i++) {
            int temp = array1[i];       // Dreieckstausch über Hilfsvariable
            array1[i] = array2[i];
            array2[i] = temp;
        }
        return true;
    }

    // ---------------------------------------------------------------
    // Aufgabe 5: CamelCase
    // ---------------------------------------------------------------
    public static String camelCase(String sentence) {
        char[] chars = sentence.toCharArray();
        StringBuilder result = new StringBuilder();
        boolean newWord = true;         // der erste Buchstabe beginnt ein Wort

        for (char ch : chars) {
            if (ch == ' ') {
                newWord = true;         // nächster Buchstabe startet ein neues Wort
            } else if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                if (newWord) {
                    if (ch >= 'a' && ch <= 'z') {
                        ch = (char) (ch - 'a' + 'A');   // klein -> groß
                    }
                    newWord = false;
                } else {
                    if (ch >= 'A' && ch <= 'Z') {
                        ch = (char) (ch - 'A' + 'a');   // groß -> klein
                    }
                }
                result.append(ch);
            }
            // alle anderen Zeichen (. , ' ? ! ...) werden einfach ignoriert
        }
        return result.toString();
    }

    // ---------------------------------------------------------------
    // Aufgabe 6: Check Digit (Modulo 11)
    // ---------------------------------------------------------------
    public static int checkDigit(int[] code) {
        int sum = 0;
        for (int i = 0; i < code.length; i++) {
            sum += code[i] * (i + 2);   // Gewicht = Position + 2
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

    // ---------------------------------------------------------------
    // main
    // ---------------------------------------------------------------
    public static void main(String[] args) {
        // Aufgabe 1
        oneMonthCalendar(31, 3);
        oneMonthCalendar(28, 1);

        // Aufgabe 2
        long[] randoms = lcg(0);
        for (long r : randoms) {
            System.out.println(r);
        }

        // Aufgabe 4
        int[] a1 = {1, 2, 3, 4, 5};
        int[] a2 = {100, 99, 60, 44, 2};
        System.out.println(swapArrays(a1, a2));
        System.out.println(java.util.Arrays.toString(a1) + " " + java.util.Arrays.toString(a2));

        // Aufgabe 5
        System.out.println(camelCase("my name isn't Alice"));
        System.out.println(camelCase("AnY noise annoYs an oYster but a noisY noise annoYs an oYster more."));

        // Aufgabe 6
        System.out.println(checkDigit(new int[]{3, 9, 1, 5, 8}));

        // Aufgabe 3 (zum Schluss, weil es Eingaben erwartet)
        guessingGame(randomNumberBetweenOneAndHundred());
    }
}

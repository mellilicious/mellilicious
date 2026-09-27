/**
 * Übungen aus Foliensatz 04 (Methoden) plus zwei Zusatzbeispiele.
 */
public class MethodExercises {

    /** Übung 1: gibt die Zahlen von 1 bis number untereinander aus. */
    public static void printUntilNumber(int number) {
        for (int i = 1; i <= number; i++) {
            System.out.println(i);
        }
    }

    /** Übung 2: Summe aller Zahlen von start bis end (beide inklusive). */
    public static int sumOfNumbers(int start, int end) {
        int sum = 0;
        for (int i = start; i <= end; i++) {
            sum += i;
        }
        return sum;
    }

    /** Liefert true, wenn number gerade ist. */
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }

    /** Hypotenuse eines rechtwinkeligen Dreiecks (Pythagoras). */
    public static double hypotenuse(double side1, double side2) {
        return Math.sqrt(side1 * side1 + side2 * side2);
    }

    public static void main(String[] args) {
        printUntilNumber(5);
        System.out.println("---");
        printUntilNumber(2);

        System.out.println("sumOfNumbers(2, 4) = " + sumOfNumbers(2, 4));
        System.out.println("sumOfNumbers(1, 200) = " + sumOfNumbers(1, 200));

        System.out.println("isEven(7) = " + isEven(7));
        System.out.println("hypotenuse(3, 4) = " + hypotenuse(3, 4));
    }
}

import java.util.Scanner;

/** Übung "Count Digits": Input 12345 -> 5 digits */
public class CountDigits {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Positive integer: ");
        int number = scanner.nextInt();

        int digits = 0;
        do {                    // do-while, damit auch die Zahl 0 als 1 Stelle zählt
            number = number / 10; // letzte Stelle "abschneiden" (Ganzzahldivision)
            digits++;
        } while (number > 0);

        System.out.println(digits + " digits");
    }
}

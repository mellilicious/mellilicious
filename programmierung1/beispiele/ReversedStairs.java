import java.util.Scanner;

/** Übung "Reversed Stairs": Input 4 -> ****, ***, **, * */
public class ReversedStairs {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("n: ");
        int n = scanner.nextInt();

        for (int row = n; row >= 1; row--) {        // äußere Schleife: Zeilen
            for (int star = 0; star < row; star++) { // innere Schleife: Sterne pro Zeile
                System.out.print("*");
            }
            System.out.println();                    // Zeilenumbruch nach jeder Zeile
        }
    }
}

import java.util.Scanner;

/** Übung "Factorial Calculator": Input 4 -> 4! = 24 */
public class Factorial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("n: ");
        int n = scanner.nextInt();

        long result = 1; // long, weil Fakultäten sehr schnell sehr groß werden
        for (int i = 2; i <= n; i++) {
            result = result * i;
        }
        System.out.println(n + "! = " + result);
    }
}

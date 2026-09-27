import java.util.Scanner;

/** Übung "Countdown": Input 5 -> Output 5 4 3 2 1 0 */
public class Countdown {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Start number: ");
        int start = scanner.nextInt();

        for (int i = start; i >= 0; i--) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}

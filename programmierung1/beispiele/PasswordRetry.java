import java.util.Scanner;

/** Übung "Password Retry": maximal 3 Versuche. */
public class PasswordRetry {
    public static void main(String[] args) {
        final String PASSWORD = "java21";
        final int MAX_ATTEMPTS = 3;
        Scanner scanner = new Scanner(System.in);

        boolean granted = false;
        int attempts = 0;
        while (attempts < MAX_ATTEMPTS && !granted) {
            System.out.print("Password: ");
            String input = scanner.nextLine();
            attempts++;
            if (input.equals(PASSWORD)) { // Strings IMMER mit equals vergleichen!
                granted = true;
            } else if (attempts < MAX_ATTEMPTS) {
                System.out.println("Wrong, " + (MAX_ATTEMPTS - attempts) + " attempt(s) left.");
            }
        }

        if (granted) {
            System.out.println("Access granted");
        } else {
            System.out.println("Access denied");
        }
    }
}

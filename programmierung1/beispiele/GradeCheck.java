import java.util.Scanner;

/**
 * Recap-Übung (Foliensatz 03, Folie 1):
 * Name und Punkte (0-40) einlesen, gerade/ungerade prüfen,
 * Prozent berechnen und eine Rückmeldung ausgeben.
 */
public class GradeCheck {
    public static void main(String[] args) {
        final int MAX_POINTS = 40;
        Scanner scanner = new Scanner(System.in);

        // 1. Begrüßung
        System.out.println("Welcome to the grade checker!");

        // 2. Name und Punkte einlesen
        System.out.print("Your name: ");
        String name = scanner.nextLine();
        System.out.print("Your points (0-" + MAX_POINTS + "): ");
        int points = scanner.nextInt();

        // 3. Gerade oder ungerade?
        if (points % 2 == 0) {
            System.out.println(points + " is even.");
        } else {
            System.out.println(points + " is odd.");
        }

        // 4. Prozent berechnen - 100.0 (double!), sonst Ganzzahldivision
        double percentage = points * 100.0 / MAX_POINTS;
        System.out.println(name + ", you reached " + percentage + " %.");

        // 5. Rückmeldung - von der höchsten Grenze abwärts prüfen
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

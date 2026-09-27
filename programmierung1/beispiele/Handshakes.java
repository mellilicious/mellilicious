/**
 * Aufgabe "Handshake Summit of Sillyville" (Foliensatz 01):
 * Wie viele Handschläge gibt es, wenn jede von n Personen jeder anderen
 * genau einmal die Hand gibt?
 */
public class Handshakes {

    /** Variante 1: Schleife - Person 1 gibt n-1 Hände, Person 2 noch n-2 neue, ... */
    public static int countWithLoop(int people) {
        int total = 0;
        for (int newHands = people - 1; newHands >= 1; newHands--) {
            total += newHands;
        }
        return total;
    }

    /** Variante 2: Formel (Abstraktion) - n * (n - 1) / 2 */
    public static int countWithFormula(int people) {
        return people * (people - 1) / 2;
    }

    public static void main(String[] args) {
        int citizens = 50;
        System.out.println("Loop:    " + countWithLoop(citizens));
        System.out.println("Formula: " + countWithFormula(citizens));
    }
}

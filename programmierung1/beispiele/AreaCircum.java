import java.util.Scanner;

/**
 * AreaCircum - berechnet Fläche und Umfang eines Kreises aus dem Radius.
 * (Komplettbeispiel aus Foliensatz 02)
 */
public class AreaCircum {
    public static void main(String[] args) {
        // Konstanten
        final double PI = 3.142;

        // Variablen
        int radius;
        double area;
        double circumference;
        Scanner scan = new Scanner(System.in);

        // 1. Begrüßung ausgeben
        System.out.println("Welcome to the Area Circumference Calculator");
        // 2. Radius vom Benutzer abfragen
        System.out.println("Please enter the radius: ");
        radius = scan.nextInt();
        // 3. Fläche = pi * r * r
        area = PI * radius * radius;
        // 4. Umfang = 2 * pi * r
        circumference = 2 * PI * radius;
        // 5. Ergebnisse ausgeben
        System.out.println("The area of a circle of radius: " + radius + " is " + area);
        System.out.println("and its circumference is: " + circumference);
    }
}

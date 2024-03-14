import java.util.*;
public class lab5 {
    public static void main(String[] args) {
        Node list = new Node();
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the numbers to insert (separated by commas): ");
        String input = sc.nextLine();
        String[] numbers = input.split(",");
        sc.close();
        for (String number : numbers) {
            int num = Integer.parseInt(number.trim());
            list.insert(num);
        }

        int levels = Node.calculateLevels(list.root);

        System.out.println("The resulting binary tree has " + levels + " levels");
    }
}

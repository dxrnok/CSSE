package CS211.lab5;
import java.util.*;
public class lab5 {
    public static void main(String[] args) {
        Node list = new Node();
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the numbers: ");
        String input = sc.nextLine();
        String[] numsArr = input.split(",");
        sc.close();
        for (String eachNum : numsArr) {
            int num = Integer.parseInt(eachNum.trim());
            list.insert(num);
        }

        int levels = Node.calculateLevels(list.root);

        System.out.println("Levels: " + levels);
    }
}

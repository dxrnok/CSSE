import java.util.*;
public class Link{
    public String data;
    public Link next;

    public Link(String datain){
        data = datain;
        // 'next' is automatically set to null
    }

    public static void main(String[] args){
        LinkedList list = new LinkedList();
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a word: ");
        String word = sc.nextLine();

        while (!word.equals("END")) {
            list.addData(word);
            System.out.print("Enter a word: ");
            word = sc.nextLine();
        }
        sc.close();
        
        if(!list.isEmpty()){
            System.out.println("\n\u001B[35mWords in the linked list:\u001B[37m");
            list.displayList();
        }else{
            System.out.println("\n\u001B[31mLinked list is empty!\u001B[37m");
        }
    }
}
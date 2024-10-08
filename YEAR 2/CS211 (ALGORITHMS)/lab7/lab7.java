package CS211.lab7;
import java.io.File;
import java.util.Scanner;
public class lab7{
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        File file = new File("C:\\Users\\konra\\Downloads\\EnglishSpanish.csv");
        
        int inputSize = 1000;
        String[] input = new String[inputSize];
        do{
            try {
                Scanner scan = new Scanner(file);
                for(int i = 0; i < inputSize; i++) {
                    input[i] = scan.nextLine();
                }
                scan.close();
            } catch (Exception e) {
                System.err.println(e);
            } 
        }while(userWord.charAt(0) != input[0].charAt(0));
    }
}
class Node {
    int value;
    Node left;
    Node right;
    public Node(int input) {
        value = input;
        left = null;
        right = null;
    }
}

class BinaryTree {
    Node root;
    public BinaryTree() {
        root = null;
    }
    // Method to insert a new node into the binary tree
    // The insertRecursive method returns what the new root should be
    public void insert(int value) {
        root = insertRecursive(root, value);
    }
    // A recursive method to insert a new node into the binary tree
    // The method returns what the new current should be
    private Node insertRecursive(Node current, int insertValue) {
        if (current == null) {
            return new Node(insertValue);
        }
        //it returns the new node up a level so its parent can be connected to it

        if (insertValue < current.value) {
            current.left = insertRecursive(current.left, insertValue);
        } else if (insertValue > current.value) {
            current.right = insertRecursive(current.right, insertValue);
        }
        return current;
    }

    // Method to get height of the binary tree
    public int height() {
        return heightRecursive(root);
    }

    // A recursive method to get the height
    private int heightRecursive(Node current) {
        if(current==null){
            return 0;
        }
        // Calculate the height of the left and right subtrees recursively
        int leftHeight = heightRecursive(current.left);
        int rightHeight = heightRecursive(current.right);
        //the height here is 1 higher than the biggest height of the two children
        return 1+ Math.max(leftHeight, rightHeight);
    }
}

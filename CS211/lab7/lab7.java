package CS211.lab7;
import java.io.File;
import java.util.Scanner;

class Node {
    String english;
    String spanish;
    Node left;
    Node right;

    public Node(String english, String spanish) {
        this.english = english;
        this.spanish = spanish;
        left = null;
        right = null;
    }
}

class BinaryTree {
    Node root;

    public BinaryTree() {
        root = null;
    }

    public void insert(String english, String spanish) {
        root = insertRecursive(root, english, spanish);
    }

    private Node insertRecursive(Node current, String english, String spanish) {
        if (current == null) {
            return new Node(english, spanish);
        }
    
        int compare = english.compareToIgnoreCase(current.english);
        if (compare < 0) {
            current.left = insertRecursive(current.left, english, spanish);
        } else if (compare > 0) {
            current.right = insertRecursive(current.right, english, spanish);
        } else {
            // If the English word already exists, update its Spanish translation
            current.spanish = spanish;
        }
    
        return current;
    }

    public String translate(String english) {
        return translateRecursive(root, english);
    }

    private String translateRecursive(Node current, String english) {
        if (current == null) {
            return null;
        }

        int compare = english.compareToIgnoreCase(current.english);
        if (compare == 0) {
            return current.spanish;
        } else if (compare < 0) {
            return translateRecursive(current.left, english);
        } else {
            return translateRecursive(current.right, english);
        }
    }

    public int height() {
        return heightRecursive(root);
    }

    private int heightRecursive(Node node) {
        if (node == null) {
            return 0;
        }
        int leftHeight = heightRecursive(node.left);
        int rightHeight = heightRecursive(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }
}

public class lab7 {
    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        loadTranslations(tree, "C:\\Users\\konra\\Downloads\\EnglishSpanish.csv");

        System.out.println("Height of the binary tree: " + tree.height());
    }

    private static void loadTranslations(BinaryTree tree, String fileName) {
        File file = new File(fileName);
        try {
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] parts = line.split(",");
                if (parts.length == 2) {
                    tree.insert(parts[0], parts[1]);
                }
            }
            scanner.close();
        } catch (Exception e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}

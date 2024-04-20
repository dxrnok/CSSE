package CS211.lab8;
import java.util.PriorityQueue;
import java.util.Scanner;

public class lab8 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your sentence: ");
        String input = sc.nextLine();

        PriorityQueue<Tree> PQ = new PriorityQueue<Tree>();
        PriorityQueue<Tree> PQ1 = new PriorityQueue<Tree>();
        int[] frequencyArray = new int[128];

        for(char c : input.toCharArray()) {
            frequencyArray[c]++;
        }

        for(int i = 0; i < frequencyArray.length; i++) {
            if (frequencyArray[i] > 0) {
                Tree tree = new Tree();
                tree.root = new Node();
                tree.root.letter = (char)i;
                tree.frequency = frequencyArray[i];
                PQ.add(tree);
                PQ1.add(tree);
            }
        }
        
        while(PQ1.size() > 1){
            Tree r = PQ1.poll();
            Tree l = PQ1.poll();
            Tree mergedTree = new Tree(r.frequency, l.frequency, r, l);
            //PQ.add(mergedTree);
            PQ1.add(mergedTree);
        }

        while(!PQ.isEmpty()) {
            Tree tree = PQ.poll();
            System.out.println("'" + tree.root.letter + "' has a frequency of " + tree.frequency);
        }

        while(!PQ1.isEmpty()){
            Tree merge = PQ1.poll();
            System.out.println("'" + input + "' " + "has a freqeuncy of " + merge.frequency);
        }

        sc.close();
    }
}

class Tree implements Comparable<Tree> {
    public Node root;             //first node of tree
    public int frequency = 0;    //this is the weighting of the tree so that it can be ordered


    public Tree() {                // constructor
        root = null;             // no nodes in tree yet
    }

    public Tree(int one, int two, Tree r, Tree l){
        root = new Node();
        this.frequency = frequency+one+two;
        this.root.rightChild = r.root;
        this.root.leftChild = l.root;
    }

    //the PriorityQueue needs to be able to somehow rank the objects in it
    //thus, the objects in the PriorityQueue must implement an interface called Comparable
    //the interface requires you to write a compareTo() method so here it is:

    public int compareTo(Tree object) { //
        if (frequency - object.frequency > 0) { //compare the cumulative frequencies of the tree
            return -1;
        } else if (frequency - object.frequency < 0) {
            return 1;   //return 1 or -1 depending on whether these frequencies are bigger or smaller
        }
        return 0;   //return 0 if they're the same
    }
}

class Node {

    public char letter = '@';         //stores the letter for this leaf

    public Node leftChild;         // this node's left child
    public Node rightChild;        // this node's right child

}

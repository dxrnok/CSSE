package CS211.lab5;
class Node {
    int data;
    Node leftChild;
    Node rightChild;
    Node root;

    /* public Node find(int key) {
        Node current = root; // start at the root
        while (current.data != key) { // while no match
            if (key < current.data) { // go left?
                current = current.leftChild;
            } else {
                current = current.rightChild; // or go right?
            }
            if (current == null) { // if no child
                return null; // didn’t find it
            }
        }
        return current;
    } */

    public void insert(int id) {
        Node newNode = new Node(); // make new node
        newNode.data = id; // insert data
        if (root == null) { // no node in root
            root = newNode;
        } else { // root occupied

            Node current = root; // start at root
            Node parent;
            while (true) { // (exits internally)
                parent = current;
                if (id < current.data) { // go left?
                    current = current.leftChild;
                    if (current == null) {// if end of the line,
                        // insert on left
                        parent.leftChild = newNode;
                        return;
                    }
                } // end if go left
                else { // or go right?
                    current = current.rightChild;
                    if (current == null) { // if end of the line
                        // insert on right
                        parent.rightChild = newNode;
                        return;
                    }
                } // end else go right
            } // end while
        } // end else not root
    } // end insert()

    public static int calculateLevels(Node root) {
        if (root == null) {
            return 0;
        }

        int leftLevels = calculateLevels(root.leftChild);
        int rightLevels = calculateLevels(root.rightChild);
        
        int levels ;
        if (leftLevels > rightLevels) {
            levels = leftLevels;
        } else {
            levels = rightLevels;
        }
        return levels+1;
    }
}

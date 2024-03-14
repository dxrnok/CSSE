
public class LinkedList{
    private Link first;
    public LinkedList( ){
        first=null;
    }
    
    public boolean isEmpty( ){
        return (first==null);
    }

    public void addData(String data) {
        Link newLink = new Link(data);
        newLink.next = first;
        first = newLink;
    }

    public void displayList() {
        while (first != null) {
            System.out.println(first.data);
            first = first.next;
        }
    }
}
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class lab1 {
    public static void main(String[] args){
        String q1 = "dad";
        System.out.println("Is \u001B[31m" + q1 + "\u001B[0m a palindrome: \u001B[34m" + isPal(q1) + "\u001B[0m");

        int[] q2 = {2,7,11,15};
        int q2Target = 9;
        int[] arr = twoSum(q2, q2Target);
        System.out.println("Q2: " + Arrays.toString(arr));

    }
    
    public static boolean isPal(String str){
        String rev = "";
        boolean check = false;
        for(int i = str.length()-1; i >= 0; i--){
            rev = rev + str.charAt(i);
        }
        if(rev.equals(str)){
            check = true;
        }
        return check;
    }

    public static int[] twoSum (int[] nums, int target){
        int[] indexs = {-1, -1};
        for(int i = 0, j = 0; i < nums.length && j < nums.length; i++){
            int sum = nums[i] + nums[j];
            if(sum == target){
                indexs[0] = i;
                indexs[1] = j;
                break;
            }
        }
        return indexs;
    }
}

public class ListNode {
    int val ;
    ListNode next ;
    ListNode(int x){ 
        val = x ; 
        this.next = null;
    }

    public static ListNode mergeTwoLists (ListNode l1 , ListNode l2){
        ArrayList<Integer> list = new ArrayList<>();

        while(l1 != null){
            list.add(l1.val);
            l1 = l1.next;
        }

        while(l2 != null){
            list.add(l2.val);
            l2 = l2.next;
        }
        Collections.sort(list);

        ListNode temp = new ListNode(-1);
        ListNode head = temp;
        for(int num : list){
            temp.next = new ListNode(num);
            temp = temp.next;
        }
        head = head.next;
        return head;
    }

    public ListNode mergeKLists (ListNode[] lists){

    }

    public static void main(String[] args){
        ListNode l1 = new ListNode(5);
        l1.next = new ListNode(3);
        l1.next.next = new ListNode(6);
        l1.next.next.next = new ListNode(2);
        l1.next.next.next.next = new ListNode(8);
        l1.next.next.next.next.next = new ListNode(9);

        ListNode l2 = new ListNode(2);
        l2.next = new ListNode(7);

        ListNode mergeSort = mergeTwoLists(l1, l2);
        ListNode temp = mergeSort;
          
        System.out.print("Merged Link List is:\n");
        while (temp != null) {
            System.out.print(temp.val + " ");
            temp = temp.next;
        }

    }
}
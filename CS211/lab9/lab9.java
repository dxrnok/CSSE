package CS211.lab9;
import java.util.*;
public class lab9 {
    public static long[] seq;
    public static int[] nums;
    public static void main(String[] args){
        int n = 10;
        long nthFind = find(n);
        System.out.println("Number at nth place :" + nthFind);
        
    }

    public static int collatConvert(long x, int c){
        while(x != 1){
            if(x%2==0){
                x=x/2;
                c++;
            }else{
                x = (x*3)+1;
                c++;
            }
        }
        return c;
    }

    public static void recQuickSort(int left, int right) {
        if(right-left <= 0) // if size <= 1,
            return; // already sorted
        else{ // size is 2 or larger

            long pivot = seq[right]; // rightmost item

            // partition range
            int partition = partitionIt(left, right, pivot);
            recQuickSort(left, partition-1); // sort left side
            recQuickSort(partition+1, right); // sort right side
        }
    }
    public static int partitionIt(int left, int right, long pivot){

        int leftPtr = left-1; // left (after ++)
        int rightPtr = right; // right-1 (after --)
        while(true){
            while(seq[++leftPtr] < pivot ){} // scan to the right
            while(rightPtr > 0 && seq[--rightPtr] > pivot){}
                // scan to the left
       
            if(leftPtr >= rightPtr) // if pointers cross,
                break; // partition done
            else // not crossed, so
                swap(leftPtr, rightPtr); // swap elements
            }
        swap(leftPtr, right); // swap pivot into correct place
        return leftPtr; // return pivot location
    }

    public static void swap(int left, int right){
        long tmp = seq[left];
        seq[left] = seq[right];
        seq[right] = tmp;
    }

    public static long find(long nth){
        seq = new long[30000000];
        nums = new int[10];
        int collatz = 0;
        for(int i = 0; i < 30000000; i++){
            collatz = collatConvert(i+1, 1);
            seq[i] = collatz;
        }

        recQuickSort((int)seq[0], collatz);
        
        for(int i = 0; i < nums.length; i++){
            int colz = collatConvert(3, 1);
            if(colz == seq[10]){
                nums[i] = 3;
            }
        }

        return nums[(int)nth-1];
    }
}

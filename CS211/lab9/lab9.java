package CS211.lab9;
public class lab9 {
    public static long[] seq;
    public static void main(String[] args){
        long n = 10000000;
        find(n);
    }

    public static int collatConvert(long x, int c){
        while(x != 1){
            if(x%2==0){
                x=x/2;
            }else{
                x = (x*3)+1;
            }
            c++;
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

    //method to swap based on partitionIt
    public static void swap(int left, int right){
        long tmp = seq[left];
        seq[left] = seq[right];
        seq[right] = tmp;
    }

    public static void find(long nth){
        seq = new long[(int)nth];
        long[] max = new long[2];

        for(int i = 0; i < nth; i++){
            int collatz = collatConvert(i+1, 1);
            seq[i] = collatz;
            if(seq[i] > max[1]){
                max[1] = collatz;
                max[0] = i+1;
            }
        }
        recQuickSort(0, (int)nth-1);

        System.out.println("The Number With The Largest Collatz Length At The " + nth + "th Place = " + max[0] 
                            + "\n"+max[0]+" Collatz Length = "+ (seq[(int)nth-1])
        );
    }
}

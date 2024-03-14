import java.util.*;
public class lab3{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String w1 = sc.nextLine();
        String w2 = sc.nextLine();

        String temp = w1+""+w2;
        char[] arr = temp.toCharArray();
        
        System.out.println("Merged Word: " + wordMerge(w1, w2));
        System.out.println("Merged Word: " + AlphaMergeSort(arr));
        //System.out.println("Merged Word: " + AMergeSort(arr));
    }

    private static String wordMerge(String w1, String w2){
        String r = "", longWord = "";
        int longWordLength = 0, shortWordLength = 0;

        if(w1.length() < w2.length()){
            longWordLength = w2.length();
            shortWordLength = w1.length();
            longWord = w2;
        }else{
            longWordLength = w1.length();
            shortWordLength = w2.length();
            longWord = w1;
        }

        for(int i = 0; i < longWordLength; i++){
            if(i < shortWordLength){
                r = r + w1.charAt(i);
                r = r + w2.charAt(i);
            }else{
                r = r+longWord.charAt(i);
            }
        }
        return r;
    }

    private static String AlphaMergeSort(char[] arr){
        for(int i = 0; i< arr.length; i++){
            for(int j=0; j < arr.length-1; j++){
                if(arr[j] > arr[j+1]){
                    char tmp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = tmp;
                }
            }
        }

        String r = new String(arr);
        return r;
    }

    /*private static String AMergeSort(char[] arr){
        if (arr == null || arr.length < 1) {
            return "FIRST WORD MUST BE >= 1 , WORD 2 MUST BE <= 100";
        }

        int mid = arr.length/2;
        char[] arrL =  new char[mid];
        char[] arrR = new char[arr.length-mid];
        System.arraycopy(arr, 0, arrL, 0, mid);

        if(arr.length-mid >= 0){
            System.arraycopy(arr, mid, arrR, 0, arr.length-mid);
        }

        AMergeSort(arrL);
        if(mid >1){
            AMergeSort(arrR);
        }
        merge(arrL, arrR, arr);
        
        String r = new String(arr);
        return r;
    }

    private static void merge(char[] arrL, char[] arrR, char[] arr){
        int i = 0, j = 0, k = 0;
        for (i = 0, j = 0; i < arrL.length && j < arrR.length; i++, j++) {
            if (arrL[i] <= arrR[j]) {
                arr[k] = arrL[i];
            } else {
                arr[k] = arrR[j];
            }
        }
        for (i = 0; i < arrL.length; i++) {
            arr[k++] = arrL[i];
        }
        for (j = 0; j < arrR.length; j++) {
            arr[k++] = arrR[j];
        }
    }*/
    
}
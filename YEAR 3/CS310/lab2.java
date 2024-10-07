import java.util.Scanner;

public class lab2 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String word = sc.nextLine();
        int vowels = checkVowels(word);

        if(vowels > 0){
            System.out.println("The string contains " + vowels + " lowercase vowels");
        }else{
            System.out.println("The string does NOT contain lowercase vowels");
        }
    }

    public static int checkVowels(String str){
        String vowels = "aeiou";
        int counter = 0;
        //str = str.toLowerCase();
        for(int i = 0; i < str.length(); i++){
            for(int j = 0; j < vowels.length(); j++){
                if(str.charAt(i) == vowels.charAt(j)){
                    counter++;
                }
            }
        }
        return counter;
    }
}

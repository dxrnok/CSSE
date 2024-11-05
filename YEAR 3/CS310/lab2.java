import java.util.Scanner;

public class lab2 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        //Task 1 (lowercase vowels)
        String word = "aaeb";
        int vowels = checkVowels(word);

        if(vowels > 0){
            System.out.println("The string contains " + vowels + " lowercase vowels");
        }else{
            System.out.println("The string does NOT contain lowercase vowels");
        }

        //Task 2 (chosen lowercase letter)
        String letters = sc.nextLine();
        String word2 = sc.nextLine();
        int num = checkLowercase(letters, word2);

        if(num > 0){
            System.out.println("The string contains " + num + " lowercase letter(s)");
        }else{
            System.out.println("The string does NOT contain lowercase letters");
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

    public static int checkLowercase(String letters, String str){
        int counter = 0;
        letters = letters.replaceAll(",", "");

        for(int i = 0; i < str.length(); i++){
            for(int j = 0; j < letters.length(); j++){
                if(str.charAt(i) == letters.charAt(j)){
                    counter++;
                }
            }
        }
        return counter;
    }
}

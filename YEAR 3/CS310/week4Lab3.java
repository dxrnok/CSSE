public class week4Lab3{
    public static void main(String[] args){
        LUD();
        LD();
    }

    public static void LUD(){
        String alpha = "abcdefghijklmnopqrstuvwxyz";
        alpha += alpha.toUpperCase() + "0123456789";

        for(int i = 0; i < alpha.length(); i++){
            System.out.println(alpha.charAt(i));
        }

        System.out.println("Language of " + alpha.length() + " strings of length 1");
        System.out.println();
    }

    public static void LD(){
        String alpha = "abcdefghijklmnopqrstuvwxyz";
        alpha += alpha.toUpperCase() + "";
        String digits = "0123456789";
        int counter = 0; 
        for(int i = 0; i < alpha.length(); i++){
            for(int j = 0; j < digits.length(); j++){
                System.out.println(alpha.charAt(i) + "" + digits.charAt(j));
                counter++;
            }
        }
        System.out.println("Language of " + counter + " strings of length 2");
        System.out.println();
    }

    public static void LPower(){
        String alpha = "abcdefghijklmnopqrstuvwxyz";
        alpha += alpha.toUpperCase() + "";
        int counter = 0;
        for(int i = 0; i < alpha.length(); i++){
            
        }
    }
}
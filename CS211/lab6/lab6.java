package CS211.lab6;
public class lab6 {
    public static void main(String[] args){
        long x = 2000000000;
        int count = 1, countMax = 0;
        while(x < 2020000000 ){
            count = 1;
            while(numCheck(x, 0) == numCheck(x+1, 0)){
                count++;
                x++;
            }
            if(count > countMax){
                countMax = count;
            }
            System.out.println();
            x++;
        }
        System.out.println(countMax);
    }

    public static int numCheck(long x, int c){
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
}

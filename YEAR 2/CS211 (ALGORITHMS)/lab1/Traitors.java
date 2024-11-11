import CS211.lab1;
import java.util.*;
   
public class Traitors{
    public static void main (String[] args){
        double simulations = 1000000;
        double traitorwins = 0;
   
        for(int i=0;i<simulations;i++){
            int traitors = 3;
            int faithful = 22 - traitors;
            while(traitors+faithful>2){ //while more than 2 people in the game
                boolean votingresult = voting(traitors,faithful,traitors,faithful);
                if(votingresult==false){
                    faithful--;
                }else{
                    traitors--;
                }
                faithful--; //another murder tonight
            }
            if(traitors>0){
                traitorwins++;
            }
        }
        System.out.println("Probability that traitors win:"+traitorwins*100.0/simulations);
    }
   
    //will a traitor be banished??
    //4 parameters - #of traitors and faithful up for banishment, #of traitors and faithful voting
    public static boolean voting(int traitors, int faithful, int traitorvotes, int faithfulvotes){
        int[] voting = new int[faithful+traitors]; //make an array for counting votes
        voting[0]=traitorvotes; //all traitors vote for the same faithful, the first one!
        for(int i=0;i<faithfulvotes;i++){
            int random;
            do{
                random=(int)(Math.random()*voting.length);
            }while(random==i&&i<faithful); //no faithful up for banishment votes for themselves!!
            voting[random]++; //faithful vote randomly
        }
        int findmax=0; //let's find out what the highest number of votes is
        for(int i=0;i<voting.length;i++){
            if(voting[i]>findmax){
                findmax=voting[i];
            }
        }
        int traitorsselected = 0;
        int faithfulselected = 0;
        for (int i = 0; i < faithful + traitors; i++) {
            if (voting[i] == findmax) {
                if (i < faithful) {
                    faithfulselected++; // how many faithful got the max votes
                } else {
                    traitorsselected++; // how many traitors got the max votes
                }
            }
        }
        if(traitorsselected>0&&faithfulselected==0){
            return true; //traitor gets banished
        }else if(faithfulselected>0&&traitorsselected==0){
            return false; //faithrful gets banished
        }
        if(traitors+faithful==2){ //if 2 left, then coin toss
            if(Math.random()>0.5){
                return true;
            }else{
                return false;
            }
        }
        //otherwise we need to rerun the vote with fewer traitors and faithful
        return
       voting(traitorsselected,faithfulselected,traitorvotes,faithfulvotes); //revote
    }
   
}
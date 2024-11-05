package CS211.lab1;
import java.util.*;
public class Game {
    private ArrayList<String> players = new ArrayList<>();
    private double IndexOfTraitors;
    private int playersLeft;

    public static void main(String[] args) {
        Game x = new Game(1000000,22,3);
    }
    public Game(int numSims, int amountOfPlayers, int amountOfTraitors){
        for(int i = 0; i<numSims; i++) {
            createPlayers(amountOfPlayers, amountOfTraitors);
            choosingPlayer();
            players.clear();
        }
    System.out.println(IndexOfTraitors/numSims);
    }

    private void createPlayers(int amountOfPlayers, int amountOfTraitors){
        for(int i = 0; i<amountOfPlayers;i++){
            if(i<amountOfTraitors){
                players.add("Traitor");
            }else players.add("Player");
        }
        this.playersLeft = amountOfPlayers;
        Collections.shuffle(players);
    }

    private void choosingPlayer(){
        Random randomNum = new Random();
        for(int i = playersLeft; i>=playersLeft; i--){
            int players = randomNum.nextInt(playersLeft-1);
            int traitors = randomNum.nextInt(playersLeft-1);
            while(this.players.get(traitors).equals("Traitors")){
                traitors = randomNum.nextInt(playersLeft-1);
            }
            this.players.remove(players);
            this.players.remove(traitors);
            playersLeft -= 2;
            if(playersLeft==2) {
                break;
            }
        }
        if(this.players.contains("Traitor")){
            IndexOfTraitors++;
        }
    }
}
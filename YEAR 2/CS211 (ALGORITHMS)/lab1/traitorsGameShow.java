package CS211.lab1;
import java.util.Random;
public class traitorsGameShow {
    public static final int NUM_PLAYERS = 22;

    public static void main(String[] args) {
        int nTraitors = 3, nSims = 1000000;
        double traitorsWinCount = 0;

        for (int i = 0; i < nSims; i++) {
            if (traitorsGame(nTraitors)) {
                traitorsWinCount++;
            }
        }

        double probability = traitorsWinCount/nSims;
        System.out.println("Probability of traitors winning: " + probability);
    }

    public static boolean traitorsGame(int numTraitors) {
        Random rd = new Random();
        boolean[] players = new boolean[NUM_PLAYERS];
        int playersRemaining = NUM_PLAYERS;

        for (int i = 0; i < numTraitors; i++) {
            players[i] = true;
        }

        for (int i = 0; i < NUM_PLAYERS; i++) {
            int randomIndex = rd.nextInt(NUM_PLAYERS);
            boolean temp = players[i];
            players[i] = players[randomIndex];
            players[randomIndex] = temp;
        }

        while (playersRemaining > 2) {
            //VOTING PLAYERS
            int[] votes = new int[NUM_PLAYERS];
            for (int i = 0; i < NUM_PLAYERS; i++) {
                if (!players[i]) {
                    //FAITHFUL
                    int vote = rd.nextInt(playersRemaining);
                    votes[vote]++;
                }else { //TRAITORS
                	int randomIndexTVotes = rd.nextInt(playersRemaining);
            		while(players[randomIndexTVotes]) {
            			randomIndexTVotes = rd.nextInt(playersRemaining);
            		}
                }
            }

            //BANISH PLAYER
            int maxVotesIndex = 0;
            for (int i = 1; i < playersRemaining; i++) {
                if (votes[i] > votes[maxVotesIndex]) {
                    maxVotesIndex = i;
                }
            }
            players[maxVotesIndex] = false;
            playersRemaining--;

            //MURDER PHASE
            int murderIndex = rd.nextInt(NUM_PLAYERS - numTraitors) + numTraitors;
            players[murderIndex] = false;
            playersRemaining--;
        }

        int traitorCount = 0;
        for (int i = 0; i < NUM_PLAYERS; i++) {
            if (players[i]) {
                traitorCount++;
            }
        }
        return traitorCount >= 2;
    }
}
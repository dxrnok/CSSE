package CS211.lab1;
import java.util.Random;
public class traitorsShow {
    public static final int NUM_PLAYERS = 22;
    public static final int NUM_SIMS = 1000000;

    public static void main(String[] args) {
        int nTraitors = 3;
        double tWinCount = 0;

        for (int i = 0; i < NUM_SIMS; i++) {
            if (monteCarloSim(nTraitors)) {
            	tWinCount++;
            }
        }
  

        double probability = tWinCount / NUM_SIMS;
        System.out.println("Probability of traitors winning: " + probability);
    }
    
    public static boolean monteCarloSim(int nTraitors) {
    	Random rd = new Random();
    	boolean[] players = new boolean[NUM_PLAYERS];
    	int remainingPlayers = NUM_PLAYERS, nFaithful = NUM_PLAYERS-nTraitors;
    	
    	//allocate triators into the arrat
    	for(int i = 0; i < nTraitors; i++) {
    		int randomIndex = rd.nextInt(NUM_PLAYERS);
    		while(players[randomIndex]) { //if traitor is already in this position generate a new one
    			randomIndex = rd.nextInt(NUM_PLAYERS);
    		}
    		players[randomIndex] = true;
    	}
    	
    	//game simulation until 2 players remaining
    	while(remainingPlayers > 2) {
    		int[] votes = new int[remainingPlayers];
    		
    		//voting process for the faithful
    		for(int i = 0; i < nFaithful; i++) {
    			int randomIndex = rd.nextInt(remainingPlayers);
    			votes[randomIndex]++;
    		}
    		
    		//voting process for the traitors
    		int randomIndexTVotes = rd.nextInt(remainingPlayers);
    		while(players[randomIndexTVotes]) {
    			randomIndexTVotes = rd.nextInt(remainingPlayers);
    		}
    		
    		votes[randomIndexTVotes] = votes[randomIndexTVotes]+nTraitors;
    		
    		int maxVotesIndex = 0;
    		//checking player that got the most votes
    		for(int i = 0; i < votes.length; i++) {
    			if(votes[i] > maxVotesIndex) {
    				maxVotesIndex = i;
    			}
    		}
    		
    		players[maxVotesIndex] = false;
            remainingPlayers--;

            // Traitors "murder" phase
            int murderedIndex = rd.nextInt(NUM_PLAYERS - nTraitors) + nTraitors;
            players[murderedIndex] = false;
            remainingPlayers--;
        }

        // Check if traitors win
        int traitorCount = 0;
        for (int i = 0; i < NUM_PLAYERS; i++) {
            if (players[i]) {
                traitorCount++;
            }
        }
        return traitorCount >= 2;
    }
}

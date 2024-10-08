package CS211.lab1;
import java.util.*;
public class traitorsGame {
	public static final int NUM_PLAYERS = 22;
	
	public static void main(String[] args) {
		
		int nSims = 1, nTraitors = 2;
		double tWins = 0.0;
		
		for(int i = 0; i < nSims; i++) {
			if(traitorsGame(nTraitors)) {
				tWins++;
			}
		}
		double probability = tWins / nSims;
        System.out.println("Probability of traitors winning: " + probability);
	}
	
	public static Boolean traitorsGame(int nTraitors) {
		Random rd = new Random();
		Boolean[] players = new Boolean[NUM_PLAYERS];
		int remainingPlayers = NUM_PLAYERS, nFaithful = NUM_PLAYERS-nTraitors;
		int remainingTraitors = nTraitors, remainingFaithful = nFaithful;
		
		Arrays.fill(players, false);
		for(int i = 0; i < nTraitors; i++) {
			players[i] = true;
		}
		
		for (int i = 0; i < NUM_PLAYERS; i++) {
            int randomIndex = rd.nextInt(NUM_PLAYERS);
            boolean temp = players[i];
            players[i] = players[randomIndex];
            players[randomIndex] = temp;
        }
		
		while(remainingPlayers > 2) {
			int[] votes = new int[remainingPlayers];
			
			//VOTE FOR FAITHFUL
			for(int i = 0; i < nFaithful; i++) {
				int randomIndex = rd.nextInt(remainingPlayers);
				votes[randomIndex]++;
			}
		
			int[] traitorsIndex = new int[nTraitors];
			
			//TRAITOR INDEX in PLAYERS ARRAY
			for(int i = 0, j = 0; i < NUM_PLAYERS; i++) {
				while(players[i] == null) {
					i++;
				}
				if(players[i]) {
					traitorsIndex[j] = i;
					j++;
				}
			}
			int randomIndexTVotes = rd.nextInt(remainingPlayers);
			
			//VOTING TRAITORS
			while(Arrays.toString(traitorsIndex).contains(String.valueOf(randomIndexTVotes))) {
				randomIndexTVotes = rd.nextInt(remainingPlayers);
			}
			votes[randomIndexTVotes] = votes[randomIndexTVotes] + nTraitors;
			
			int maxVotesIndex = 0;
			//BANISH PLAYER
			for(int i = 0; i < votes.length; i++) {
				if(votes[i] > maxVotesIndex) {
					maxVotesIndex = i;
				}
			}
			players[maxVotesIndex] = null;
			remainingPlayers--;
			
			int randomIndexMurder = rd.nextInt(remainingPlayers);
			while(Arrays.toString(traitorsIndex).contains(String.valueOf(randomIndexMurder))) {
				randomIndexMurder = rd.nextInt(remainingPlayers);
			}
			players[randomIndexMurder] = null;
			remainingPlayers--;
		}
		
		int traitorCount = 0;
        for (int i = 0; i < NUM_PLAYERS; i++) {
        	while(players[i] == null) {
				i++;
			}
            if (players[i]) {
                traitorCount++;
            }
        }
        return traitorCount >= 2;
	}
}

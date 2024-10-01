import java.io.*;
import java.util.Scanner;

public class lab11{
    public static void main(String[] args) {
        String[] addresses = new String[100];
        String[][] maze = new String[100][100];
        File file = new File("C:\\Users\\konra\\Downloads\\Underground.csv");
        int totalTime = 0;
        int posX = 61, posY = 1;
        try {
            Scanner scan = new Scanner(file);
            for(int i = 0; i < 100; i++) {
                String line = scan.nextLine();
                String[] parts = line.split(","); // Split the line by commas
                //addresses[i] = parts[0]; //get the address
                for (int j = 0; j < 100; j++) {  //get the distances
                    maze[i][j] = parts[j].trim();
                    //System.out.println(maze[i][j]);
                }
            }
            scan.close();

        }catch(Exception e) {
            System.err.println(e);
        }
        
        Brain myBrain = new Brain();

        while(totalTime < 120){
            for(int i=0;i<100;i++){ //print out the map
                for(int j=0;j<100;j++){
                    if(posX==i&&posY==j){
                        System.out.print("o");
                    }else if(maze[i][j]!="*"){
                        System.out.print(maze[i][j]); //there is a space
                    }else{
                        System.out.print("*"); //there is a wall
                    }
                }
                System.out.println();
            }

            try{
                Thread.sleep(100);
            }catch (InterruptedException e) {
                // Handle interrupted exception (if necessary)
                e.printStackTrace();
            }
            boolean N = maze[posX][posY] != "*", S = maze[posX+1][posY] != "*", E = maze[posX][posY+1] !="*", W = maze[posX][posY-1] != "*";
            String move = myBrain.getMove(N,S,E,W);
            System.out.println(N + " " + S + " " + E + " " + W);
            if(move.equals("north")&&N){
                posX--; //if the brain wants to move North AND it's possible
            }else if(move.equals("south")&&S){
                posX++; //if the brain wants to move South AND it's possible
            }else if(move.equals("east")&&E){
                posY++;
            }else if(move.equals("west")&&W){
                posY--;
            }
            totalTime++;

                System.out.println("You found the exit at: "+posX+","+totalTime);
                //System.exit(0);
        }
        /* for(int i = 0; i < 100; i++) {
            System.out.println(addresses[i]);
        }

        for(int i = 0; i < 100; i++) {
            for(int j = 0; j < 99; j++) {
                System.out.print(distances[i][j]+",");
            }
            System.out.println(distances[i][99]);
        } */

        /* int[] distancePath = nearestNeighbor(distances);

        for(int i = 0; i < distancePath.length; i++) {
            System.out.println(addresses[distancePath[i]]);
        }

        int addedDistance = 0;
        for (int i = 0; i < distancePath.length - 1; i++) {
            int currentHouse = distancePath[i];  
            int nextHouse = distancePath[i+1];
            addedDistance += distances[currentHouse][nextHouse];
        }
        addedDistance += distances[distancePath[distancePath.length-1]][distancePath[0]];
        System.out.println("Shortest Path: " + addedDistance + " meters"); */
    }

    public static int[] nearestNeighbor(int[][] distances){
        int[] distancePath = new int[distances.length];
        boolean[] visited = new boolean[distances.length];
        int currentHouse = 0;
        visited[currentHouse] = true;

        for(int i = 1; i < distances.length; i++){
            int nextHouse = Integer.MIN_VALUE;
            int shortestDistance = Integer.MAX_VALUE;
            for(int j = 0; j < distances.length; j++){
                if(!visited[j] && distances[currentHouse][j] < shortestDistance){
                    shortestDistance = distances[currentHouse][j];
                    nextHouse = j;
                    System.out.println(shortestDistance);
                }
            }

            distancePath[i] = nextHouse;
            visited[nextHouse] = true;
            currentHouse = nextHouse;
        }

        return distancePath;
    }
}

class Brain{
    //this is the dumbest possible strategy - random
    public String getMove(boolean north, boolean south, boolean east, boolean west){
        int random = (int)(Math.random()*4);
        switch(random){
            case 0: return "north";
            case 1: return "south";
            case 2: return "west";
            default: return "east";
        }
    }
}
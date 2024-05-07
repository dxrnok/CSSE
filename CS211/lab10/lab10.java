package CS211.lab10;
import java.io.*;
import java.util.Scanner;

public class lab10 {
    public static void main(String[] args) {
        String[] addresses = new String[100];
        int[][] distances = new int[100][100];

        File file = new File("C:\\Users\\konra\\Downloads\\deliveries.csv");

        try {
            Scanner scan = new Scanner(file);
            for(int i = 0; i < 100; i++) {
                String line = scan.nextLine();
                String[] parts = line.split(","); // Split the line by commas
                addresses[i] = parts[0]; //get the address
                for (int j = 0; j < 100; j++) {  //get the distances
                    distances[i][j] = Integer.parseInt(parts[j+1].trim());
                }

            }
            scan.close();

        }catch(Exception e) {
            System.err.println(e);
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

        int[] distancePath = nearestNeighbor(distances);

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
        System.out.println("Shortest Path: " + addedDistance + " meters");
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

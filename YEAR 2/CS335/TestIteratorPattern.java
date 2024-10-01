package CS335;

public class TestIteratorPattern {

	public static void main(String[] args) {
		ShapeStorage storage = new ShapeStorage();
 		storage.addShape("Polygon");
		storage.addShape("Hexagon");
		storage.addShape("Circle");
		storage.addShape("Rectangle");
		storage.addShape("Square");
		
		ShapeIterator iterator = new ShapeIterator(storage.getShapes());
		while(iterator.hasNext()){
			System.out.println(iterator.next());
		}
		//ADDED CODE
		System.out.println();
		System.out.println("NEW CODE FUNCTION:");
		System.out.println("BACKWARDS:");
		while(iterator.hasPrev()){
			System.out.println(iterator.prev());
		}
		System.out.println();
		System.out.println("CONTAINS:");
		System.out.println(iterator.contains("Box"));
		System.out.println();

		System.out.println("Apply removing while iterating...");
		iterator = new ShapeIterator(storage.getShapes());
		while(iterator.hasNext()){
			System.out.println(iterator.next());
			iterator.remove();
		}
	}

}
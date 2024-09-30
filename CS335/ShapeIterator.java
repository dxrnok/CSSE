package CS335;
import java.util.Iterator;

public class ShapeIterator implements Iterator<Shape>{

	private Shape [] shapes;
	int pos;
    int i = 1;
	
	public ShapeIterator(Shape []shapes){
		this.shapes = shapes;
	}
	@Override
	public boolean hasNext() {
		if(pos >= shapes.length || shapes[pos] == null)
			return false;
		return true;
	}

	@Override
	public Shape next() {
		return shapes[pos++];
	}

	@Override
	public void remove() {
		if(pos <=0 )
			throw new IllegalStateException("Illegal position");
		if(shapes[pos-1] !=null){
			for (int i= pos-1; i<(shapes.length-1);i++){
				shapes[i] = shapes[i+1];
			}
			shapes[shapes.length-1] = null;
		}
	}

    //@Override
    public boolean contains(String shape){
        for(int i = 0; i < shapes.length; i++){
            if(shapes[i] != null && shapes[i].getName().equals(shape)){
                return true;
            }
        }
        return false;
    }
   // @Override
    public boolean hasPrev() {
		if(pos > 0 && shapes[pos-1] != null)
			return true;
		return false;
	}

    //@Override
    public Shape prev(){
        return shapes[--pos];
    }
}

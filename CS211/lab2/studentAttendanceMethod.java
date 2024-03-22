sssimport java.util.*;
public class studentAttendanceMethod {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String attendance = "ppallpl".toUpperCase();
		boolean result = checkIfFailed(attendance, 0, 0, 0);

		//System.out.println("["+attendanceCheck(attendance)+" (NOT RECURSIVE)]");
		
		if(result) {
			System.out.println("FAIL");
		}else {
			System.out.println("PASS");
		}
	}
	
	/*public static String attendanceCheck(String attendance) {
		int countLate=0, countAbs=0;
		String mark = "PASS";
		
		for(int i =0; i < attendance.length(); i++) {
			if(attendance.charAt(i) == 'L') {
				countLate++;
			}else {
				if(countLate < 3) {
					countLate = 0;
				}
			}
			
			if(attendance.charAt(i) == 'A') {
				countAbs++;
			}
		}
		
		if(countLate >=3 || countAbs >= 2) {
			mark = "FAIL";
		}
		
		return mark;
	}*/
	
	public static boolean checkIfFailed(String attendance, int index, int cL, int cA) {
		if(index < attendance.length()) {
			if(attendance.charAt(index) == 'A') {
				cA++;
			}
			
			if(attendance.charAt(index) == 'L') {
				cL++;
			}else {
				if(cL < 3) {
					cL = 0;
				}
			}
			
			if(cA >= 2 || cL >= 3) {
				return true;
			}
			
			return checkIfFailed(attendance, index+1, cL, cA);
		}else {
			return false;
		}
	}
}

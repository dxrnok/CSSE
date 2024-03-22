public class recursiveLoanMethod {
	public static void main(String[] args) {
		double x = loan(250000.0, 0.03, 1600.0);
		String s = "months";
		if(x == 12.0) {
			x = x/12.0;
			s = "year";
		}else if (x > 12.0){
		n	x = x/12.0;
			s = "years";
		}else if(x <= 1.0) {
			s = "month";
		}
		
		System.out.print("It will take ");
		System.out.format("%.2f", x);
		System.out.print(" "+ s + " to pay off the loan");
	}
	
	public static double loan(double loan, double rate, double repay) {
	    if (loan <= 0) {
	        return 0;
	    }
	    
	    double MI = rate/12;
	    double CI = loan * (1 + MI);
	    return 1+loan(CI - repay, rate, repay);
	}
}

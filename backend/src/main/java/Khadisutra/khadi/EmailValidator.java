package Khadisutra.khadi;

//import java.util.ArrayList;
//import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {
	
//	for email
	private static final String EMAIL_REGEX = "^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$";

	
	

	// static Pattern object, since pattern is fixed
	private static Pattern pattern;

	// non-static Matcher object because it's created from the input String
	private Matcher matcher;

	public EmailValidator() {
		// initialize the Pattern object
		pattern = Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE);
	}

	/**
	 * This method validates the input email address with EMAIL_REGEX pattern
	 * 
	 * @param email
	 * @return boolean
	 */
	public boolean validateEmail(String email) {
		matcher = pattern.matcher(email);
		return matcher.matches();
	}
	
	
	public static boolean validatepass(String passwordhere, String confirmhere) {

	    Pattern specailCharPatten = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
	    Pattern UpperCasePatten = Pattern.compile("[A-Z ]");
	    Pattern lowerCasePatten = Pattern.compile("[a-z ]");
	    Pattern digitCasePatten = Pattern.compile("[0-9 ]");
//	    List<String> errorList = new ArrayList<>();
//	    errorList.clear();

	    boolean flag=true;

	    if (!passwordhere.equals(confirmhere)) {
//	        errorList.add("password and confirm password does not match");
	        flag=false;
	    }
	    if (passwordhere.length() < 8) {
//	        errorList.add("Password lenght must have alleast 8 character !!");
	        flag=false;
	    }
	    if (!specailCharPatten.matcher(passwordhere).find()) {
//	        errorList.add("Password must have atleast one specail character !!");
	        flag=false;
	    }
	    if (!UpperCasePatten.matcher(passwordhere).find()) {
//	        errorList.add("Password must have atleast one uppercase character !!");
	        flag=false;
	    }
	    if (!lowerCasePatten.matcher(passwordhere).find()) {
//	        errorList.add("Password must have atleast one lowercase character !!");
	        flag=false;
	    }
	    if (!digitCasePatten.matcher(passwordhere).find()) {
//	        errorList.add("Password must have atleast one digit character !!");
	        flag=false;
	    }

	    return flag;

	}

}

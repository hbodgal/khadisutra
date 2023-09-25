package Khadisutra.khadi;

import java.sql.DriverManager;
import java.sql.SQLException;
//import java.sql.Connection;

import com.mysql.jdbc.Connection;



public class doconnection {
	
	Connection cn;
	
	public Connection getConnection()
	{
		try {
			Class.forName("com.mysql.jdbc.Driver");
			cn=(Connection) DriverManager.getConnection(  
					"jdbc:mysql://127.0.0.1:3306/?useSSL=false","root","rootdata");  
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		return cn;
	}

}

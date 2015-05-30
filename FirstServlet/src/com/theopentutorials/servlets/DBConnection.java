package com.theopentutorials.servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
	private static Connection connection = null; 
	private static String connectionURL = "jdbc:mysql://localhost/java_servlets";

	public static Connection getConnection()  {
		try {
			// if connection already exists, return it
			if (connection != null) {
				System.out.println("Connection retrieved from static instance");
				return connection;
			}
			// Load the database driver
			Class.forName("com.mysql.jdbc.Driver");
			// Get a Connection to the database
			connection = DriverManager.getConnection(connectionURL, "root", "");
			return connection;
		} catch (Exception e) {
			DBConnection.handleSQLExceptions(e);
			DBConnection.closeConnection();
			return null;
		}
	}
	
	public static boolean closeConnection(){
		if (connection != null) {
			try {
				connection.close();
			} catch (SQLException e) {
				DBConnection.handleSQLExceptions(e);
			}
			return true;
		}
		return false;
	}
	
	public static void handleSQLExceptions(Exception e){
		e.printStackTrace();
	}
	
	protected void finalize() throws Throwable {
		DBConnection.closeConnection();
	} 

	
}

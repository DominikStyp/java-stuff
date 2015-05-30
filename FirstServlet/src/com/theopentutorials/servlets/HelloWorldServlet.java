package com.theopentutorials.servlets;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;

/**
 * Servlet implementation class HelloWorldServlet
 */
public class HelloWorldServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloWorldServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    private User getUser(){
    	User usr = new User();
    	return usr;
    }
    private Animal getAnimal(){
    	Animal animal = new Animal();
		animal.setLegs(2);
		animal.setSpecies("reptile");
		animal.setColor("green");
		return animal;
    }
    
    private void testInsert(){
    	HashMap<String, String> h = new HashMap<String, String>();
    	h.put("login", "dominik");
    	h.put("email", "dominik@test.com");
    	DBQuery.insert("user", h);
    }
    
    private void testSetValues(){
    	User u = new User();
    	u.setId(1);
    	u.setLogin("dominik1234");
    	u.saveToDB();
    	//System.out.println(u.getBirth_date());
    }
    
    public void init() throws ServletException{
    	//runCheckConnectionThread();
    	super.init();
    	
    }
    
    /**
     * Invoke while destroying servlet object
     */
    public void destroy(){
    	DBConnection.closeConnection();
    }
    

    
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		testSetValues();
		// TODO Auto-generated method stub
		ServletContext context = getServletContext();
		RequestDispatcher dispatcher = context.getRequestDispatcher("/index.jsp");
		/**
		 * using name "animal" we cause that:
		 * <jsp:useBean id="animal" type="com.theopentutorials.servlets.Animal" class="com.theopentutorials.servlets.Animal" scope="application">
		 * will be using instance passed to the context, if we comment this line,
		 * then JSP creates it's own instance of the class Animal using default constructor (without parameters)
		 */
		context.setAttribute("animal", getAnimal());
		context.setAttribute("user", getUser());
		dispatcher.forward(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	
	
    private void runCheckConnectionThread(){
    	Thread th = new Thread()
        {
            public void run() {
            	Integer counter = 0;
                while(true){
                	try {
						sleep(1000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                	if(++counter > 10){
                		return;
                	}
                }
                
            }
        };
    	th.start();
    }
	
	
}

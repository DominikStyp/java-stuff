<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Startup page</title>
</head>
<body>
<h1>My first Servlet</h1>
<% /* 
 #) To use JSTL tags you need to get them from http://tomcat.apache.org/taglibs/standard/ (Tomtat 6.0)
    .tld files need to be copied to WEB-INF dir, and .jar to WEB-INF/lib (in this case jstl.jar, standard.jar)
 #) Using variables passed to the object context is by method setAttribute()
 ${applicationScope.User.name}: in this case User.getName() method is run,
 							    application - is about application context, so it gets attributes from the session, pageContext and others
*/ %>
User: <br />
Name: <c:out value="${applicationScope.user.name}"/> <br />
Surname: <c:out value="${applicationScope.user.surname}"/> <br />
<br />

<% /* 
	#) Here we get Animal bean properties, even without passing object to the contextu
	Below possible values of the scope="" -> page, request, session, application
*/ %>
Animal: <br />
<jsp:useBean id="animal" type="com.theopentutorials.servlets.Animal" class="com.theopentutorials.servlets.Animal" scope="application">  
</jsp:useBean>  
Number of legs: <jsp:getProperty property="legs" name="animal"/> <br />
color: <jsp:getProperty property="color" name="animal"/> <br />
species: <jsp:getProperty property="species" name="animal"/> <br />
</body>
</html>
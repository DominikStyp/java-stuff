/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */

package com.theopentutorials.servlets;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Set;

public class DBQuery {

	public static int insert(String table, HashMap<String, String> fieldsVals){
		// Get a set of the entries
		Set<Entry<String, String>> set = fieldsVals.entrySet();
		// Get an iterator
		Iterator<Entry<String, String>> i = set.iterator();
		StringBuffer fields = new StringBuffer();
		StringBuffer values = new StringBuffer();
		String sql = null;
		if( !i.hasNext() ){
			DBConnection.handleSQLExceptions(new Exception("No fields in HashMap fieldsVals"));
			return 0;
		}
		while(i.hasNext()) { 
			Entry<String, String> me = (Entry<String, String>)i.next(); 
			fields.append("" + me.getKey() + ",");
			values.append("'" + me.getValue() + "',");
		}
		try {
			String fieldsStr = fields.toString();
			String valuesStr = values.toString();
			sql 			 = String.format("INSERT INTO %s (%s) VALUES (%s)", 
										table, 
										fieldsStr.substring(0, fieldsStr.length()-1), 
										valuesStr.substring(0, valuesStr.length()-1));
			Statement s = DBConnection.getConnection().createStatement();
			s.executeUpdate(sql);
			return s.getUpdateCount();
		} catch (Exception e) {
			e.initCause(new Exception("SQL QUERY:\t" + sql));
			DBConnection.handleSQLExceptions(e);
			return 0;
		}
	}
	
	public static Integer insertBeanObject(BeanTemplateAbstract beanInstance){
		HashMap<String,String> fieldsVals = DBQuery.getFieldsValues(beanInstance);
		//we have to remove 'id' field, because primary key is automatically inserted by database engine
		fieldsVals.remove("id");
		String table = beanInstance.getTableName();
		return DBQuery.insert(table, fieldsVals);
	}
	
	public static Integer updateBeanObject(BeanTemplateAbstract beanInstance){
		String sql = DBQuery.getUpdateSql(beanInstance);
		if(sql == null){
			return 0;
		}
		try {
			Statement s = DBConnection.getConnection().createStatement();
			s.executeUpdate(sql);
			return s.getUpdateCount();
		} catch (Exception e) {
			e.initCause(new Exception("SQL QUERY:\t" + sql));
			DBConnection.handleSQLExceptions(e);
			return 0;
		}
	}

	
	public static HashMap<String, String> getBeanObjectValuesFromDb(BeanTemplateAbstract beanInstance){
		if(beanInstance.getId() < 1){
			DBConnection.handleSQLExceptions(new Exception("id field can't be less than 1"));
			return null;
		}
		ResultSet resultSet = query("SELECT * FROM `" + beanInstance.getTableName() + "` WHERE id=" + beanInstance.getId());
		try {
			ResultSetMetaData metaData = resultSet.getMetaData();
			HashMap<String, String> columnsValues = new HashMap<String,String>();
			while (resultSet.next()) {
				for(int i=1; i<metaData.getColumnCount(); i++){
					String colName = metaData.getColumnName(i);
					String colValue = resultSet.getString(colName);
					//we don't need id field in hashmap
					if(colName == "id"){
						continue;
					}
					columnsValues.put(colName, colValue);
				}
				//there can't be more than 1 rows
				break;
			}
			return columnsValues;
		} catch (SQLException e) {
			DBConnection.handleSQLExceptions(e);
			return null;
		}
	}
	
	public static boolean setBeanObjectValues(BeanTemplateAbstract beanInstance){
		HashMap<String, String> fieldsValues = getBeanObjectValuesFromDb(beanInstance);
		Set<Entry<String, String>> entrySet = fieldsValues.entrySet();
		Class<? extends Object> clazz = beanInstance.getClass();
		Method[] methods = clazz.getDeclaredMethods();
		for(Method method : methods){
			String methodName = method.getName();
			//if it's not a setter or it's setId() we don't need it
			if(!methodName.startsWith("set") || methodName.equals("setId")){
				continue;
			}
			// setBirth_date => birth_date
			String methodFieldName = methodName.replace("set", "").toLowerCase();
			for(Entry<String, String> entry : entrySet){
				//we found method that is setter for certain field name ( entry.getKey() )
				String fieldName = entry.getKey();
				if(methodFieldName.equals(fieldName)){
					//check argument type
					Class<?>[] parameterTypes = method.getParameterTypes();
					if(parameterTypes.length > 1){
						DBConnection.handleSQLExceptions(new Exception("setter should have maximum 1 parameter"));
						return false;
					}
					String firstParamType = parameterTypes[0].getName();
					try {
							//if first parameter of setter is string, ex. public void setBirth_date(String birth_date)
							if(firstParamType.equals("java.lang.String")){
									method.invoke(beanInstance, entry.getValue());
							}
							else if(firstParamType.equals("java.lang.Integer")){
								method.invoke(beanInstance, Integer.parseInt(entry.getValue()));
							}
							else {
								throw new IllegalArgumentException("Setter can get only parameters Integer, String");
							}
					} catch (IllegalAccessException
							| IllegalArgumentException
							| InvocationTargetException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}
		return true;
	}
	
	public static ResultSet query(String sql){
		try {
			Statement s = DBConnection.getConnection().createStatement();
			return s.executeQuery(sql);
		} catch (Exception e) {
			e.initCause(new Exception("SQL QUERY:\t" + sql));
			DBConnection.handleSQLExceptions(e);
			return null;
		}
	}
	
	

	
	public static String getUpdateSql(BeanTemplateAbstract beanInstance){
		HashMap<String,String> fieldsVals = DBQuery.getFieldsValues(beanInstance);
		if(fieldsVals.size() < 1){
			DBConnection.handleSQLExceptions(new Exception("Empty HashMap <field,value>"));
			return null;
		}
		String id = fieldsVals.get("id");
		StringBuffer sql = new StringBuffer();
		sql.append("UPDATE `" + beanInstance.getTableName() + "` SET ");
		for (Entry<String, String> entry : fieldsVals.entrySet()) {
			//we don't want to modify primary key in database
			if(entry.getKey().equals("id")){
				continue;
			}
			sql.append("`" + entry.getKey() + "`='" + entry.getValue() + "',");
		}
		String sqlStr = sql.toString();
		sqlStr = sqlStr.substring(0, sqlStr.length() - 1) + " WHERE `id`=" + id + ";";
		return sqlStr;
	}
	
	public static HashMap<String,String> getFieldsValues(BeanTemplateAbstract beanInstance){
		Class<? extends BeanTemplateAbstract> clazz = beanInstance.getClass();
		String className = clazz.getName();
		//getDeclaredMethods() = methods that are declared ONLY by certain class
		//getMethods() = methods that are declared by certain class AND ITS PARENTS
		Method[] methods = clazz.getDeclaredMethods();
		//below we convert simple array returned by clazz.getDeclaredFields() to ArrayList
		//getDeclaredFields() = fields that are declared ONLY by certain class
		//getFields() = fields that are declared by certain class AND ITS PARENTS
		ArrayList<Field> fields = new ArrayList<Field>( Arrays.asList( clazz.getDeclaredFields() ) ); 
		//check is there a field called 'id' - mandatory
		boolean hasId = false;
		for(Field field: fields){
			if(field.getName() == "id"){
				hasId = true;
				break;
			}
		}
		if(!hasId){
			DBConnection.handleSQLExceptions(new Exception("No id field in class " + className + ", check if it's defined"));
			return null;
		}
		HashMap<String,String> fieldsVals = new HashMap<String, String>();
		for (Method method : methods) {
			String methodName = method.getName();
			//we invoke only getters, but not getter that returns name of the table in database
			if(methodName.startsWith("get") && !methodName.equals("getTableName")){
				try {
					//we call it without arguments, because getters supposed to have no arguments
					String value = method.invoke(beanInstance).toString();
					String fieldName = methodName.replace("get", "").toLowerCase();
					fieldsVals.put(fieldName, value);
					
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					DBConnection.handleSQLExceptions(e);
					return null;
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					DBConnection.handleSQLExceptions(e);
					return null;
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					DBConnection.handleSQLExceptions(e);
					return null;
				}
			}
			
		}
		return fieldsVals;
	}
	
	
	

}

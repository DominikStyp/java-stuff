
/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */

package com.theopentutorials.servlets;


public abstract class BeanTemplateAbstract implements BeanTemplateInterface{
	public Integer id = 0;
	public String tableName = null;
	public abstract String getTableName();
	public abstract Integer getId();
	public abstract void setId(Integer idParam);
	
	/**
	 * Saves current object properties values to Database, 
	 * or inserts new record to Database if id==null or id==0
	 * @return {Boolean}
	 */
	public final Integer saveToDB(){
		if(getId() < 1 || getId() == null){
			return DBQuery.insertBeanObject(this);
		}
		else {
			return DBQuery.updateBeanObject(this);
		}
	}
	/**
	 * Gets properties values from Database, and sets them as object properties 
	 * @return {Boolean}
	 */
	public final boolean getFromDB(){
		if(getId() < 1 || getId() == null){
			return false;
		}
		else {
			return DBQuery.setBeanObjectValues(this);
		}
	}
	

}

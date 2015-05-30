package com.theopentutorials.servlets;

/**
 * id 	login 	email 	name 	surname 	birth_date 	registred_date 	active
 * @author Dominik
 *
 */
public class User extends BeanTemplateAbstract{
	
	protected String tableName = "user";
	protected Integer id = 0;
	protected String login = "dominik";
	protected String email = "dominik.stypula@entestat.com";
	protected String name = "Dominik Lukasz";
	protected String surname = "Kowalski";
	protected String birth_date = "2000-01-01 01:00:00";
	protected String registred_date = "2013-08-04 10:00:00";
	protected Integer active = 1;

	@Override
	public String getTableName() {
		return this.tableName;
	}
	
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getBirth_date() {
		return birth_date;
	}

	public void setBirth_date(String birth_date) {
		this.birth_date = birth_date;
	}

	public String getRegistred_date() {
		return registred_date;
	}

	public void setRegistred_date(String registred_date) {
		this.registred_date = registred_date;
	}

	public Integer getActive() {
		return active;
	}

	public void setActive(Integer active) {
		this.active = active;
	}

	public User(){
		
	}

	

	



	
	
	
}

package com.theopentutorials.servlets;

public class Animal {

	private Integer id = 1;
	private Integer legs = 4;
	private String color = "black";
	private String species = "mammal";
	
	public Animal() {
		
	}
	
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Integer getLegs() {
		return legs;
	}



	public void setLegs(Integer legs) {
		this.legs = legs;
	}



	public String getColor() {
		return color;
	}



	public void setColor(String color) {
		this.color = color;
	}



	public String getSpecies() {
		return species;
	}



	public void setSpecies(String species) {
		this.species = species;
	}



	
	

}


/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */
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

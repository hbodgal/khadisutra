package Khadisutra.khadi;

import java.util.ArrayList;
import java.util.List;

public class Categories {
	
	private String atitle;
	private String a_cat_id;
	private List<Categories> category = new ArrayList<>();
	
	
	public String getAtitle() {
		return atitle;
	}
	public void setAtitle(String atitle) {
		this.atitle = atitle;
	}
	public String getA_cat_id() {
		return a_cat_id;
	}
	public void setA_cat_id(String a_cat_id) {
		this.a_cat_id = a_cat_id;
	}
	public List<Categories> getCategory() {
		return category;
	}
	public void setCategory(List<Categories> category) {
		this.category = category;
	}
	
	
	public Categories(String atitle, String a_cat_id, List<Categories> category) {
		super();
		this.atitle = atitle;
		this.a_cat_id = a_cat_id;
		this.category = category;
	}
	
	
	public Categories(String atitle, String a_cat_id) {
		super();
		this.atitle = atitle;
		this.a_cat_id = a_cat_id;
	}
	
	
	

}

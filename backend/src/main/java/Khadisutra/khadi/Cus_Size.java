package Khadisutra.khadi;

import java.util.List;

public class Cus_Size {
	
	private String size_id;
	private String size_name;
	private List<String> size_values;
	
	
	public String getSize_id() {
		return size_id;
	}
	public void setSize_id(String size_id) {
		this.size_id = size_id;
	}
	public String getSize_name() {
		return size_name;
	}
	public void setSize_name(String size_name) {
		this.size_name = size_name;
	}
	public List<String> getSize_values() {
		return size_values;
	}
	public void setSize_values(List<String> size_values) {
		this.size_values = size_values;
	}
	
	
	public Cus_Size(String size_id, String size_name, List<String> size_values) {
		super();
		this.size_id = size_id;
		this.size_name = size_name;
		this.size_values = size_values;
	}
	
	

}

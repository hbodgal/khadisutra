package Khadisutra.khadi;

import java.util.Map;

public class Pre_Sizes {
	
	private String pre_size_id;
	private String pre_size_label;
	private String pre_size_name;
	private Map<String, Double> measurements;
	
	
	public Pre_Sizes(String pre_size_id, String pre_size_label, String pre_size_name,
			Map<String, Double> measurements) {
		super();
		this.pre_size_id = pre_size_id;
		this.pre_size_label = pre_size_label;
		this.pre_size_name = pre_size_name;
		this.measurements = measurements;
	}


	public String getPre_size_id() {
		return pre_size_id;
	}


	public void setPre_size_id(String pre_size_id) {
		this.pre_size_id = pre_size_id;
	}


	public String getPre_size_label() {
		return pre_size_label;
	}


	public void setPre_size_label(String pre_size_label) {
		this.pre_size_label = pre_size_label;
	}


	public String getPre_size_name() {
		return pre_size_name;
	}


	public void setPre_size_name(String pre_size_name) {
		this.pre_size_name = pre_size_name;
	}


	public Map<String, Double> getMeasurements() {
		return measurements;
	}


	public void setMeasurements(Map<String, Double> measurements) {
		this.measurements = measurements;
	}
	
	
	
	
	
	
	
	
	

}

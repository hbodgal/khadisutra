package Khadisutra.khadi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class cust_style {
	
	
	private String style_id;
	private String style;
	private List<Map<String,String>> style_values;
	
	
	
	public cust_style(String style_id, String style, List<Map<String, String>> stle_values) {
		super();
		this.style_id = style_id;
		this.style = style;
		this.style_values = stle_values;
	}
	public String getStyle_id() {
		return style_id;
	}
	public void setStyle_id(String style_id) {
		this.style_id = style_id;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public List<Map<String, String>> getStyle_values() {
		return style_values;
	}
	public void setStle_values(List<Map<String, String>> style_values) {
		this.style_values = style_values;
	}
	
	
	
	
	
	
	
	

}

package Khadisutra.khadi;

import java.util.List;

public class Cus_Style {
	
	
	private String style_id;
	private String style;
	private List<String> style_names;
	private List<String> style_values;
	
	
	public Cus_Style(String style_id, String style, List<String> style_names, List<String> style_values) {
		super();
		this.style_id = style_id;
		this.style = style;
		this.style_names = style_names;
		this.style_values = style_values;
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


	public List<String> getStyle_names() {
		return style_names;
	}


	public void setStyle_names(List<String> style_names) {
		this.style_names = style_names;
	}


	public List<String> getStyle_values() {
		return style_values;
	}


	public void setStyle_values(List<String> style_values) {
		this.style_values = style_values;
	} 

	
	
	
}

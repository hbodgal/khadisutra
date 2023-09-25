package Khadisutra.khadi;

public class Product {

	private String p_id;
	private String p_name;
	private int p_price;
	private int p_discount;
	private int p_final_price;
	private String p_display_photo;
	private String p_category_id;
	private boolean p_discount_available;
	private boolean p_show_product;
	
	
	public String getP_id() {
		return p_id;
	}
	public void setP_id(String p_id) {
		this.p_id = p_id;
	}
	public String getP_name() {
		return p_name;
	}
	public void setP_name(String p_name) {
		this.p_name = p_name;
	}
	public int getP_price() {
		return p_price;
	}
	public void setP_price(int p_price) {
		this.p_price = p_price;
	}
	public int getP_discount() {
		return p_discount;
	}
	public void setP_discount(int p_discount) {
		this.p_discount = p_discount;
	}
	public int getP_final_price() {
		return p_final_price;
	}
	public void setP_final_price(int p_final_price) {
		this.p_final_price = p_final_price;
	}
	public String getP_display_photo() {
		return p_display_photo;
	}
	public void setP_display_photo(String p_display_photo) {
		this.p_display_photo = p_display_photo;
	}
	public String getP_category_id() {
		return p_category_id;
	}
	public void setP_category_id(String p_category_id) {
		this.p_category_id = p_category_id;
	}
	public boolean isP_discount_available() {
		return p_discount_available;
	}
	public void setP_discount_available(boolean p_discount_available) {
		this.p_discount_available = p_discount_available;
	}
	public boolean isP_show_product() {
		return p_show_product;
	}
	public void setP_show_product(boolean p_show_product) {
		this.p_show_product = p_show_product;
	}
	
	
	
	
	
	public Product(String p_id, String p_name, int p_price, int p_discount, int p_final_price, String p_display_photo,
			String p_category_id, boolean p_discount_available, boolean p_show_product) {
		super();
		this.p_id = p_id;
		this.p_name = p_name;
		this.p_price = p_price;
		this.p_discount = p_discount;
		this.p_final_price = p_final_price;
		this.p_display_photo = p_display_photo;
		this.p_category_id = p_category_id;
		this.p_discount_available = p_discount_available;
		this.p_show_product = p_show_product;
	}
	
	
	
	
	
	
}

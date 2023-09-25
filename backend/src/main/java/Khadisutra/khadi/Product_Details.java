package Khadisutra.khadi;

public class Product_Details {
	
	private String p_id;
	private String p_name;
	private int p_price;
	private int p_discount;
	private int p_final_price;
	private String p_display_photo;
	private String p_category_id;
	private boolean p_discount_available;
	private boolean p_show_product;
	private String p_description;
	private String p_color;
	private String p_fabric;
	private String[] p_photos;
	private String []p_description_points;
	private String p_seller_id;
	private double p_rating;
	
	
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
	public String getP_description() {
		return p_description;
	}
	public void setP_description(String p_description) {
		this.p_description = p_description;
	}
	public String getP_color() {
		return p_color;
	}
	public void setP_color(String p_color) {
		this.p_color = p_color;
	}
	public String getP_fabric() {
		return p_fabric;
	}
	public void setP_fabric(String p_fabric) {
		this.p_fabric = p_fabric;
	}
	public String[] getP_photos() {
		return p_photos;
	}
	public void setP_photos(String[] p_photos) {
		this.p_photos = p_photos;
	}
	public String[] getP_description_points() {
		return p_description_points;
	}
	public void setP_description_points(String[] p_description_points) {
		this.p_description_points = p_description_points;
	}
	public String getP_seller_id() {
		return p_seller_id;
	}
	public void setP_seller_id(String p_seller_id) {
		this.p_seller_id = p_seller_id;
	}
	public double getP_rating() {
		return p_rating;
	}
	public void setP_rating(double p_rating) {
		this.p_rating = p_rating;
	}
	
	
	
	public Product_Details(String p_id, String p_name, int p_price, int p_discount, int p_final_price,
			String p_display_photo, String p_category_id, boolean p_discount_available, boolean p_show_product,
			String p_description, String p_color, String p_fabric, String[] p_photos, String[] p_description_points,
			String p_seller_id, double p_rating) {
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
		this.p_description = p_description;
		this.p_color = p_color;
		this.p_fabric = p_fabric;
		this.p_photos = p_photos;
		this.p_description_points = p_description_points;
		this.p_seller_id = p_seller_id;
		this.p_rating = p_rating;
	}
	
	

}

package Khadisutra.khadi;

public class db_product {
	
	private String p_id;
	private String cat_id;
	private String seller_id;
	private String name;
	private String image;
	private int price;
	private int quantity;
	public String getP_id() {
		return p_id;
	}
	public void setP_id(String p_id) {
		this.p_id = p_id;
	}
	public String getCat_id() {
		return cat_id;
	}
	public void setCat_id(String cat_id) {
		this.cat_id = cat_id;
	}
	public String getSeller_id() {
		return seller_id;
	}
	public void setSeller_id(String seller_id) {
		this.seller_id = seller_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public db_product(String p_id, String cat_id, String seller_id, String name, String image, int price,
			int quantity) {
		super();
		this.p_id = p_id;
		this.cat_id = cat_id;
		this.seller_id = seller_id;
		this.name = name;
		this.image = image;
		this.price = price;
		this.quantity = quantity;
	}
	
	
	
	
	
	
	

}

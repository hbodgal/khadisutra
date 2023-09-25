package Khadisutra.khadi;

import java.util.List;

public class cart1 {
	
	private List<Product_cart> products;
	private int cart_total;
	
	
	public List<Product_cart> getProducts() {
		return products;
	}
	public void setProducts(List<Product_cart> products) {
		this.products = products;
	}
	public int getCart_total() {
		return cart_total;
	}
	public void setCart_total(int cart_total) {
		this.cart_total = cart_total;
	}
	
	
	public cart1(List<Product_cart> products, int cart_total) {
		super();
		this.products = products;
		this.cart_total = cart_total;
	}
	
	
	
	

}

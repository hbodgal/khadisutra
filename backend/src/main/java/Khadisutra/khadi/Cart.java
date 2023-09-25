package Khadisutra.khadi;

import java.util.List;

public class Cart {
	
	
	private List<Product> products;
	private int cart_total;
	
	
	
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public int getCart_total() {
		return cart_total;
	}
	public void setCart_total(int cart_total) {
		this.cart_total = cart_total;
	}
	
	
	
	public Cart(List<Product> products, int cart_total) {
		super();
		this.products = products;
		this.cart_total = cart_total;
	}
	
	
	
	
	
	

}

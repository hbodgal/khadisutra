package Khadisutra.khadi;

public class db_order {
	
	
	private String OrderId;
	private String CustId;
	private String ProductId;
	private String OrderDate;
	private String EstimatedDeliveryDate;
	private String SellerId;
	private String total;
	private String p_image;
	public String getOrderId() {
		return OrderId;
	}
	public void setOrderId(String orderId) {
		OrderId = orderId;
	}
	public String getCustId() {
		return CustId;
	}
	public void setCustId(String custId) {
		CustId = custId;
	}
	public String getProductId() {
		return ProductId;
	}
	public void setProductId(String productId) {
		ProductId = productId;
	}
	public String getOrderDate() {
		return OrderDate;
	}
	public void setOrderDate(String orderDate) {
		OrderDate = orderDate;
	}
	public String getEstimatedDeliveryDate() {
		return EstimatedDeliveryDate;
	}
	public void setEstimatedDeliveryDate(String estimatedDeliveryDate) {
		EstimatedDeliveryDate = estimatedDeliveryDate;
	}
	public String getSellerId() {
		return SellerId;
	}
	public void setSellerId(String sellerId) {
		SellerId = sellerId;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getP_image() {
		return p_image;
	}
	public void setP_image(String p_image) {
		this.p_image = p_image;
	}
	public db_order(String orderId, String custId, String productId, String orderDate, String estimatedDeliveryDate,
			String sellerId, String total, String p_image) {
		super();
		OrderId = orderId;
		CustId = custId;
		ProductId = productId;
		OrderDate = orderDate;
		EstimatedDeliveryDate = estimatedDeliveryDate;
		SellerId = sellerId;
		this.total = total;
		this.p_image = p_image;
	}
	
	
	
	
	
	

}

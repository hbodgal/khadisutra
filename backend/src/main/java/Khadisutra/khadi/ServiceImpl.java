package Khadisutra.khadi;

import java.util.List;
import java.util.Map;

//import java.sql.ResultSet;
//import java.sql.SQLException;


import com.mysql.jdbc.Connection;

public class ServiceImpl {
	
	Connection cn;
	doconnection dc = new doconnection();
	DAO dao =  new DAO();
	
	
	
	
	
	
	public List<Product> getAllProducts(String main_category, String cat_id, int page_no)
	{
		cn=dc.getConnection();
		
		return dao.getAllProducts(cn,main_category,cat_id,page_no);
	}
	
	
	public List<Categories> getAllCategories()
	{
		cn=dc.getConnection();
		return dao.getAllCategories(cn);
	}
	
	
	public List<Product_Details> getProduct(String main_category, String p_id)
	{
		cn = dc.getConnection();
		return dao.getProduct(cn, main_category, p_id);
	}

	
	
	public int[] getNumberOfPages(String main_category,
									String cat_id,
									String[] color,
									String []fabric,
									String orderby,
									String sprice_from,
									String sprice_to,
									String sdiscount_from,
									String sdiscount_to,
									int page_no)
	{
		cn = dc.getConnection();
		int price_from=0,price_to=0,discount_from=0,discount_to=0;
		if(sprice_from == null)
		{
			price_from=-1;
		}
		else
		{
			price_from = Integer.parseInt(sprice_from);
		}
		if(sprice_to == null)
		{
			price_to=-1;
		}
		else
		{
			price_to = Integer.parseInt(sprice_to);
		}
		if(sdiscount_from == null)
		{
			discount_from=-1;
		}
		else
		{
			discount_from = Integer.parseInt(sdiscount_from);
		}
		if(sdiscount_to == null)
		{
			discount_to=-1;
		}
		else
		{
			discount_to = Integer.parseInt(sdiscount_to);
		}
		return dao.getNumberOfPages(cn,
									main_category,
									cat_id,
									color,
									fabric,
									orderby,
									price_from,
									price_to,
									discount_from,
									discount_to,
									page_no);
	}
	
	
	public List<String> getMainSearchSuggestions(String search)
	{
		cn = dc.getConnection();
		return dao.getMainSearchSuggestions(cn, search);
	}

	
	public List<Categories> getChildCategories(String cat_id)
	{
		cn = dc.getConnection();
		return dao.getChildCategories(cn, cat_id);
	}
	
	
	
	public List<Product> filterproducts(String main_category,
										String cat_id,
										String[] color,
										String []fabric,
										String orderby,
										String sprice_from,
										String sprice_to,
										String sdiscount_from,
										String sdiscount_to,
										int page_no)
	{
		cn = dc.getConnection();
		int price_from=0,price_to=0,discount_from=0,discount_to=0;
		if(sprice_from == null)
		{
			price_from=-1;
		}
		else
		{
			price_from = Integer.parseInt(sprice_from);
		}
		if(sprice_to == null)
		{
			price_to=-1;
		}
		else
		{
			price_to = Integer.parseInt(sprice_to);
		}
		if(sdiscount_from == null)
		{
			discount_from=-1;
		}
		else
		{
			discount_from = Integer.parseInt(sdiscount_from);
		}
		if(sdiscount_to == null)
		{
			discount_to=-1;
		}
		else
		{
			discount_to = Integer.parseInt(sdiscount_to);
		}
		return dao.filterproducts(cn,
									main_category,
									cat_id,
									color,
									fabric,
									orderby,
									price_from,
									price_to,
									discount_from,
									discount_to,
									page_no);
	}
	
	
	public Map<String,List<String>> getDistinctcolorandfabric(String main_category, String cat_id)
	{
		cn = dc.getConnection();
		return dao.getDistinctcolorandfabric(cn, main_category, cat_id);
	}
	
	
	public List<Product_Details> getSellerProducts(String main_category, String cat_id)
	{
		cn = dc.getConnection();
		return dao.getSellerProducts(cn,main_category,cat_id);
	}
	
	
	public List<Categories> getMainCategories()
	{
		cn = dc.getConnection();
		return dao.getMainCategories(cn);
	}
	
	
	public List<Product_Details> getSellerSubProducts(String main_category, String cat_id)
	{
		cn = dc.getConnection();
		return dao.getSellerSubProducts(cn,main_category,cat_id);
	}
	
	
	public List<String> getNewProductId(String main_category, String cat_id)
	{
		cn = dc.getConnection();
		return dao.getNewProductId(cn,main_category,cat_id);
	}
	
	public List<Cus_Size> getSizes( String cat_id)
	{
		cn = dc.getConnection();
		return dao.getSizes(cn, cat_id);
	}

	public List<Cus_Style> getStyles( String cat_id)
	{
		cn = dc.getConnection();
		return dao.getStyles(cn, cat_id);
	}
	
	
	
	public List<cust_style> getstyles( String cat_id)
	{
		cn = dc.getConnection();
		return dao.getstyles(cn, cat_id);
	}
	
	
	
	
	
	
	public String validateuserlogin(String user_id, String pass)
	{
		cn = dc.getConnection();
		return dao.validateuserlogin(cn, user_id, pass);
	}
	
	
	public Cart viewcart(String user_id)
	{
		cn = dc.getConnection();
		return dao.viewcart(cn, user_id);
	}
	
	public cart1 viewcart1(String user_id)
	{
		cn = dc.getConnection();
		return dao.viewcart1(cn, user_id);
	}
	
	public List<Pre_Measurement> getCategoryWisePreDefinedMeasurements(String cat_id)
	{
		cn = dc.getConnection();
		return dao.getCategoryWisePreDefinedMeasurements(cn, cat_id);
	}
	
	public List<Pre_Sizes> getCategoryWisePreDefinedSizes(String cat_id)
	{
		cn = dc.getConnection();
		return dao.getCategoryWisePreDefinedSizes(cn, cat_id);
	}
	
	
	public String subscribenewsletter(String email)
	{
		cn = dc.getConnection();
		return dao.subscribenewsletter(cn, email);
	}
	
	public SlideShow getSlideShow(String path)
	{
		cn = dc.getConnection();
		return dao.getSlideShow(cn, path);
	}
	
	
	
	
	public Map<String,String> getCategoryBgImg(String cat_id)
	{
		cn = dc.getConnection();
		return dao.getCategoryBgImg(cn, cat_id);
	}
	
	
	
	
	public Boolean validateemail(String email)
	{
		return dao.validateemail(email);
	}
	
	public Boolean validatepass(String pass, String confirmpass)
	{
		return dao.validatepass(pass, confirmpass);
	}
	
	
	
	
	
	
//	db project starts
	public List<db_product> getdbproducts()
	{
		cn = dc.getConnection();
		return dao.getdbproducts(cn);
	}
	
	public List<db_product> getdbproducts(String p_id)
	{
		cn = dc.getConnection();
		return dao.getdbproducts(cn,p_id);
	}
	
	public int placeorder(String cust_id, String p_id, String seller_id)
	{
		cn = dc.getConnection();
		return dao.placeorder(cn,cust_id,p_id,seller_id);
	}
	
	public int cancelorder(String orderid)
	{
		cn = dc.getConnection();
		return dao.cancelorder(cn,orderid);
	}
	
	
	public List<db_order> vieworders(String cust_id)
	{
		cn = dc.getConnection();
		return dao.vieworders(cn,cust_id);
	}
	
	
	
	
	
//	db project ends
	
}

package Khadisutra.khadi;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.sql.PreparedStatement;
//import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
//import java.sql.Statement;

import com.mysql.jdbc.Connection;

public class DAO {
	
	
	
	EmailValidator emailvalidator;
	
	
	
	int items_per_page=32;// number of items to be displayed in single page

	public List<Product> getAllProducts(Connection cn, String main_category, String cat_id, int page_no) {
		List<Product> list = new ArrayList<>();
		PreparedStatement pst;
		Product p1;
		boolean discount_available, show_product;

		try {
			
			String pquery = "select * from data."+main_category+" where p_show_product='true' and p_category_id in ((select category_id from data.categories where category_parent_id=?)) or p_category_id=?  LIMIT "+ (page_no * items_per_page) + ","+items_per_page+"";
			
			pst = cn.prepareStatement(pquery);
			pst.setString(1, cat_id);
			pst.setString(2, cat_id);

//			String query = "select * from data." + main_category + " where p_show_product='true' LIMIT "
//					+ (page_no * 20) + ",20";
			ResultSet rs = pst.executeQuery();

			while (rs.next()) {
				discount_available = Boolean.parseBoolean(rs.getString(8));
				show_product = Boolean.parseBoolean(rs.getString(9));
				p1 = new Product(rs.getString(1), rs.getString(2), rs.getInt(3), rs.getInt(4), rs.getInt(5),
						rs.getString(6), rs.getString(7), discount_available, show_product);
				list.add(p1);
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Collections.shuffle(list);
		return list;

	}

	public List<Categories> getAllCategories(Connection cn) {
		List<Categories> list = new ArrayList<>();

		PreparedStatement pst1;
		String query1 = "select * from data.categories where category_parent_id = '0'";
		PreparedStatement pst2;
		String query2 = "select * from data.categories where category_parent_id = ?";
		PreparedStatement pst3;
		String query3 = "select * from data.categories where category_parent_id = ?";

		ResultSet rs1;
		ResultSet rs2;
		ResultSet rs3;

		String main_id;
		String sub_id;

		// Categories sub_categories_2[]=new Categories[3];
		List<Categories> sub_categories_2 = new ArrayList<>();
		// Categories sub_categories[] = new Categories[3];
		List<Categories> sub_categories = new ArrayList<>();

		final Categories c[], c1[], c2[];
		c = new Categories[450];
		c1 = new Categories[150];
		c2 = new Categories[50];

		int i = 0, j = 0, k = 0;
		try {
			pst1 = cn.prepareStatement(query1);
			rs1 = pst1.executeQuery();
			while (rs1.next()) {
				main_id = rs1.getString(1);
				pst2 = cn.prepareStatement(query2);
				pst2.setString(1, main_id);
				rs2 = pst2.executeQuery();
				// int i=0;
				// sub_categories = new Categories[3];
				while (rs2.next()) {
					sub_id = rs2.getString(1);
					pst3 = cn.prepareStatement(query3);
					pst3.setString(1, sub_id);
					rs3 = pst3.executeQuery();
					// int j = 0;
					// sub_categories_2=new Categories[3];
					while (rs3.next()) {
						c[k] = new Categories(rs3.getString(2), rs3.getString(1));
						// sub_categories_2[j++]=c;
						sub_categories_2.add(c[k]);
						k++;

					}
					// rs3=null;
					// rs3.close();
					pst3.close();
					c1[j] = new Categories(rs2.getString(2),sub_id,  sub_categories_2);
					// sub_categories[i++]=c1;
					sub_categories.add(c1[j]);
					j++;
					sub_categories_2 = null;
					// sub_categories_2.clear();
					sub_categories_2 = new ArrayList<>();

				}
				// rs2=null;
				// rs2.close();
				pst2.close();
				c2[i] = new Categories(rs1.getString(2),main_id,  sub_categories);
				list.add(c2[i]);
				i++;
				sub_categories = null;
				// sub_categories.clear();
				sub_categories = new ArrayList<>();

			}
			pst1.close();
			
			rs1.close();
			
			cn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}

		return list;
	}

	public List<Product_Details> getProduct(Connection cn, String main_category, String p_id)
	{
		List<Product_Details> list = new ArrayList<>();
		PreparedStatement pst;
		String query = "select * from data."+main_category+" AS t1 , data.meta_"+main_category+" AS t2 where t1.p_id=t2.p_id and t1.p_id=?";
		
		boolean discount_available, show_product;
		ResultSet rs;
		Product_Details pd;
//		Product p1;
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, p_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				discount_available = Boolean.parseBoolean(rs.getString(8));
				show_product = Boolean.parseBoolean(rs.getString(9));
//				
				pd = new Product_Details(rs.getString(1), rs.getString(2), rs.getInt(3), rs.getInt(4), rs.getInt(5),
						rs.getString(6), rs.getString(7), discount_available, show_product,
											rs.getString(13),
											rs.getString(14),
											rs.getString(15),
											rs.getString(18).split(","),
											rs.getString(19).split(","),
											rs.getString(21),
											rs.getDouble(22));
				list.add(pd);
				
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
		
		
	}
	
	public int[] getNumberOfPages(Connection cn,
									String main_category,
									String cat_id,
									String[] color,
									String []fabric,
									String orderby,
									int price_from,
									int price_to,
									int discount_from,
									int discount_to,
									int page_no)
	{
		
		int x=0;
		
		List<Object> parameters = new ArrayList<Object>();
		ResultSet rs;
		PreparedStatement pst;
		StringBuilder query = new StringBuilder("select ceil(count(*)/"+items_per_page+") from data." + main_category + " where 1=1 ");

		try {
			// StringBuilder query = new StringBuilder("select * from data.men as t1,
			// data.meta_men as t2 where 1=1");

			if (discount_from != -1 && discount_to != -1) {
				query.append(" AND p_discount>=? ");
				query.append(" AND p_discount<=? ");
				parameters.add(discount_from);
				parameters.add(discount_to);
			}

			if (price_from != -1 && price_to != -1) {
				query.append(" AND p_final_price>=? ");
				query.append(" AND p_final_price<=? ");
				parameters.add(price_from);
				parameters.add(price_to);
			}

			/*
			 * if(color != null || fabric != null) {
			 */
			query.append("and p_id in " + "(select p_id from data.meta_" + main_category + " where 1=1 ");

			if (color.length > 0) {
				query.append(" AND p_color in (");
				for (int i = 0; i < color.length; i++) {
					query.append('?');
					if (i < color.length - 1) {
						query.append(',');
					}
					parameters.add(color[i]);
				}
				query.append(") ");
			}

			if (fabric.length > 0) {
				query.append(" AND p_fabric in (");
				for (int i = 0; i < fabric.length; i++) {
					query.append('?');
					if (i < fabric.length - 1) {
						query.append(',');
					}
					parameters.add(fabric[i]);
				}
				query.append(") ");
			}
			// }

			query.append(" and p_category_id = '"+cat_id+"' "+" or p_category_id in " + "(select category_id from data.categories where category_parent_id = '"+ cat_id + "')) ");

//			if (orderby != null) {
//				query.append("order by " + orderby);
//			}

			if(orderby != null)
			{
				query.append("order by ");
				if(orderby.equals("lowtohigh"))
				{
					query.append("p_final_price ");
				}
				if(orderby.equals("hightolow"))
				{
					query.append("p_final_price desc ");
				}
				if(orderby.equals("bestseller"))
				{
					query.append("p_sold_quantity desc ");
				}
				if(orderby.equals("newestfirst"))
				{
					query.append("p_date desc ");
				}
			}
			
			query.append(" LIMIT "+ (page_no * items_per_page) + ","+items_per_page+"");
			
			String Query = query.toString();
			System.out.println(Query);

			pst = cn.prepareStatement(Query);

			int i = 1;
			for (Object parameter : parameters) {
				pst.setObject(i++, parameter);
			}

			rs = pst.executeQuery();
			rs.next();
			x = rs.getInt(1);
			
			pst.close();
			rs.close();
			cn.close();
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int response[]=new int[x];
		for(int i=1;i<=x;i++)
		{
			response[i-1]=i;
		}
		return response;
		
	}
	
	public List<String> getMainSearchSuggestions(Connection cn, String search)
	{
		List<String> list = new ArrayList<>();
		String query = "select distinct p_name from data.men where p_name like '%"+search+"%' union all select distinct p_name from data.women where p_name like '%"+search+"%' union all select distinct p_name from data.kids where p_name like '%"+search+"%' order by rand() limit 10";
		
		PreparedStatement pst;
		
		try {
			pst = cn.prepareStatement(query);
//			pst.setString(1, search);
//			pst.setString(2, search);
//			pst.setString(3, search);
			
			ResultSet rs = pst.executeQuery();
			while(rs.next())
			{
				list.add(rs.getString(1));
			}
			
			pst.close();
			rs.close();
			cn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
		
	}
	
	public List<Categories> getChildCategories(Connection cn, String cat_id)
	{
		List<Categories> list = new ArrayList<>();
		String query = "select * from data.categories where category_parent_id = ?";
		
		PreparedStatement pst;
		
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, cat_id);
			ResultSet rs = pst.executeQuery();
			while(rs.next())
			{
				list.add(new Categories(rs.getString(2),rs.getString(1)));
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
		
	}
	
	public List<Product> filterproducts(Connection cn,
										String main_category,
										String cat_id,
										String[] color,
										String []fabric,
										String orderby,
										int price_from,
										int price_to,
										int discount_from,
										int discount_to,
										int page_no)
	{
		List<Object> parameters = new ArrayList<Object>();
		ResultSet rs;
		List<Product> list = null;
		Product p1;
		boolean discount_available, show_product;
		PreparedStatement pst;
		StringBuilder query = new StringBuilder("select * from data." + main_category + " where 1=1 ");

		try {
			// StringBuilder query = new StringBuilder("select * from data.men as t1,
			// data.meta_men as t2 where 1=1");

			if (discount_from != -1 && discount_to != -1) {
				query.append(" AND p_discount>=? ");
				query.append(" AND p_discount<=? ");
				parameters.add(discount_from);
				parameters.add(discount_to);
			}

			if (price_from != -1 && price_to != -1) {
				query.append(" AND p_final_price>=? ");
				query.append(" AND p_final_price<=? ");
				parameters.add(price_from);
				parameters.add(price_to);
			}

			/*
			 * if(color != null || fabric != null) {
			 */
			query.append("and p_id in " + "(select p_id from data.meta_" + main_category + " where 1=1 ");

			if (color.length > 0) {
				query.append(" AND p_color in (");
				for (int i = 0; i < color.length; i++) {
					query.append('?');
					if (i < color.length - 1) {
						query.append(',');
					}
					parameters.add(color[i]);
				}
				query.append(") ");
			}

			if (fabric.length > 0) {
				query.append(" AND p_fabric in (");
				for (int i = 0; i < fabric.length; i++) {
					query.append('?');
					if (i < fabric.length - 1) {
						query.append(',');
					}
					parameters.add(fabric[i]);
				}
				query.append(") ");
			}
			// }

			query.append(" and p_category_id = '"+cat_id+"' "+" or p_category_id in " + "(select category_id from data.categories where category_parent_id = '"+ cat_id + "')) ");

//			if (orderby != null) {
//				query.append("order by " + orderby);
//			}

			if(orderby != null)
			{
				query.append("order by ");
				if(orderby.equals("lowtohigh"))
				{
					query.append("p_final_price ");
				}
				if(orderby.equals("hightolow"))
				{
					query.append("p_final_price desc ");
				}
				if(orderby.equals("bestseller"))
				{
					query.append("p_sold_quantity desc ");
				}
				if(orderby.equals("newestfirst"))
				{
					query.append("p_date desc ");
				}
			}
			
			query.append(" LIMIT "+ (page_no * items_per_page) + ","+items_per_page+"");
			
			String Query = query.toString();
			System.out.println(Query);

			pst = cn.prepareStatement(Query);

			int i = 1;
			for (Object parameter : parameters) {
				pst.setObject(i++, parameter);
			}

			rs = pst.executeQuery();
			if (rs != null) {
				list = new ArrayList<Product>();
				while (rs.next()) {
					discount_available = Boolean.parseBoolean(rs.getString(8));
					show_product = Boolean.parseBoolean(rs.getString(9));
					p1 = new Product(rs.getString(1), rs.getString(2), rs.getInt(3), rs.getInt(4), rs.getInt(5),
							rs.getString(6), rs.getString(7), discount_available, show_product);
					list.add(p1);
				}

			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return list;
	}
	    
	public Map<String,List<String>> getDistinctcolorandfabric(Connection cn, String main_category, String cat_id)
	{
		List<String> color = new ArrayList<>();
		List<String> fabric = new ArrayList<>();
		
		Map<String,List<String>> filter = new HashMap<String,List<String>>();
		
		PreparedStatement pst,pst1;
		ResultSet rs,rs1;
		String query_color = "select distinct(p_color) from data.meta_"+main_category+" where  p_category_id in((select category_id from data.categories where category_parent_id=?)) or p_category_id=?";
		String query_fabric = "select distinct(p_fabric) from data.meta_"+main_category+" where  p_category_id in((select category_id from data.categories where category_parent_id=?)) or p_category_id=?";
		
		try {
			pst = cn .prepareStatement(query_color);
			pst.setObject(1, cat_id);
			pst.setString(2, cat_id);
			rs=pst.executeQuery();
			while(rs.next())
			{
				color.add(rs.getString(1));
			}
			filter.put("color", color);
			pst.close();
			rs.close();
			pst1 = cn.prepareStatement(query_fabric);
			pst1.setObject(1, cat_id);
			pst1.setString(2, cat_id);
			rs1 = pst1.executeQuery();
			while(rs1.next())
			{
				fabric.add(rs1.getString(1));
			}
			filter.put("fabric", fabric);
			pst1.close();
			rs1.close();
			cn.close();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return filter;
	}
	
	public List<Categories> getMainCategories(Connection cn)
	{
		List<Categories> list = new ArrayList<>();
		String query = "select * from data.categories where category_parent_id = '0'";
		
		PreparedStatement pst;
		
		
		try {
			pst = cn.prepareStatement(query);
			ResultSet rs = pst.executeQuery();
			while(rs.next())
			{
				list.add(new Categories(rs.getString(2),rs.getString(1)));
			}
			
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	public List<Product_Details> getSellerProducts(Connection cn, String main_category_id, String cat_id)
	{
		List<Product_Details> list = new ArrayList<>();
		String main_category= "";
		PreparedStatement pst,pst1;
		String query1= "select category_name from data.categories where category_id=?";
		try {
			pst1 = cn.prepareStatement(query1);
			pst1.setString(1, main_category_id);
			ResultSet rs1 = pst1.executeQuery();
			while(rs1.next())
			{
				main_category=rs1.getString(1);
			}
			
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		String query = "";
		
		if(cat_id == null)
		{
			query = "select * from data."+main_category+" AS t1 , data.meta_"+main_category+" AS t2 where t1.p_id=t2.p_id";
		}
		else
		{
			query = "select * from data."+main_category+" as t1, data.meta_"+main_category+" as t2 where t1.p_id = t2.p_id and t1.p_category_id in (select category_id from data.categories where category_parent_id=?)";                                       
		}
		System.out.println(query);
		
		boolean discount_available, show_product;
		ResultSet rs;
		Product_Details pd;
//		Product p1;
		
		try {
			pst = cn.prepareStatement(query);
			//pst.setString(1, p_id);
			if(cat_id != null)
			{
				pst.setString(1, cat_id);
			}
			rs = pst.executeQuery();
			while(rs.next())
			{
				discount_available = Boolean.parseBoolean(rs.getString(8));
				show_product = Boolean.parseBoolean(rs.getString(9));
//				
				pd = new Product_Details(rs.getString(1), rs.getString(2), rs.getInt(3), rs.getInt(4), rs.getInt(5),
						rs.getString(6), rs.getString(7), discount_available, show_product,
											rs.getString(13),
											rs.getString(14),
											rs.getString(15),
											rs.getString(18).split(","),
											rs.getString(19).split(","),
											rs.getString(21),
											rs.getDouble(22));
				list.add(pd);
				
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	public List<Product_Details> getSellerSubProducts(Connection cn, String main_category_id, String cat_id)
	{
		List<Product_Details> list = new ArrayList<>();
		String main_category= "";
		PreparedStatement pst,pst1;
		String query1= "select category_name from data.categories where category_id=?";
		try {
			pst1 = cn.prepareStatement(query1);
			pst1.setString(1, main_category_id);
			ResultSet rs1 = pst1.executeQuery();
			while(rs1.next())
			{
				main_category=rs1.getString(1);
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		
		
		
		
		String query = "select * from data."+main_category+" AS t1 , data.meta_"+main_category+" AS t2 where t1.p_id=t2.p_id and t1.p_category_id=?";
		
		boolean discount_available, show_product;
		ResultSet rs;
		Product_Details pd;
//		Product p1;
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, cat_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				discount_available = Boolean.parseBoolean(rs.getString(8));
				show_product = Boolean.parseBoolean(rs.getString(9));
//				
				pd = new Product_Details(rs.getString(1), rs.getString(2), rs.getInt(3), rs.getInt(4), rs.getInt(5),
						rs.getString(6), rs.getString(7), discount_available, show_product,
											rs.getString(13),
											rs.getString(14),
											rs.getString(15),
											rs.getString(18).split(","),
											rs.getString(19).split(","),
											rs.getString(21),
											rs.getDouble(22));
				list.add(pd);
				
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	public List<String> getNewProductId(Connection cn, String main_category, String cat_id)
	{
		List<String> id = new ArrayList<>();
		String str,test,output,test1;
		int temp;
		PreparedStatement pst,pst1;
		ResultSet rs;
		
		String query = "select greatest((select max(p_id) from data."+main_category+" ), (select max(p_id) from data."+main_category+"_pending))";
		String query1;
		
		try {
			pst = cn.prepareStatement(query);
			rs = pst.executeQuery();
			rs.next();
			str = rs.getString(1);
			test = str.split("_")[1];
			temp = Integer.parseInt(test);
			temp = temp +1;
			test1 = String.format("%08d", temp);
			output = main_category.toCharArray()[0] +"_"+test1;
			query1 = "insert into data."+main_category+"_pending (p_id) values (?)";
			pst1 = cn.prepareStatement(query1);
			pst1.setString(1, output);
			System.out.println(query1);
			pst1.executeUpdate();
			id.add(output);
			
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return id;
	}


	public List<Cus_Size> getSizes(Connection cn, String cat_id)
	{
		List<Cus_Size> list = new ArrayList<>();
		String query = "select * from data.sizes where category_id = ?";
		ResultSet rs;
		PreparedStatement pst;
		String size_id,size_name,temp;
		List<String> size_values = new ArrayList<>();
		String[] val_arr;
		Cus_Size s;
		
		
		
		try {
			pst = cn .prepareStatement(query);
			pst.setString(1, cat_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				size_id = rs.getString(1);
				size_name = rs.getString(3);
				temp = rs.getString(4);
				val_arr = temp.split(",");
				for(int i=0; i<val_arr.length; i++)
				{
					size_values.add(val_arr[i]);
				}
				s = new Cus_Size(size_id, size_name, size_values);
				list.add(s);
				size_values = null;
				size_values = new ArrayList<>();				
			}
			
			
			pst.close();
			rs.close();
			cn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
		
		
	}
	
	public String validateuserlogin(Connection cn, String user_id, String pass)
	{
		String output = "0";
		String query = "select * from data.user_credentials where user_id=?";
		PreparedStatement pst;
		ResultSet rs;
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1,user_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				output = "2";
				if(rs.getString(2).equals(pass))
				{
					output = "1";
				}
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return output;
	}
	
	
	public Cart viewcart(Connection cn, String user_id)
	{
		List<Product> list = new ArrayList<>();
		int price=0;
		
		Cart cart = null;
		String query = "select * from data.cart where user_id=?";
		PreparedStatement pst,pst1;
		ResultSet rs,rs1;
		String p_id,query1 = "";
		Product []p1 = new Product[500];
		boolean discount_available, show_product;
		int i=0;
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, user_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
//				list.add(rs.getString(2));
				p_id = rs.getString(3);
				System.out.println("p_id = "+p_id);
				
				if(p_id.charAt(0) == 'm')
				{
					query1 = "select * from data.men where p_id=?";
				}
				if(p_id.charAt(0) == 'w')
				{
					query1 = "select * from data.women where p_id=?";
				}
				if(p_id.charAt(0) == 'k')
				{
					query1 = "select * from data.kids where p_id=?";
				}
				pst1 = cn.prepareStatement(query1);
				pst1.setString(1, p_id);
				rs1 = pst1.executeQuery();
				
				
				while (rs1.next()) {
					discount_available = Boolean.parseBoolean(rs1.getString(8));
					show_product = Boolean.parseBoolean(rs1.getString(9));
					p1[i] = new Product(rs1.getString(1), rs1.getString(2), rs1.getInt(3), rs1.getInt(4), rs1.getInt(5),
							rs1.getString(6), rs1.getString(7), discount_available, show_product);
					price = price + rs1.getInt(5);
					list.add(p1[i]);
					i++;
				}
				pst1.close();
				
				
				
			}
			cart = new Cart(list,price);
			
			
			
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return cart;
	}
	
	
	public List<Pre_Measurement> getCategoryWisePreDefinedMeasurements(Connection cn, String cat_id)
	{
		List<Pre_Measurement> list = new ArrayList<>();
		Pre_Measurement pm;
		
		PreparedStatement pst;
		ResultSet rs;
		String query = "select * from data.cat_wise_pre_measurements where cat_id=?";
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, cat_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				pm = new Pre_Measurement(rs.getString(2), rs.getString(3));
				list.add(pm);
				
			}
			
			
			
			pst.close();
			rs.close();
			cn.close();
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<Pre_Sizes> getCategoryWisePreDefinedSizes(Connection cn, String cat_id)
	{
		List<Pre_Sizes> list = new ArrayList<>();
		Map<String, Double> map;
		String [] measurements;
		StringBuilder strbldr = new StringBuilder("select pre_size_id,pre_size_label,pre_size_name");
		String query1;
		Pre_Sizes ps;
		
		PreparedStatement pst,pst1;
		ResultSet rs,rs1;
		
		List<String> str = new ArrayList<>();
		
		String query = "select measurement_name from data.cat_wise_pre_measurements where cat_id=?";
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, cat_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				str.add(rs.getString(1));
			}
			measurements = str.toArray(new String[str.size()]);
			
			for(int i=0;i<measurements.length;i++)
			{
				strbldr.append(" ,"+measurements[i] + " ");
			}
			strbldr.append(" from data.cat_wise_pre_sizes where cat_id=?");
			
			query1=strbldr.toString();
			pst1 = cn.prepareStatement(query1);
			pst1.setString(1, cat_id);
			rs1 = pst1.executeQuery();
			while(rs1.next())
			{
				map = new HashMap<String, Double>();
				for(int j=0;j<measurements.length;j++)
				{
					map.put(measurements[j], rs1.getDouble(j+4));
				}
				ps = new Pre_Sizes(rs1.getString(1),rs1.getString(2),rs1.getString(3),map);
				list.add(ps);
			}
			
			
			pst.close();
			rs.close();
			cn.close();
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return list;
	}
	
	
	
	
	public String subscribenewsletter(Connection cn, String email)
	{
		java.util.Date dt = new java.util.Date();

		java.text.SimpleDateFormat sdf = 
		     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		String currentTime = sdf.format(dt);
		String query = "insert into data.user_subscription (user_email, subscription_date) values(?,?)";
		PreparedStatement pst;
//		ResultSet rs;
		String output;
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1,email);
			pst.setString(2, currentTime);
			pst.executeUpdate();
			output = "1";
			
			
			
			pst.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			output = "0";
			e.printStackTrace();
		}
		return output;
	}
	
	
	
	
	public SlideShow getSlideShow(Connection cn, String path)
	{
		SlideShow output= new SlideShow();
		String query = "select slide_photo from data.slideshow where slide_path = ?";
		PreparedStatement pst;
		ResultSet rs;
		List<String> list = new ArrayList<>();
		int count=0;

		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, path);
			rs = pst.executeQuery();
			
			while(rs.next())
			{
				
				list.add(rs.getString(1));
				count++;
				
			}
			output = new SlideShow(count, list);
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return output;
	}
	
	
	
	
	public List<Cus_Style> getStyles(Connection cn, String cat_id)
	{
		List<Cus_Style> list = new ArrayList<>();
		String query = "select * from data.styles where cat_id = ?";
		ResultSet rs;
		PreparedStatement pst;
		String size_id,size,temp,temp1;
		List<String> size_values = new ArrayList<>();
		List<String> size_name = new ArrayList<>();
		String[] val_arr,val_arr1;
		Cus_Style s;
		
		
		
		try {
			pst = cn .prepareStatement(query);
			pst.setString(1, cat_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				size_id = rs.getString(1);
				size = rs.getString(3);
				temp = rs.getString(4);
				val_arr = temp.split(",");
				temp1 = rs.getString(5);
				val_arr1 = temp1.split(",");
				for(int i=0; i<val_arr.length; i++)
				{
					size_name.add(val_arr[i]);
					size_values.add(val_arr1[i]);
				}
				s = new Cus_Style(size_id,size, size_name, size_values);
				list.add(s);
				size_values = null;
				size_values = new ArrayList<>();				
			}
			
			
			pst.close();
			rs.close();
			cn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
		
		
	}
	
	
	
	public List<cust_style> getstyles(Connection cn, String cat_id)
	{
		List<cust_style> list = new ArrayList<>();
		String query = "select * from data.styles where cat_id = ?";
		ResultSet rs;
		PreparedStatement pst;
		String size_id,size,temp,temp1;
		List<Map<String,String>> style_values = new ArrayList<>();
		Map<String,String> map = new HashMap<String,String>();
		String[] val_arr,val_arr1;
		cust_style s[] = new cust_style[10];
		int j = 0;
		
		
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, cat_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				size_id = rs.getString(1);
				size = rs.getString(3);
				temp = rs.getString(4);
				val_arr = temp.split(",");
				temp1 = rs.getString(5);
				val_arr1 = temp1.split(",");
				for(int i=0; i<val_arr.length; i++)
				{
					map.put("name",val_arr[i]);
					map.put("photo",  val_arr1[i]);
					style_values.add(map);
					map = new HashMap<String,String>();
				}
				s[j] = new cust_style(size_id,size, style_values);
				list.add(s[j]);
				j++;
				style_values = new ArrayList<>();
//				size_values = null
//				size_values = new ArrayList<>();
//				stle_values = new HashMap<String,String>();
			}
			
			
			pst.close();
			rs.close();
			cn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
		
		
	}
	
	
	
	public Map<String,String> getCategoryBgImg(Connection cn, String cat_id)
	{
		Map<String,String> map = new HashMap<String,String>();
		String query = "select img_path,category_name from data.category_bg_img where category_id = ?";
		ResultSet rs;
		PreparedStatement pst;
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, cat_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
				map.put("imgpath", rs.getString(1));
				map.put("category_name", rs.getString(2));
			}
			
			
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
	
	
	
	
	
	
	
	
	
	public cart1 viewcart1(Connection cn, String user_id)
	{
		List<Product_cart> list = new ArrayList<>();
		int price=0;
		
		cart1 cart = null;
		String query = "select * from data.cart where user_id=?";
		PreparedStatement pst,pst1;
		ResultSet rs,rs1;
		String p_id,query1 = "";
		Product_cart []p1 = new Product_cart[500];
		boolean discount_available, show_product;
		int i=0;
		
		String main_category="";
		
		try {
			pst = cn.prepareStatement(query);
			pst.setString(1, user_id);
			rs = pst.executeQuery();
			while(rs.next())
			{
//				list.add(rs.getString(2));
				p_id = rs.getString(3);
				System.out.println("p_id = "+p_id);
				
				if(p_id.charAt(0) == 'm')
				{
					query1 = "select * from data.men where p_id=?";
					main_category = "men";
				}
				if(p_id.charAt(0) == 'w')
				{
					query1 = "select * from data.women where p_id=?";
					main_category = "women";
				}
				if(p_id.charAt(0) == 'k')
				{
					query1 = "select * from data.kids where p_id=?";
					main_category = "kids";
				}
				pst1 = cn.prepareStatement(query1);
				pst1.setString(1, p_id);
				rs1 = pst1.executeQuery();
				
				
				while (rs1.next()) {
					discount_available = Boolean.parseBoolean(rs1.getString(8));
					show_product = Boolean.parseBoolean(rs1.getString(9));
					p1[i] = new Product_cart(main_category,rs1.getString(1), rs1.getString(2), rs1.getInt(3), rs1.getInt(4), rs1.getInt(5),
							rs1.getString(6), rs1.getString(7), discount_available, show_product);
					price = price + rs1.getInt(5);
					list.add(p1[i]);
					i++;
				}
				pst1.close();
				
				
				
			}
			cart = new cart1(list,price);
			
			
			
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return cart;
	}
	
	
	
	public Boolean validateemail(String email)
	{
		emailvalidator = new EmailValidator();
		if(emailvalidator.validateEmail(email))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	
	public Boolean validatepass(String pass,String confirmpass)
	{
		emailvalidator = new EmailValidator();
		return emailvalidator.validatepass(pass, confirmpass);
	}
	
	
	
	
	//db project starts
	
	public List<db_product> getdbproducts(Connection cn) {
		List<db_product> list = new ArrayList<>();
		PreparedStatement pst;
		db_product p1;

		try {
			
			String pquery = "select * from dbproject.Product";
			
			pst = cn.prepareStatement(pquery);
			ResultSet rs = pst.executeQuery();

			while (rs.next()) {
				p1 = new db_product(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
						rs.getInt(6), rs.getInt(7));
				list.add(p1);
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Collections.shuffle(list);
		System.out.println(list);
		return list;

	}
	
	
	
	
	public List<db_product> getdbproducts(Connection cn, String p_id) {
		List<db_product> list = new ArrayList<>();
		PreparedStatement pst;
		db_product p1;

		try {
			
			String pquery = "select * from dbproject.Product where ProductId =?";
			
			
			pst = cn.prepareStatement(pquery);
			pst.setString(1, p_id);
			ResultSet rs = pst.executeQuery();

			while (rs.next()) {
				p1 = new db_product(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
						rs.getInt(6), rs.getInt(7));
				list.add(p1);
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;

	}
	
	
	
	public int placeorder(Connection cn, String cust_id, String p_id, String seller_id) {
		Boolean flag;
		PreparedStatement pst,pst1;
		int max=0;
		int rs=0;
		
		
		
		java.util.Date dt = new java.util.Date();

		java.text.SimpleDateFormat sdf = 
		     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		String currentTime = sdf.format(dt);

		try {
			String query = "select orderid from dbproject.orders";
			pst1 = cn.prepareStatement(query);
			ResultSet rs1 = pst1.executeQuery();
			while(rs1.next()) {
				int temp = Integer.parseInt(rs1.getString(1));
				max = max > temp ? max : temp; 
			}
			
			String pquery = "insert into dbproject.orders values(?,?,?,?,?,?)";
			
			
			pst = cn.prepareStatement(pquery);
			pst.setString(1, String.valueOf(++max));
			pst.setString(2, cust_id);
			pst.setString(3, p_id);
			pst.setString(4, currentTime);
			pst.setString(5, currentTime);
			pst.setString(6, seller_id);
			rs = pst.executeUpdate();

			pst.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rs;

	}
	
	
	
	public int cancelorder(Connection cn, String orderid) {
		
		PreparedStatement pst;
		int flag = 0;

		try {
			
			String pquery = "delete from dbproject.orders where OrderId =?";
			
			
			pst = cn.prepareStatement(pquery);
			pst.setString(1, orderid);
			flag = pst.executeUpdate();
			

			
			pst.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return flag;
	}
	
	
	
	
	
	
	public List<db_order> vieworders(Connection cn, String cust_id) {
		List<db_order> list = new ArrayList<>();
		PreparedStatement pst,pst1;
		db_order p1;

		try {
			
			String pquery = "select * from dbproject.Orders where CustId =?";
			
			
			pst = cn.prepareStatement(pquery);
			pst.setString(1, cust_id);
			ResultSet rs = pst.executeQuery();
			
			
			int price=0;
			String img = "";
			

			while (rs.next()) {
				
				String p_id= rs.getString(3);
				String pquery1 = "select Price, Image from dbproject.Product where p_id =?";
				
				
				pst1 = cn.prepareStatement(pquery1);
				pst1.setString(1, p_id);
				ResultSet rs1 = pst.executeQuery();
				while(rs1.next())
				{
					price = rs1.getInt(1);
					img = rs1.getString(2);
					
				}
				p1 = new db_order(rs.getString(1).toString(), 
						rs.getString(2).toString(), 
						rs.getString(3).toString(),
						rs.getString(4).toString(), 
						rs.getString(5).toString(),
						rs.getString(6).toString(),
						String.valueOf(price),
						img);
				list.add(p1);
			}
			pst.close();
			rs.close();
			cn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;

	}
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	//db project ends
	
	
	
	
	
	
	
}


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


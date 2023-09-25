package Khadisutra.khadi;

import java.util.List;
import java.util.Map;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("controller")
public class Controller {

    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getIt() {
        return "Got it!";
    }
    
    ServiceImpl se = new ServiceImpl();
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getAllProducts")
    public List<Product> getAllProducts(@QueryParam("main_category") String main_category,
    										@QueryParam("cat_id") String cat_id,
    										@QueryParam("page_no") int page_no)
    {
    	return se.getAllProducts(main_category, cat_id, page_no);
    }
    
    
    
    
    @Path("/getAllCategories")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Categories> getAllCategories()
    {
    	return se.getAllCategories();
    }
    
    @Path("/getallcategories")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getallcategories()
    {
    	
    	return Response.status(200).entity(se.getAllCategories()).build();
//    	return se.getAllCategories();
    }
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getProduct")
    public List<Product_Details> getProduct(@QueryParam("main_category") String main_category,
    											@QueryParam ("p_id") String p_id)
    {
    	return se.getProduct(main_category, p_id);
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getNumberOfPages")
    public int[] getNumberOfPages(@QueryParam("main_category") String main_category,
									@QueryParam("cat_id") String cat_id,
									@QueryParam("color") List<String> color,
									@QueryParam("fabric") List<String> fabric,
									@QueryParam("orderby") String orderby,
									@QueryParam("price_from") String price_from,
									@QueryParam("price_to") String price_to,
									@QueryParam("discount_from") String discount_from,
									@QueryParam("discount_to") String discount_to,
									@QueryParam("page_no") int page_no)
    {
    	return se.getNumberOfPages(main_category,
									cat_id,
									color.toArray(new String[color.size()]),
									fabric.toArray(new String[fabric.size()]),
									orderby,
									price_from,
									price_to,
									discount_from,
									discount_to,
									page_no);	
    }
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getMainSearchSuggestions")
    public List<String> getMainSearchSuggestions(@QueryParam("search") String search)
    {
    	return se.getMainSearchSuggestions(search);
    }
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getChildCategories")
    public List<Categories> getChildCategories(@QueryParam("cat_id") String cat_id)
    {
    	return se.getChildCategories(cat_id);
    }
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/filter")
    public List<Product> filterProducts(@QueryParam("main_category") String main_category,
    										@QueryParam("cat_id") String cat_id,
    										@QueryParam("color") List<String> color,
    										@QueryParam("fabric") List<String> fabric,
    										@QueryParam("orderby") String orderby,
    										@QueryParam("price_from") String price_from,
    										@QueryParam("price_to") String price_to,
    										@QueryParam("discount_from") String discount_from,
    										@QueryParam("discount_to") String discount_to,
    										@QueryParam("page_no") int page_no)
    {
    	return se.filterproducts(main_category,
    								cat_id,
    								color.toArray(new String[color.size()]),
    								fabric.toArray(new String[fabric.size()]),
    								orderby,
    								price_from,
    								price_to,
    								discount_from,
    								discount_to,
    								page_no);
    }
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getDistinctcolorandfabric")
    public Map<String,List<String>> getDistinctcolorandfabric(@QueryParam("main_category") String main_category,
    															@QueryParam("cat_id") String cat_id)
    {
    	return se.getDistinctcolorandfabric(main_category,cat_id);
    }
    
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/postdemo")
    public String postdemo(@FormParam("param") String name)
    {
    	return "hello" + name + "!!";
    }
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getMainCategories")
    public List<Categories> getMainCategories()
    {
    	return se.getMainCategories();
    }
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/seller_AllProducts")
    public List<Product_Details> getSellerProducts(@QueryParam("main_category") String main_category,
    												@QueryParam("cat_id") String cat_id)
    {
    	return se.getSellerProducts(main_category,cat_id);
    }
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/seller_SubProducts")
    public List<Product_Details> getSellerSubProducts(@QueryParam("main_category") String main_category,
    												@QueryParam("cat_id") String cat_id)
    {
    	return se.getSellerSubProducts(main_category,cat_id);
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getNewProductId")
    public List<String> getNewProductId(@QueryParam("main_category") String main_category,
											@QueryParam("cat_id") String cat_id)
    {
    	return se.getNewProductId(main_category,cat_id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getSizes")
    public List<Cus_Size> getSizes(@QueryParam("cat_id") String cat_id)
    {
    	return se.getSizes( cat_id);
    }
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getStyles")
    public List<Cus_Style> getStyles(@QueryParam("cat_id") String cat_id)
    {
    	return se.getStyles( cat_id);
    }
    
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getstyles")
    public List<cust_style> getstyles(@QueryParam("cat_id") String cat_id)
    {
    	return se.getstyles( cat_id);
    }
    
    
    
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/validateuserlogin")
    public String validateuserlogin(@FormParam("user_id") String user_id,
    									@FormParam("pass") String pass)
    {
    	return se.validateuserlogin(user_id, pass);
    }
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/viewcart")
    public Cart viewcart(@FormParam("user_id") String user_id)
    {
    	return se.viewcart(user_id);
    }
    
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/viewcart1")
    public cart1 viewcart1(@FormParam("user_id") String user_id)
    {
    	return se.viewcart1(user_id);
    }
    
    
    
    
    
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getCategoryWisePreDefinedMeasurements")
    public List<Pre_Measurement> getCategoryWisePreDefinedMeasurements(@QueryParam("cat_id") String cat_id)
    {
    	return se.getCategoryWisePreDefinedMeasurements(cat_id); 
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getCategoryWisePreDefinedSizes")
    public List<Pre_Sizes> getCategoryWisePreDefinedSizes(@QueryParam("cat_id") String cat_id)
    {
    	return se.getCategoryWisePreDefinedSizes(cat_id);
    }
    
    
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/subscribenewsletter")
    public String subscribenewsletter(@FormParam("email") String email)
    {
    	return se.subscribenewsletter(email);
    	
    	
    }
    
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getSlideShow")
    public SlideShow getSlideShow(@QueryParam("path") String path)
    {
    	return se.getSlideShow(path);
    }
    
    
    
    @GET 
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getCategoryBgImg")
    public Map<String,String> getCategoryBgImg(@QueryParam("cat_id") String cat_id)
    {
    		return se.getCategoryBgImg(cat_id);
    }
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/validateemail")
    public Boolean validateemail(@FormParam("email") String email)
    {
    	return se.validateemail(email);
    }
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/validatepass")
    public Boolean validatepass(@FormParam("pass") String pass,
    							@FormParam("confirmpass") String confirmpass)
    {
    	return se.validatepass(pass, confirmpass);
    }
    
    
    
    
//    db project starts
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getdbproducts")
    public List<db_product> getdbproducts()
    {
    	return se.getdbproducts();
    }
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getdbproduct")
    public List<db_product> getdbproduct(@FormParam("p_id") String p_id)
    {
    	return se.getdbproducts(p_id);
    }
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/placeorder")
    public int placeorder(@FormParam("cust_id") String cust_id,
    							@FormParam("p_id") String p_id,
    							@FormParam("seller_id") String seller_id)
    {
    	return se.placeorder(cust_id,p_id,seller_id);
    }
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/cancelorder")
    public int cancelorder(@FormParam("orderid") String orderid)
    {
    	return se.cancelorder(orderid);
    }
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/vieworders")
    public List<db_order> vieworders(@FormParam("cust_id") String cust_id)
    {
    	return se.vieworders(cust_id);
    }
    
    
    
    
//    db project ends
    
    
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


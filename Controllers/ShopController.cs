using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shopping_Cart_NEXT.Model;
using System.Data;
using System.Data.SqlClient;

namespace Shopping_Cart_NEXT.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ShopController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("ProductsList")]

        public Response GetAllProducts()
        {
            List<Products> lstproducts = new List<Products>();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ShoppingCon")?.ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Products;", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Products products = new Products();
                    products.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    products.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    products.Image = Convert.ToString(dt.Rows[i]["Image"]);
                    products.ActualPrice = Convert.ToDecimal(dt.Rows[i]["ActualPrice"]);
                    products.DiscountedPrice = Convert.ToDecimal(dt.Rows[i]["DiscountedPrice"]);
                    lstproducts.Add(products);
                }
                if (lstproducts.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Data found";
                    response.listProducts = lstproducts;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No data found";
                    response.listProducts = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No data found";
                response.listProducts = null;
            }
            return response;
        }
    }
}

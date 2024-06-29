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
        [Route("Images")]

        public Response GetImages()
        {
            List<Products> lstproducts = new List<Products>();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ShoppingCon")?.ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Images;", connection);
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

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("CategoryProducts")]

        public Response GetCategoryProducts()
        {
            List<Products> lstproducts = new List<Products>();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ShoppingCon")?.ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Images;", connection);
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

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("AddProduct")]
        public Response AddProduct(Products products)
        {
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ShoppingCon")?.ToString());
            Response response = new Response();
            if (products.Id > 0)
            {
                SqlCommand cmd = new SqlCommand("Insert into ShoppingCart(ProductID) VALUES('" + products.Id + "')", connection);
                connection.Open();
                int i = cmd.ExecuteNonQuery();
                connection.Close();
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Item added";
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No item added";
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No item found";

            }
            return response;

        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("RemoveProduct")]
        public Response RemoveProduct(Products products)
        {
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ShoppingCon")?.ToString());
            Response response = new Response();
            if (products.Id > 0)
            {
                SqlCommand cmd = new SqlCommand("Delete from ShoppingCart where ProductId = ('" + products.Id + "')", connection);
                connection.Open();
                int i = cmd.ExecuteNonQuery();
                connection.Close();
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Item removed";
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No item removed";
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No item found";

            }
            return response;

        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("ShoppingCart")]
        public Response ShoppingCart()
        {
            List<Products> lstproducts = new List<Products>();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ShoppingCon")?.ToString());
            SqlDataAdapter da = new SqlDataAdapter("select P.ID, P.Name, P.Image, P.ActualPrice, P.DiscountedPrice from ShoppingCart C INNER JOIN Images P ON C.ProductID = P.Id;", connection);
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

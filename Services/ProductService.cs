using Shopping_Cart_NEXT.Models;
using Shopping_Cart_NEXT.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Shopping_Cart_NEXT.Services
{
    public class ProductService : IProductService
    {
        private readonly string _connectionString;

        public ProductService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ShoppingCon")
                ?? throw new ArgumentNullException(nameof(configuration), "Connection string 'ShoppingCon' not found.");
        }

        private List<Products> MapDataTableToProducts(DataTable dt)
        {
            List<Products> products = new List<Products>();

            foreach (DataRow row in dt.Rows)
            {
                Products product = new Products
                {
                    p_id = Convert.ToInt32(row["prod_id"]),
                    p_name = Convert.ToString(row["prod_name"]),
                    p_cat_id = Convert.ToInt32(row["prod_cat_id"]),
                    p_price = row["prod_price"] != DBNull.Value ? Convert.ToDecimal(row["prod_price"]) : 0,
                    p_price_discounted = row["prod_price_discounted"] != DBNull.Value ? Convert.ToDecimal(row["prod_price_discounted"]) : 0,
                    p_desc_short = Convert.ToString(row["prod_desc_short"]),
                    p_desc_full = Convert.ToString(row["prod_desc_full"]),
                    p_article_num = Convert.ToString(row["prod_article_num"]),
                    p_tags = Convert.ToString(row["prod_tags"]),
                    p_is_stone = Convert.ToBoolean(row["prod_is_stone"]),
                    p_label = Convert.ToString(row["prod_label"]),
                };
                products.Add(product);
            }

            return products;
        }

        public List<Products> GetAllProducts()
        {
            DataTable dt = new DataTable();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string sql = "SELECT * FROM Products;";

                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                }
            }

            return MapDataTableToProducts(dt);
        }

        public List<Products> GetProductsByCategory(string cat_name)
        {
            DataTable dt = new DataTable();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string sql = "SELECT p.*, c.cat_name FROM Products p INNER JOIN Categories c ON p.prod_cat_id = c.cat_id WHERE c.cat_name = @CategoryName or p.prod_label = @CategoryName;";

                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    cmd.Parameters.AddWithValue("@CategoryName", cat_name);
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                }
            }

            return MapDataTableToProducts(dt);
        }

    }
}


        

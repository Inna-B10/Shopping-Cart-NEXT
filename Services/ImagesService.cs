using Microsoft.Extensions.Configuration;
using Shopping_Cart_NEXT.Models;
using Shopping_Cart_NEXT.Services.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Shopping_Cart_NEXT.Services
{
    public class ImagesService : IImagesService
    {
        private readonly string _connectionString;

        public ImagesService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ShoppingCon")
                ?? throw new ArgumentNullException(nameof(configuration), "Connection string 'ShoppingCon' not found.");
        }

        private List<Images> MapDataTableToProducts(DataTable dt)
        {
            List<Images> products = new List<Images>();

            foreach (DataRow row in dt.Rows)
            {
                Images product = new Images
                {
                    Id = Convert.ToInt32(row["ID"]),
                    Name = Convert.ToString(row["Name"]),
                    Image = Convert.ToString(row["Image"]),
                    ActualPrice = row["ActualPrice"] != DBNull.Value ? Convert.ToDecimal(row["ActualPrice"]) : 0,
                    DiscountedPrice = row["DiscountedPrice"] != DBNull.Value ? Convert.ToDecimal(row["DiscountedPrice"]) : 0,
                    // Добавьте другие поля здесь
                };
                products.Add(product);
            }

            return products;
        }

        public List<Images> GetImages()
        {
            DataTable dt = new DataTable();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string sql = "SELECT * FROM Images;"; 

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

        public List<Images> GetCategoryProducts()
        {
            DataTable dt = new DataTable();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string sql = "SELECT * FROM Images;"; 

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

        public List<Images> GetShoppingCart()
        {
            DataTable dt = new DataTable();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string sql = "select P.ID, P.Name, P.Image, P.ActualPrice, P.DiscountedPrice from ShoppingCart C INNER JOIN Images P ON C.ProductID = P.Id;"; // Измените SQL-запрос на подходящий для вашей таблицы

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

        public async Task<Response> AddProductAsync(int productId)
        {
            Response response = new Response();

            if (productId > 0)
            {
                string sql = "INSERT INTO ShoppingCart(ProductID) VALUES(@ProductId)";

                try
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, connection))
                        {
                            cmd.Parameters.AddWithValue("@ProductId", productId);

                            await connection.OpenAsync();
                            int i = await cmd.ExecuteNonQueryAsync();
                            if (i > 0)
                            {
                                response.StatusCode = 200;
                                response.StatusMessage = "Item added";
                            }
                            else
                            {
                                response.StatusCode = 204;
                                response.StatusMessage = "No item added";
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    response.StatusCode = 500;
                    response.StatusMessage = "Error: " + ex.Message;
                }
            }
            else
            {
                response.StatusCode = 400;
                response.StatusMessage = "Invalid product ID";
            }

            return response;
        }

        public async Task<Response> RemoveProductAsync(int productId)
        {
            Response response = new Response();

            if (productId > 0)
            {
                string sql = "Delete from ShoppingCart where ProductId = @ProductId";

                try
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, connection))
                        {
                            cmd.Parameters.AddWithValue("@ProductId", productId);

                            await connection.OpenAsync();
                            int i = await cmd.ExecuteNonQueryAsync();
                            if (i > 0)
                            {
                                response.StatusCode = 200;
                                response.StatusMessage = "Item removed";
                            }
                            else
                            {
                                response.StatusCode = 204;
                                response.StatusMessage = "No item removed";
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    response.StatusCode = 500;
                    response.StatusMessage = "Error: " + ex.Message;
                }
            }
            else
            {
                response.StatusCode = 400;
                response.StatusMessage = "Invalid product ID";
            }

            return response;
        }
    }
}

﻿using Microsoft.Extensions.Configuration;
using Shopping_Cart_NEXT.Models;
using Shopping_Cart_NEXT.Services.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Shopping_Cart_NEXT.Services
{
    public class UserService : IUserService
    { 
        private readonly string _connectionString;

        public UserService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ShoppingCon")
                ?? throw new ArgumentNullException(nameof(configuration), "Connection string 'ShoppingCon' not found.");
        }

        public List<Users> GetUserData(int userId)
        {
            DataTable dt = new DataTable();
            string sql = "SELECT * FROM Users WHERE user_id = @UserId;";

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    connection.Open();
                    object result = cmd.ExecuteScalar();
                    connection.Close();
                
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                }
            }

            List<Users> users = new List<Users>();

            foreach (DataRow row in dt.Rows)
            {
                Users user = new Users
                {
                    user_id = Convert.ToInt32(row["user_id"]),
                    user_level = Convert.ToInt32(row["user_level"]),
                    user_email = Convert.ToString(row["user_email"]),
                    user_Fname = Convert.ToString(row["user_Fname"]),
                    user_Lname = Convert.ToString(row["user_Lname"]),
                };
                users.Add(user);
            }

            return users;
        }
        public async Task<Response> LoginAsync(string userEmail, string userPassword)
        {
            Response response = new Response();
            if (userEmail != null && userPassword != null)
            { 
                string sql = "SELECT user_id FROM Users WHERE user_email = @User_email AND user_password = @User_password";
                try
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, connection))
                        {
                            cmd.Parameters.AddWithValue("@User_email", userEmail);
                            cmd.Parameters.AddWithValue("@User_password", userPassword);

                            await connection.OpenAsync();
                            var userIdObject = await cmd.ExecuteScalarAsync();
                            await connection.CloseAsync();
                            if (userIdObject != null && int.TryParse(userIdObject.ToString(), out int userId))
                            {
                                response.StatusCode = 200;
                                response.StatusMessage = "Login successful";
                                response.UserId = userId;
                            }
                            else
                            {
                                response.StatusCode = 204;
                                response.StatusMessage = "Wrong email and/or password";
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
                response.StatusMessage = "Invalid user data";
            }

            return response;
        }
             
        public async Task<Response> CheckEmailAsync(string userEmail)
        {
            Response response = new Response();
            if (userEmail != null)
            {
                string sql = "SELECT 1 FROM Users WHERE user_email = @User_email";
                try
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, connection))
                        {
                            cmd.Parameters.AddWithValue("@User_email", userEmail);

                            await connection.OpenAsync();
                            object result = await cmd.ExecuteScalarAsync();
                            await connection.CloseAsync();
                            if (result != null)
                            {
                                response.StatusCode = 200;
                                response.StatusMessage = "User with this email already exist";
                            }
                            else
                            {
                                response.StatusCode = 204;
                                response.StatusMessage = "User does not exist";
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    response.StatusCode = 500;
                    response.StatusMessage = "CheckEmail Error: " + ex.Message;
                }
            }
            else
            {
                response.StatusCode = 400;
                response.StatusMessage = "CheckEmail: Invalid user data";
            }

            return response;
        }

        public async Task<Response> RegistrationAsync(string userEmail, string userPassword, string userFname, string userLname)
        {
            Response response = new Response();

            if (userEmail != null && userPassword != null && userFname != null && userLname != null)
            {
                // Check if the email already exists
                Response emailCheckResponse = await CheckEmailAsync(userEmail);
                if (emailCheckResponse.StatusCode == 200)
                {
                    response.StatusCode = 409; // Conflict
                    response.StatusMessage = "User with this email already exists";
                    return response;
                }

                else if (emailCheckResponse.StatusCode == 204)
                {
                    string sql = @"
                DECLARE @NewUserIdTable TABLE (user_id INT);

                INSERT INTO Users(user_email, user_password, user_Fname, user_Lname)
                OUTPUT INSERTED.user_id INTO @NewUserIdTable
                VALUES(@User_email, @User_password, @User_Fname, @User_Lname);

                SELECT user_id FROM @NewUserIdTable;
            ";

                    try
                    {
                        using (SqlConnection connection = new SqlConnection(_connectionString))
                        {
                            using (SqlCommand cmd = new SqlCommand(sql, connection))
                            {
                                cmd.Parameters.AddWithValue("@User_email", userEmail);
                                cmd.Parameters.AddWithValue("@User_password", userPassword);
                                cmd.Parameters.AddWithValue("@User_Fname", userFname);
                                cmd.Parameters.AddWithValue("@User_Lname", userLname);

                                await connection.OpenAsync();
                                var userIdObject = await cmd.ExecuteScalarAsync();
                                await connection.CloseAsync();
                                if (userIdObject != null && int.TryParse(userIdObject.ToString(), out int userId))
                                {
                                    response.StatusCode = 201;
                                    response.StatusMessage = "Registration completed successfully";
                                    response.UserId = userId;
                                }
                                else
                                {
                                    response.StatusCode = 100;
                                    response.StatusMessage = "Registration error. Please try again";
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
                    response.StatusCode = emailCheckResponse.StatusCode;
                    response.StatusMessage = "Error: " + emailCheckResponse.StatusMessage;
                }
            }
            else
            {
                response.StatusCode = 400;
                response.StatusMessage = "Invalid user data";
            }

            return response;

        }
//-------------------------------------Shopping cart----------------------------------------------------------------
        public async Task<Response> GetShoppingCartAsync(int userId)
        {
            Response response = new Response();
            DataTable dt = new DataTable();
            
            string sql = "SELECT p.*, sc.sc_prod_quantity FROM Products p INNER JOIN ShoppingCarts sc ON p.prod_id = sc.sc_prod_id WHERE sc.sc_user_id = @UserId;";
            
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand(sql, connection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        await connection.OpenAsync();

                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            dt.Load(reader);
                        }
                    }
                    response.StatusCode = 200; // Assuming 200 for success
                    response.StatusMessage = "Shopping cart retrieved successfully.";
                    response.listProducts = MapDataTableToProducts(dt);
                }
                catch (Exception ex)
                {
                    // Handle the exception (log it, rethrow it, etc.)
                    response.StatusCode = 500; // Assuming 500 for server error
                    response.StatusMessage = "An error occurred while retrieving the shopping cart: " + ex.Message;
                    response.listProducts = new List<Products>(); // Return an empty list in case of an error
                }
                finally
                {
                    connection.Close();
                }
            }
            return response;
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
                    p_quantity = Convert.ToInt32(row["prod_quantity"]),
                    sc_prod_quantity = Convert.ToInt32(row["sc_prod_quantity"]),
                };
                products.Add(product);
            }

            return products;
        }
        public async Task<Response> AddProductAsync(int userId, int prodId)
        {
            Response response = new Response();

            if (userId > -1 && prodId > 0)
            {
                string sql = "INSERT INTO ShoppingCarts(sc_user_id, sc_prod_id) VALUES(@UserId, @ProdId)";

                try
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, connection))
                        {
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            cmd.Parameters.AddWithValue("@ProdId", prodId);

                            await connection.OpenAsync();
                            int i = await cmd.ExecuteNonQueryAsync();
                            await connection.CloseAsync();
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

        public async Task<Response> RemoveProductAsync(int userId, int prodId)
        {
            Response response = new Response();

            if (userId > -1 && prodId > 0)
            {
                string sql = "DELETE FROM ShoppingCarts WHERE sc_user_id = @UserId AND sc_prod_id = @ProdId";

                try
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, connection))
                        {
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            cmd.Parameters.AddWithValue("@ProdId", prodId);

                            await connection.OpenAsync();
                            int i = await cmd.ExecuteNonQueryAsync();
                            await connection.CloseAsync();
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

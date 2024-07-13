using Microsoft.Extensions.Configuration;
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
        //public async Task<Response> LogginAsync()
        //{
        //    Response response = new Response();
        //    return response;
        //}

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

                    string sql = "INSERT INTO Users(user_email,user_password,user_Fname,user_Lname) VALUES(@User_email,@User_password,@User_Fname,@User_Lname)";

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
                                int i = await cmd.ExecuteNonQueryAsync();
                                await connection.CloseAsync();
                                if (i > 0)
                                {
                                    response.StatusCode = 201;
                                    response.StatusMessage = "Registration completed successfully";
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
    }
}

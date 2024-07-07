using Shopping_Cart_NEXT.Models;
using Shopping_Cart_NEXT.Services.Interfaces;
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
        public async Task<Response> LogginAsync()
        {
            Response response = new Response();
            return response;

        }
        public async Task<Response> LogoutAsync(int user_id)
        {
            Response response = new Response();
            return response;

        }
        public async Task<Response> RegistrationAsync(Users user)
        {
            Response response = new Response();

            if (user != null)
            {
                string sql = "INSERT INTO Users(user_email,user_password,user_Fname,user_Lname)" +
                    "VALUES(@User_email,@User_password,@User_Fname,@User_Lname)";

                try
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, connection))
                        {
                            cmd.Parameters.AddWithValue("@User_email", user.user_email);
                            cmd.Parameters.AddWithValue("@User_password", user.user_password);
                            cmd.Parameters.AddWithValue("@User_Fname", user.user_Fname);
                            cmd.Parameters.AddWithValue("@User_Lname", user.user_Lname);

                            await connection.OpenAsync();
                            int i = await cmd.ExecuteNonQueryAsync();
                            await connection.CloseAsync();
                            if (i > 0)
                            {
                                response.StatusCode = 200;
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
                response.StatusCode = 100;
                response.StatusMessage = "Invalid user data";
            }

            return response;

        }
    }
}

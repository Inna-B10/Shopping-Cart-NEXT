using Shopping_Cart_NEXT.Models;

namespace Shopping_Cart_NEXT.Services.Interfaces
{
    public interface IUserService
    {
        //Task<Response> LogginAsync(string user_email, string user_password);
        //Task<Response> LogoutAsync(int user_id);
        Task<Response> RegistrationAsync(Users user);
    }
}

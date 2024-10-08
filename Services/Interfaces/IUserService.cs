﻿using Shopping_Cart_NEXT.Models;

namespace Shopping_Cart_NEXT.Services.Interfaces
{
    public interface IUserService
    {
        Task<Response> LoginAsync(string user_email, string user_password);
        Task<Response> RegistrationAsync(string userEmail, string userPassword, string userFname, string userLname);
        List<Users> GetUserData(int userId);
        Task<Response> GetUserProductsAsync(string table, int userId);
        Task<Response> GetProductsByIdsAsync(List<int> productIdList);
        Task<Response> AddProductAsync(string table, int userId, int prodId);
        Task<Response> RemoveProductAsync(string table, int userId, int prodId);
    }
}

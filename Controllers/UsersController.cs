using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shopping_Cart_NEXT.Models;
using Shopping_Cart_NEXT.Services;
using Shopping_Cart_NEXT.Services.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace Shopping_Cart_NEXT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UsersController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("GetUserData")]

        public Response GetUserData (int userId)
        {
            var user = _userService.GetUserData(userId);
            Response response = new Response();

            if (user != null && user.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User found";
                response.listUsers = user;
            }
            else
            {
                response.StatusCode = 204;
                response.StatusMessage = "No user with this id found";
                response.listUsers = null;
            }
            return response;
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("Registration")]
        public async Task<IActionResult> Registration(Users user)
        {
            {
                var response = await _userService.RegistrationAsync(user.user_email, user.user_password,user.user_Fname,user.user_Lname);
                return StatusCode(response.StatusCode, response);
            }
        }
        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(string userEmail, string userPassword)
        {
            {
                var response = await _userService.LoginAsync(userEmail, userPassword);
                return StatusCode(response.StatusCode, response);
            }
        }
    }
}

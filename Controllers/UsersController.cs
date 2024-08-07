using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
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
//-------------------------------------Registration------------------------------------------------------------------
        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("Registration")]
        public async Task<IActionResult> Registration([FromBody] UserRegistrationRequest request)
        {
            {
                var response = await _userService.RegistrationAsync(request.UserEmail, request.UserPasswordHash, request.UserFname, request.UserLname);
                return StatusCode(response.StatusCode, response);
            }
        }
//-------------------------------------Login------------------------------------------------------------------------
        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            {
                var response = await _userService.LoginAsync(request.UserEmail, request.UserPassword);
                return StatusCode(response.StatusCode, response);
            }
        }
//----------------------------------------Shopping cart--------------------------------------------------------------
        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("GetUserProducts")]
        public async Task<IActionResult> GetUserProducts(string table=null, int userId = -1, string? productIds = null)
        {
            if (table == null)
            {
                Response response = new Response();
                {
                    response.StatusCode = 400;
                    response.StatusMessage = "Invalid request data";
                }
                return StatusCode(response.StatusCode, response);
            }
            else
            {
                if (userId > -1)
                {
                    var response = await _userService.GetUserProductsAsync(table, userId);
                    return StatusCode(response.StatusCode, response);
                }
                else if (productIds != null)
                {
                    List<int> productIdList = productIds.Split(',').Select(id => int.Parse(id)).ToList();
                    var response = await _userService.GetProductsByIdsAsync(productIdList);
                    return StatusCode(response.StatusCode, response);
                }
                else if (userId == -1 && productIds == null && table== "shoppingCart")
                {
                    Response response = new Response();
                    {
                        response.StatusCode = 200;
                        response.StatusMessage = "Shopping cart is empty";
                        response.listProducts = new List<Products>();
                    }
                    return StatusCode(response.StatusCode, response);
                }
                else if (userId == -1 && productIds == null && table == "favorites")
                {
                    Response response = new Response();
                    {
                        response.StatusCode = 200;
                        response.StatusMessage = "Favorites list is empty";
                        response.listProducts = new List<Products>();
                    }
                    return StatusCode(response.StatusCode, response);
                }
                else
                {
                    Response response = new Response();
                    {
                        response.StatusCode = 400;
                        response.StatusMessage = "Invalid request data";
                    }
                    return StatusCode(response.StatusCode, response);
                }
            }
        }



        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct(int userId, int prodId, string table = null)
        {
            if (table == null || userId == -1)
            {
                Response response = new Response();
                {
                    response.StatusCode = 400;
                    response.StatusMessage = "Invalid request data";
                }
                return StatusCode(response.StatusCode, response);
            }
            else
            {
                var response = await _userService.AddProductAsync(table, userId, prodId);
                return StatusCode(response.StatusCode, response);
            }
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("RemoveProduct")]
        public async Task<IActionResult> RemoveProduct(int userId, int prodId, string table = null)
        {
            if (table == null || userId == -1)
            {
                Response response = new Response();
                {
                    response.StatusCode = 400;
                    response.StatusMessage = "Invalid request data";
                }
                return StatusCode(response.StatusCode, response);
            }
            else
            {
                {
                    var response = await _userService.RemoveProductAsync(table, userId, prodId);
                    return StatusCode(response.StatusCode, response);
                }
            }

        }
    }

    // Класс для регистрации, используется для привязки данных из запроса
    public class UserRegistrationRequest
    {
        public string UserEmail { get; set; }
        public string UserPasswordHash { get; set; }
        public string UserFname { get; set; }
        public string UserLname { get; set; }
    }


    // Класс для входа, используется для привязки данных из запроса
    public class LoginRequest
    {
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
    }
}

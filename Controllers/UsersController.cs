﻿using Microsoft.AspNetCore.Cors;
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
        //private readonly IImagesService _imageService;
        //private readonly ICategoryService _categoryService;
        //private readonly IProductService _productService;

        //public UsersController(IConfiguration configuration, IImagesService imageService, ICategoryService categoryService, IProductService productService)
        public UsersController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
            //_imageService = imageService;
            //_categoryService = categoryService;
            //_productService = productService;
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
    }
}

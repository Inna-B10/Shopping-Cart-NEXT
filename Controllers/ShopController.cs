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
    
    public class ShopController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        public ShopController(IConfiguration configuration, ICategoryService categoryService, IProductService productService)
        {
            _configuration = configuration;
            _categoryService = categoryService;
            _productService = productService;
        }

        [EnableCors("MyPolicy")]
        [HttpGet("Categories")]
        public Response GetCategories()
        {
            {
                var categories = _categoryService.GetCategories();
                Response response = new Response();

                if (categories != null && categories.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Categories found";
                    response.listCategories = categories;
                }
                else
                {
                    response.StatusCode = 204;
                    response.StatusMessage = "No categories found";
                    response.listCategories = null;
                }
                return response;
            }
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("Products")]
        public Response GetProducts(string? cat_name = null)
        {
            var products = string.IsNullOrEmpty(cat_name) ? _productService.GetAllProducts() : _productService.GetProductsByCategory(cat_name);
            Response response = new Response();

            if (products != null && products.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Products found";
                response.listProducts = products;
            }
            else
            {
                response.StatusCode = 204;
                response.StatusMessage = "No products found";
                response.listProducts = null;
            }
            return response;
        }
    }
}

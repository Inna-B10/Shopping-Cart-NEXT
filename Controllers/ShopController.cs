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
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        public ShopController(IConfiguration configuration, IProductService productService, ICategoryService categoryService)
        {
            _configuration = configuration;
            _productService = productService;
            _categoryService = categoryService;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("Images")]
        public Response GetImages()
        {
            var products = _productService.GetImages();
            Response response = new Response();

            if (products != null && products.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listProducts = products;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No data found";
                response.listProducts = null;
            }
            return response;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("CategoryProducts")]
        public Response GetCategoryProducts()
        {
            var products = _productService.GetCategoryProducts();
            Response response = new Response();

            if (products != null && products.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listProducts = products;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No data found";
                response.listProducts = null;
            }
            return response;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("ShoppingCart")]
        public Response GetShoppingCart()
        {
            var products = _productService.GetShoppingCart();
            Response response = new Response();

            if (products != null && products.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listProducts = products;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No data found";
                response.listProducts = null;
            }
            return response;
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct(Products products)
        {     
            var response = await _productService.AddProductAsync(products.Id);
            return StatusCode(response.StatusCode, response);
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("RemoveProduct")]
        public async Task<IActionResult> RemoveProduct(Products products)
        {
            {
                var response = await _productService.RemoveProductAsync(products.Id);
                return StatusCode(response.StatusCode, response);
            }

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
                    response.StatusMessage = "Data found";
                    response.listCategories = categories;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No data found";
                    response.listCategories = null;
                }
                return response;
            }
        }
    }
}

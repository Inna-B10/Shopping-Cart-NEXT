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
        private readonly IImagesService _imageService;
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        public ShopController(IConfiguration configuration, IImagesService imageService, ICategoryService categoryService, IProductService productService)
        {
            _configuration = configuration;
            _imageService = imageService;
            _categoryService = categoryService;
            _productService = productService;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("Images")]
        public Response GetImages()
        {
            var products = _imageService.GetImages();
            Response response = new Response();

            if (products != null && products.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listImages = products;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No data found";
                response.listImages = null;
            }
            return response;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("CategoryProducts")]
        public Response GetCategoryProducts()
        {
            var products = _imageService.GetCategoryProducts();
            Response response = new Response();

            if (products != null && products.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listImages = products;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No data found";
                response.listImages = null;
            }
            return response;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("ShoppingCart")]
        public Response GetShoppingCart()
        {
            var products = _imageService.GetShoppingCart();
            Response response = new Response();

            if (products != null && products.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listImages = products;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No data found";
                response.listImages = null;
            }
            return response;
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct(Images products)
        {     
            var response = await _imageService.AddProductAsync(products.Id);
            return StatusCode(response.StatusCode, response);
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        [Route("RemoveProduct")]
        public async Task<IActionResult> RemoveProduct(Images products)
        {
            {
                var response = await _imageService.RemoveProductAsync(products.Id);
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
    }
}

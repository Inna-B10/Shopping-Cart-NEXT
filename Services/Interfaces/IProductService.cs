using Shopping_Cart_NEXT.Models;

namespace Shopping_Cart_NEXT.Services.Interfaces
{
    public interface IProductService
    {
        List<Products> GetAllProducts();
        List<Products> GetProductsByCategory(string cat_name);
    }
}


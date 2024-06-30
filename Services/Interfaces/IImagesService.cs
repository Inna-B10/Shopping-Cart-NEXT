using Shopping_Cart_NEXT.Models;
using System.Threading.Tasks;

namespace Shopping_Cart_NEXT.Services.Interfaces
{
    public interface IImagesService
    {
        List<Images> GetImages();
        List<Images> GetCategoryProducts();
        List<Images> GetShoppingCart();
        Task<Response> AddProductAsync(int productId);
        Task<Response> RemoveProductAsync(int productId);
    }
}

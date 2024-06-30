using Shopping_Cart_NEXT.Models;
using System.Threading.Tasks;

namespace Shopping_Cart_NEXT.Services.Interfaces
{
    public interface IProductService
    {
        List<Products> GetProducts();
    }
}


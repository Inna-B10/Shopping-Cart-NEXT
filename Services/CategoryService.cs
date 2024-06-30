using Shopping_Cart_NEXT.Models;
using Shopping_Cart_NEXT.Services.Interfaces;
using System.Data.SqlClient;
using System.Data;

namespace Shopping_Cart_NEXT.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly string _connectionString;

        public CategoryService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ShoppingCon")
                ?? throw new ArgumentNullException(nameof(configuration), "Connection string 'ShoppingCon' not found.");
        }

        private List<Categories> MapDataTableToCategories(DataTable dt)
        {
            List<Categories> categories = new List<Categories>();

            foreach (DataRow row in dt.Rows)
            {
                Categories category = new Categories
                {
                    cat_name = Convert.ToString(row["cat_name"])
                };
                categories.Add(category);
            }

            return categories;
        }

        public List<Categories> GetCategories()
        {
            DataTable dt = new DataTable();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string sql = "select cat_name from Categories union all select prod_label from Products";

                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                }
            }

            return MapDataTableToCategories(dt);
        }



    }

}

namespace Shopping_Cart_NEXT.Model
{
    public class Products
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public decimal ActualPrice { get; set; }
        public decimal DiscountedPrice { get; set; }
    }
}

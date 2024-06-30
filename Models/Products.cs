namespace Shopping_Cart_NEXT.Models
{
    public class Products
    {
        public int p_id { get; set; }
        public string? p_name { get; set; }
        public int p_cat_id { get; set; }
        public decimal p_price { get; set; }
        public decimal p_price_discounted { get; set; }
        public string? p_desc_short { get; set; }
        public string? p_desc_full { get; set; }
        public string? p_article_num { get; set; }
        public string? p_tags {  get; set; }
        public bool p_is_stone { get; set; }
        public string? p_label { get; set; }

    }
}

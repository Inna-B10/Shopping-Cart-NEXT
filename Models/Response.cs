﻿namespace Shopping_Cart_NEXT.Models
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string? StatusMessage { get; set; }
        public List<Images>? listImages { get; set; }
        public List<Categories>? listCategories { get; set; }
        public List<Products>? listProducts { get; set; }
    }
}

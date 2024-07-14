using System.ComponentModel.DataAnnotations;

namespace Shopping_Cart_NEXT.Models
{
    public class Users
    {
        public int user_id { get; set; }
        public int user_level { get; set; } = 1;
        [Required]
        public string user_email { get; set; }
        [Required]
        public string user_password { get; set; }
        [Required]
        public string user_Fname { get; set; }
        [Required]
        public string user_Lname { get; set; }
        public DateTime user_joindate { get; set; } = DateTime.Now;
        public int? user_address_id { get; set; }

    }
}


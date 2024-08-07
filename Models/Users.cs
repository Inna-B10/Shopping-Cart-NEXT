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
        public string user_password_hash { get; set; }
        [Required]
        public string user_Fname { get; set; }
        [Required]
        public string user_Lname { get; set; }
        public DateTime user_joindate { get; set; } = DateTime.Now;
        public int? user_address_id { get; set; }
        public int? user_fav_count { get; set; } = 0;
        public int? user_sc_count { get; set; } = 0;

    }
}


using System;
using System.ComponentModel.DataAnnotations;

namespace ThunderPhone.Models
{
    public class BrandsModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Brand { get; set; }
    }
}

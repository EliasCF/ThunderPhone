using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace ThunderPhone.Models
{
    public class ProductsModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid ProductId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public int ColorId { get; set; }
        [ForeignKey("ColorId")]
        public ColorsModel Color { get; set; }

        [Required]
        public int BrandId { get; set; }
        [ForeignKey("BrandId")]
        public BrandsModel Brand { get; set; }

        [Required]
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public CategoriesModel Category { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public DateTime AdditionDate { get; set; }
    }
}

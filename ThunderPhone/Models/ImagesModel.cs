using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThunderPhone.Models
{
    public class ImagesModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string ImagePath { get; set; }
        
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public ProductsModel Product { get; set; }
    }
}

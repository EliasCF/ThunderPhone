using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThunderPhone.Models
{
    public class CommentsModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Comment { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        public DateTime SubmitionDate { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public ProductsModel Product { get; set; }
    }
}

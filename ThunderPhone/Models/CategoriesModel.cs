using System.ComponentModel.DataAnnotations;

namespace ThunderPhone.Models
{
    public class CategoriesModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Category { get; set; }
    }
}

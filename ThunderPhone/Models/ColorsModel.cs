using System.ComponentModel.DataAnnotations;

namespace ThunderPhone.Models
{
    public class ColorsModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Color { get; set; }
    }
}

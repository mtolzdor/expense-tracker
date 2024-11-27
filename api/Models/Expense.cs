using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Expense
    {
        public int Id { get; set; }
        [Required]
        public string? UserId { get; set; }
        public int CatagoryId { get; set; }
        public DateTime PurchaseDate { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
        public AppUser User { get; set; } = null!;
        public Catagory Catagory { get; set; } = null!;
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int CatagoryId { get; set; }
        public DateTime PurchaseDate { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
        public AppUser? User { get; set; }
        public Catagory? Catagory { get; set; }
    }
}
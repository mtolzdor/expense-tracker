using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Catagory
    {
        public int Id { get; set; }
        [StringLength(60)]
        [Required]
        public string? Name { get; set; }
        public List<Expense> Expenses { get; } = new List<Expense>();

    }
}
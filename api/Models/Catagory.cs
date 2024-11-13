using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Catagory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<Expense> Expenses { get; } = new List<Expense>();

    }
}
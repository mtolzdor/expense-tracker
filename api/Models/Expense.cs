namespace api.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string UserId { get; set; } = null!;
        public int CatagoryId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double Price { get; set; }
        public AppUser User { get; set; } = null!;
        public Catagory Catagory { get; set; } = null!;
    }
}
namespace api.Dtos.Expense
{
    public class UpdateExpenseDto
    {
        public int Id { get; set; }
        public int CatagoryId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double Price { get; set; }
    }
}
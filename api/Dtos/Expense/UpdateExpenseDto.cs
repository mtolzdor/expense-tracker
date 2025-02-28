namespace api.Dtos.Expense
{
    public class UpdateExpenseDto
    {
        public int CatagoryId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Price { get; set; }
    }
}
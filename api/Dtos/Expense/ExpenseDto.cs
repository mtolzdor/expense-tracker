namespace api.Dtos.Expense
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public string? CatagoryName { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Price { get; set; }
    }
}

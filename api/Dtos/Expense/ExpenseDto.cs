namespace api.Dtos.Expense
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public string CatagoryName { get; set; } = string.Empty;
        public DateTime PurchaseDate { get; set; }
        public double Price { get; set; }
    }
}

namespace api.Dtos
{
    public class CreateExpenseDto
    {
        public int CatagoryId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Price { get; set; }

    }
}
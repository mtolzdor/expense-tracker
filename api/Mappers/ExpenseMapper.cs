using api.Dtos;
using api.Dtos.Expense;
using api.Models;

namespace api.Mappers
{
    public static class ExpenseMapper
    {
        public static ExpenseDto ToExpenseDto(this Expense expense)
        {
            return new ExpenseDto
            {
                Id = expense.Id,
                CatagoryName = expense.Catagory.Name,
                PurchaseDate = expense.PurchaseDate,
                Price = expense.Price
            };
        }
        public static Expense ToExpenseFromCreate(this CreateExpenseDto expenseDto, string userId)
        {
            return new Expense
            {
                UserId = userId,
                CatagoryId = expenseDto.CatagoryId,
                PurchaseDate = expenseDto.PurchaseDate,
                Price = expenseDto.Price
            };
        }
    }
}
using api.Dtos.Expense;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IExpenseRepository
    {
        Task<Expense?> GetExpenseByIdAsync(int id);
        Task<List<Expense>> GetExpensesAsync(AppUser user, QueryObject query);
        Task<Expense> CreateExpenseAsync(Expense expense);
        Task<Expense?> UpdateExpenseAsync(int id, UpdateExpenseDto expense);
        Task<Expense?> DeleteExpenseAsync(AppUser user, int id);
    }
}
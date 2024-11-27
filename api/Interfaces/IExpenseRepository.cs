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
        void DeleteExpenseAsync(AppUser user, int id);
    }
}
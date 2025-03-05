using api.Data;
using api.Dtos.Expense;
using api.Helpers;
using api.Interfaces;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Repositorys
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ApplicationDbContext _context;
        public ExpenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Expense> CreateExpenseAsync(Expense expense)
        {

            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<Expense?> DeleteExpenseAsync(AppUser user, int id)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(x => x.UserId == user.Id && x.Id == id);

            if (expense == null)
            {
                return null;
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return expense;

        }

        public async Task<Expense?> GetExpenseByIdAsync(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task<List<Expense>> GetExpensesAsync(AppUser user, QueryObject query)
        {
            var expenses = _context.Expenses
            .Where(x => x.UserId == user.Id)
            .Select(e => new Expense
            {
                Id = e.Id,
                UserId = e.UserId,
                CatagoryId = e.CatagoryId,
                Price = e.Price,
                PurchaseDate = e.PurchaseDate,
                User = e.User,
                Catagory = e.Catagory
            });

            if (!string.IsNullOrWhiteSpace(query.CatagoryName))
            {
                expenses = expenses.Where(e => e.Catagory.Name.Contains(query.CatagoryName));
            }

            if (!string.IsNullOrWhiteSpace(query.FilterBy))
            {
                var weekStart = DateTime.Today.AddDays(DayOfWeek.Monday - DateTime.Today.DayOfWeek);

                if (query.FilterBy.Equals("Week", StringComparison.OrdinalIgnoreCase))
                {
                    expenses = expenses.Where(x => x.PurchaseDate >= weekStart && x.PurchaseDate <= weekStart.AddDays(7));
                }
                if (query.FilterBy.Equals("Month", StringComparison.OrdinalIgnoreCase))
                {
                    expenses = expenses.Where(x => x.PurchaseDate.Month == DateTime.Now.Month);
                }
                if (query.FilterBy.Equals("3 Months", StringComparison.OrdinalIgnoreCase))
                {
                    expenses = expenses.Where(x => x.PurchaseDate.Month >= DateTime.Today.AddMonths(-2).Month);
                }
            }
            if (query.StartDate != null && query.EndDate != null)
            {
                expenses = expenses.Where(x => x.PurchaseDate >= query.StartDate && x.PurchaseDate <= query.EndDate);
            }

            var skipNumber = (query.Page - 1) * query.PageSize;

            return await expenses.Skip(skipNumber).Take(query.PageSize).OrderBy(e => e.Id).ToListAsync();
        }

        public async Task<Expense?> UpdateExpenseAsync(int id, UpdateExpenseDto expenseDto)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
            {
                return null;
            }

            expense.CatagoryId = expenseDto.CatagoryId;
            expense.Price = expenseDto.Price;
            expense.PurchaseDate = expenseDto.PurchaseDate;

            await _context.SaveChangesAsync();

            return expense;

        }
    }
}
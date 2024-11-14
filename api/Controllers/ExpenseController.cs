using api.Data;
using api.Dtos.Expense;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IDateTime _dateTime;

        public ExpenseController(ApplicationDbContext context, UserManager<AppUser> userManager, IDateTime dateTime)
        {
            _context = context;
            _userManager = userManager;
            _dateTime = dateTime;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
            {
                return BadRequest("expense not found");
            }

            return Ok(expense.ToExpenseDto());
        }
        [HttpGet]
        public async Task<IActionResult> GetAllExpenses([FromQuery] QueryObject query)
        {
            var userName = User.GetUserName();
            var currentUser = await _userManager.FindByNameAsync(userName);

            if (currentUser == null)
            {
                return BadRequest("Account not found");
            }

            var expenses = _context.Expenses.Where(u => u.UserId == currentUser.Id);

            if (!string.IsNullOrWhiteSpace(query.CatagoryName))
            {
                expenses = expenses.Where(e => e.Catagory.Name.Contains(query.CatagoryName));
            }

            if (!string.IsNullOrWhiteSpace(query.FilterBy))
            {
                var weekStart = _dateTime.WeekStart;
                var today = _dateTime.Today;
                var month = _dateTime.Month;
                var pastMonths = _dateTime.PastMonths;

                if (query.FilterBy.Equals("Week", StringComparison.OrdinalIgnoreCase))
                {
                    expenses = expenses.Where(x => x.PurchaseDate >= weekStart && x.PurchaseDate <= weekStart.AddDays(7));
                }
                if (query.FilterBy.Equals("Month", StringComparison.OrdinalIgnoreCase))
                {
                    expenses = expenses.Where(x => x.PurchaseDate.Month == month);
                }
                if (query.FilterBy.Equals("3 Months", StringComparison.OrdinalIgnoreCase))
                {
                    expenses = expenses.Where(x => x.PurchaseDate.Month >= pastMonths);
                }
            }
            if (query.StartDate != null && query.EndDate != null)
            {
                expenses = expenses.Where(x => x.PurchaseDate >= query.StartDate && x.PurchaseDate <= query.EndDate);
            }

            var expenseModel = expenses.Select(e => new ExpenseDto
            {
                Id = e.Id,
                CatagoryName = e.Catagory.Name,
                PurchaseDate = e.PurchaseDate,
                Price = e.Price
            });

            return Ok(await expenses.ToListAsync());

        }
        [HttpPost("{catagoryId:int}")]
        public async Task<IActionResult> CreateExpense([FromRoute] int catagoryId, [FromBody] decimal price)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userName = User.GetUserName();
            var currentUser = await _userManager.FindByNameAsync(userName);

            if (currentUser == null)
            {
                return NotFound("Log-in or create an account");
            }

            var catagory = await _context.Catagories.FindAsync(catagoryId);

            if (catagory == null)
            {
                return NotFound("Catagory not found");
            }

            var expense = new Expense
            {
                UserId = currentUser.Id,
                CatagoryId = catagory.Id,
                PurchaseDate = _dateTime.Now,
                Price = price
            };

            await _context.AddAsync(expense);
            await _context.SaveChangesAsync();

            if (expense == null)
            {
                return StatusCode(500, "Could not create Expense");
            }
            else
            {
                return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense.ToExpenseDto());
            }

        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateExpense([FromRoute] int id, [FromBody] UpdateExpenseDto expenseDto)
        {

            if (id != expenseDto.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            expense.CatagoryId = expenseDto.CatagoryId;
            expense.Price = expenseDto.Price;
            expense.PurchaseDate = expenseDto.PurchaseDate;

            await _context.SaveChangesAsync();

            return NoContent();

        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteExpense([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}
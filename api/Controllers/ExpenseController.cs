using System.Text.Json.Serialization;
using api.Data;
using api.Dtos;
using api.Dtos.Expense;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repositorys;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepo;
        private readonly UserManager<AppUser> _userManager;

        public ExpenseController(IExpenseRepository expenseRepo, UserManager<AppUser> userManager)
        {
            _expenseRepo = expenseRepo;
            _userManager = userManager;
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetExpense([FromRoute] int id)
        {
            return Ok(await _expenseRepo.GetExpenseByIdAsync(id));
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllExpenses([FromQuery] QueryObject query)
        {
            var userName = User.GetUserName();
            var currentUser = await _userManager.FindByNameAsync(userName);

            if (currentUser == null)
            {
                return BadRequest("Account not found");
            }

            var expenses = await _expenseRepo.GetExpensesAsync(currentUser, query);

            if (expenses == null)
            {
                return NotFound("Create a new Expense");
            }

            var expenseDto = expenses.Select(e => new ExpenseDto
            {
                Id = e.Id,
                CatagoryName = e.Catagory.Name,
                PurchaseDate = e.PurchaseDate,
                Price = e.Price
            }).ToList();

            return Ok(expenseDto);

        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseDto expenseDto)
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

            var expenseModel = expenseDto.ToExpenseFromCreate(currentUser.Id);

            await _expenseRepo.CreateExpenseAsync(expenseModel);
            return Ok();
            //return CreatedAtAction(nameof(GetExpense), new { id = expenseModel.Id }, expenseModel.ToExpenseDto());

        }
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateExpense([FromRoute] int id, [FromBody] UpdateExpenseDto expenseDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var expense = await _expenseRepo.UpdateExpenseAsync(id, expenseDto);

            if (expense == null)
            {
                return NotFound();
            }

            return NoContent();

        }
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteExpense([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userName = User.GetUserName();
            var currentUser = await _userManager.FindByNameAsync(userName);

            if (currentUser == null)
            {
                return BadRequest("Account not found");
            }

            var expense = await _expenseRepo.DeleteExpenseAsync(currentUser, id);

            if (expense == null)
            {
                return NotFound();
            }

            return NoContent();

        }
    }
}
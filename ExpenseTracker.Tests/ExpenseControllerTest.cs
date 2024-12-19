using System.ComponentModel.DataAnnotations;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Identity.Client;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Moq;


namespace ExpenseTracker.Tests;

public class ExpenseControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    //private readonly Mock<IExpenseRepository> _expenseRepositoy;
    public ExpenseControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task ExpenseController_GetExpensesAsync_ReturnsOK()
    {
        // Arange
        var mockUser = new Mock<AppUser>();
        var mockQueryObj = new Mock<QueryObject>();
        var mockExpenseRepo = new Mock<IExpenseRepository>();
        var expense = new Mock<List<Expense>>()'
        var request = new HttpRequestMessage(new HttpMethod("GET"), "/api/expenses");

        //Act
        var response = await _client.SendAsync(request);

        //Assert
        response.EnsureSuccessStatusCode();

    }
}
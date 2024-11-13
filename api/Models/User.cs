using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Client;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public List<Expense> Expenses { get; } = new List<Expense>();
    }
}
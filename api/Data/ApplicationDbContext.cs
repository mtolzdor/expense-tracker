using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        public DbSet<Catagory> Catagories { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Catagory>().HasData(
                new Catagory { Id = 1, Name = "Groceries" },
                new Catagory { Id = 2, Name = "Leisure" },
                new Catagory { Id = 3, Name = "Electronics" },
                new Catagory { Id = 4, Name = "Utilities" },
                new Catagory { Id = 5, Name = "Clothing" },
                new Catagory { Id = 6, Name = "Health" },
                new Catagory { Id = 7, Name = "Others" }
            );
        }
    }
}
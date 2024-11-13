using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
    public class NewUserDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Email { get; set; }
        public string? Token { get; set; }
    }
}
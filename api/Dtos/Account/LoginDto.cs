using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
    public class LoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
using System.Reflection.Metadata.Ecma335;
using api.Models;

namespace api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
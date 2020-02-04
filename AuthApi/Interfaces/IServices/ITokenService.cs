using AuthApi.Helpers;
using AuthApi.Models;

namespace AuthApi.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}

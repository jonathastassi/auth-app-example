using AuthApi.Helpers;
using AuthApi.Models;

namespace AuthApi.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(User user);
    }
}

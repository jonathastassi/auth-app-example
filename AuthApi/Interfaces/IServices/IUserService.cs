using AuthApi.Helpers;
using AuthApi.Models;

namespace AuthApi.Interfaces
{
    public interface IUserService
    {
        public AuthInfo Login(User user);
        public User Create(User user);
    }
}
using AuthApi.Helpers;
using AuthApi.Models;

namespace AuthApi.Interfaces
{
    public interface IUserService
    {
        AuthInfo Login(User user);
        User Create(User user);
    }
}
using AuthApi.Models;

namespace AuthApi.Interfaces.IRepositories
{
    public interface IUserRepository
    {
        User Exists(string email);

        User Post(User user);

    }
}
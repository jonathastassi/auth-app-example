using AuthApi.Models;

namespace AuthApi.Interfaces.IRepositories
{
    public interface IUserRepository
    {
        public User Exists(string email);

        public User Post(User user);

    }
}
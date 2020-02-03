using AuthApi.Helpers;
using AuthApi.Interfaces;
using AuthApi.Interfaces.IRepositories;
using AuthApi.Models;

namespace AuthApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenService tokenService;

        public UserService(
            IUserRepository userRepository,
            ITokenService tokenService
        )
        {
            this.userRepository = userRepository;
            this.tokenService = tokenService;
        }

        public User Create(User user)
        {
            try
            {
                if (string.IsNullOrEmpty(user.Name))
                    throw new System.Exception("Informe o nome do usuário!");
                if (string.IsNullOrEmpty(user.Email))
                    throw new System.Exception("Informe o e-mail do usuário!");
                if (string.IsNullOrEmpty(user.Password))
                    throw new System.Exception("Informe a senha do usuário!");

                if (this.userRepository.Exists(user.Email) != null) 
                    throw new System.Exception("E-mail já está em uso!");                

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                User userCreated = this.userRepository.Post(user);

                userCreated.Password = null;

                return userCreated;
            }
            catch
            {
                throw;
            }
        }

        public AuthInfo Login(User user)
        {
            try
            {
                if (string.IsNullOrEmpty(user.Email))
                    throw new System.Exception("Informe o e-mail do usuário!");
                if (string.IsNullOrEmpty(user.Password))
                    throw new System.Exception("Informe a senha do usuário!");        

                User userAuth = this.userRepository.Exists(user.Email);

                if (BCrypt.Net.BCrypt.Verify(user.Password, userAuth.Password))
                {
                    userAuth.Password = null;
                    
                    string token = this.tokenService.GenerateToken(userAuth);

                    return new AuthInfo(true, userAuth, token);                    
                }
                return new AuthInfo(false);  
            }
            catch
            {
                throw;
            }
        }
    }
}
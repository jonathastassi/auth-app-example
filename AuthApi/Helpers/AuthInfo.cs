using AuthApi.Models;

namespace AuthApi.Helpers
{
    public class AuthInfo
    {
        public bool authenticate { get; }
        public User user { get; }
        public string token { get; }

        public AuthInfo(
            bool authenticate, User user = null, string token = null
        )
        {
            this.authenticate = authenticate;
            this.user = user;
            this.token = token;
        }
    }
}
using System;
using AuthApi.Data;
using AuthApi.Interfaces.IRepositories;
using AuthApi.Models;
using MongoDB.Driver;

namespace AuthApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MongoDbContext context;

        public UserRepository(
            MongoDbContext context
        )
        {
            this.context = context;
        }

        public User Exists(string email)
        {
            try
            {
                return this.context.Users.Find(u => u.Email.ToLower() == email.ToLower()).FirstOrDefault();
            }
            catch (System.Exception)
            {                
                throw;
            }
        }

        public User Post(User user)
        {
            try
            {
                this.context.Users.InsertOne(user);
                return user;
            }
            catch (System.Exception)
            {                
                throw;
            }
        }
    }
}
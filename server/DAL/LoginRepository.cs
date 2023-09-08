using Microsoft.EntityFrameworkCore;
using server.DAL;
using server.Models;
using server.Controllers;

namespace server.DAL
{
    public class LoginRepository : ILoginRepository
    {
        private readonly ILogger<LoginController> _logger;
        private readonly DB _db;

        public LoginRepository(ILogger<LoginController> logger, DB db)
        {
            _logger = logger;
            _db = db;
        }

        public async Task<User?> FetchOrCreateUser(string email)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                try
                {
                    var newUser = new User
                    {
                        Email = email,
                        Id = Guid.NewGuid().ToString(),
                    };

                    _db.Users.Add(newUser);
                    await _db.SaveChangesAsync();

                    _logger.LogInformation("[LoginRepository]: Sucsessfully created user with email: '{email}' and id: '{id}'", newUser.Email, newUser.Id);
                    return newUser;
                }
                catch (Exception e)
                {
                    _logger.LogInformation("[LoginRepository]: There was an error creating user  with email: '{email}' - {e}", email, e.Message);
                    return null;
                }
            }

            return user;
        }
    }
}


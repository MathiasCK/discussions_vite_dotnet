using server.Models;

namespace server.DAL
{
    public interface ILoginRepository
    {
        Task<User?> FetchOrCreateUser(string email);
    }
}


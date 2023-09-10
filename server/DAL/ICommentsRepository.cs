using server.Models;

namespace server.DAL
{
    public interface ICommentsRepository
    {
        Task<Discussion?> FetchDiscussion(string id);
        Task<bool> CreateComment(Comment comment);
        Task<Comment?> FetchComment(string id);
        Task<bool> DeleteComment(string id);

    }
}


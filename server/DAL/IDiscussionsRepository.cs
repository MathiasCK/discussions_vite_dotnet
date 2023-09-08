using server.Models;

namespace server.DAL
{
    public interface IDiscussionsRepository
    {
        Task<IEnumerable<Discussion>?> FetchDiscussions();
        Task<Discussion?> FetchDiscussion(string id);
        Task<bool> CreateDiscussion(Discussion discussion, string sessionEmail);
        Task<bool> Update(Discussion discussion);
        Task<bool> DeleteDiscussion(string id);
    }
}


using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.DAL
{
    public class DiscussionsRepository : IDiscussionsRepository
    {
        private readonly DB _db;
        private readonly ILogger<DiscussionsRepository> _logger;

        public DiscussionsRepository(DB db, ILogger<DiscussionsRepository> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<IEnumerable<Discussion>?> FetchDiscussions()
        {
            try
            {
                return await _db.Discussions.ToListAsync();
            }
            catch (Exception e)
            {
                _logger.LogError("[DiscussionsRepository]: Failed to fetch all discussions: {e}", e.Message); ;
                return null;
            }
        }

        public async Task<Discussion?> FetchDiscussion(string id)
        {
            try
            {
                return await _db.Discussions.FirstOrDefaultAsync(i => i.Id == id);
            }
            catch (Exception e)
            {
                _logger.LogError("[DiscussionsRepository]: Could not fetch discusstion with id: '{id}' - {e}", id, e.Message);
                return null;
            }
        }

        public async Task<bool> CreateDiscussion(Discussion discussion, string sessionEmail)
        {
            try
            {
                var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == sessionEmail);

                if (existingUser == null)
                {
                    throw new Exception("[DiscussionsRepository]: Failed to create discussion Author with email: " + sessionEmail);
                }

                discussion.Author = existingUser;

                _db.Discussions.Add(discussion);
                await _db.SaveChangesAsync();
                _logger.LogInformation("[DiscussionsRepository]: Successfully created discussion: '{discussion}'", discussion);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[DiscussionsRepository]: Could not create discussion {discussion} - {e}", discussion, e.Message);
                return false;
            }
        }

        public async Task<bool> Update(Discussion discussion)
        {
            try
            {
                discussion.Updated = DateTime.Now;

                _db.Discussions.Update(discussion);
                await _db.SaveChangesAsync();
                _logger.LogInformation("[DiscussionsRepository]: Successfully updated discussion: '{discussion}'", discussion);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[DiscussionsRepository]: Could not update discussion {discussion} - {e}", discussion, e.Message);
                return false;
            }
        }

        public async Task<bool> DeleteDiscussion(string id)
        {
            try
            {
                var discussion = await FetchDiscussion(id);

                if (discussion == null)
                {
                    return false;
                }

                DeleteDiscussionComments(id);

                _db.Discussions.Remove(discussion);
                await _db.SaveChangesAsync();
                _logger.LogInformation("[DiscussionsRepository]: Successfully deleted discussion: '{discussion}'", discussion);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[DiscussionsRepository]: Could not delete discussion with id: {id} - {e}", id, e.Message);
                return false;
            }
        }

        public async void DeleteDiscussionComments(string id)
        {
            try
            {
                var discussionComments = await _db.Comments.Where(cmt => cmt.DiscussionId == id).ToListAsync();
                _db.Comments.RemoveRange(discussionComments);
                _logger.LogInformation("[DiscussionsRepository]: Successfully deleted comments for discussion: '{discussion}'", id);
            }
            catch (Exception e)
            {

                throw new Exception("[DiscussionsRepository]: Could not delete comments for discussion with id: " + id + " - " + e.Message);
            }
        }

    }
}


using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.DAL
{
    public class CommentsRepository : ICommentsRepository
    {
        private readonly DB _db;
        private readonly ILogger<DiscussionsRepository> _logger;

        public CommentsRepository(DB db, ILogger<DiscussionsRepository> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<bool> CreateComment(Comment comment)
        {
            try
            {
                var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == comment.Author.Email);

                if (existingUser == null)
                {
                    throw new Exception("[CommentsRepository]: Failed to set comment Author with email: " + comment.Author.Email);
                }

                comment.Author = existingUser;

                _db.Comments.Add(comment);
                await _db.SaveChangesAsync();
                _logger.LogInformation("[CommentsRepository]: Successfully created comment: '{comment}'", comment.Text);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[CommentsRepository]: Could not create comment {comment} - {e}", comment, e.Message);
                return false;
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
                _logger.LogError("[CommentsRepository]: Could not fetch discusstion with id: '{id}' - {e}", id, e.Message);
                return null;
            }
        }

        public async Task<Comment?> FetchComment(string id)
        {
            try
            {
                return await _db.Comments.FirstOrDefaultAsync(i => i.Id == id);
            }
            catch (Exception e)
            {
                _logger.LogError("[CommentsRepository]: Could not fetch comment with id: '{id}' - {e}", id, e.Message);
                return null;
            }
        }

        public async Task<bool> DeleteComment(string id)
        {
            try
            {
                var comment = await FetchComment(id);

                if (comment == null)
                {
                    return false;
                }

                _db.Comments.Remove(comment);
                await _db.SaveChangesAsync();
                _logger.LogInformation("[CommentsRepository]: Successfully deleted comment: '{comment}'", comment);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[CommentsRepository]: Could not delete comment with id: {id} - {e}", id, e.Message);
                return false;
            }
        }
    }
}


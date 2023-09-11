using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DAL;
using server.Models;

namespace Discussions.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly ICommentsRepository _commentsRepository;

        public CommentsController(ICommentsRepository commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(Comment comment)
        {
            comment.Id = Guid.NewGuid().ToString();
            comment.Created = DateTime.Now;

            bool created = await _commentsRepository.CreateComment(comment);

            if (!created)
            {
                return BadRequest("Could not create comment");
            }

            return Ok(comment);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(string id)
        {
            bool deleted = await _commentsRepository.DeleteComment(id);

            if (!deleted)
            {
                return BadRequest("Could not delete discussion");
            }

            return Ok();
        }

    }
}


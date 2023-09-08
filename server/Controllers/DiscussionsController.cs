using Microsoft.AspNetCore.Mvc;
using server.DAL;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DiscussionsController : Controller
{
    private readonly IDiscussionsRepository _discussionsRepository;
    private readonly ILogger<DiscussionsRepository> _logger;

    public DiscussionsController(IDiscussionsRepository discussionsRepository, ILogger<DiscussionsRepository> logger)
    {
        _discussionsRepository = discussionsRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var discussions = await _discussionsRepository.FetchDiscussions();

        if (discussions == null)
        {
            return BadRequest("Could not fetch discussions");
        }

        return Ok(discussions);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Details(string id)
    {
        var discussion = await _discussionsRepository.FetchDiscussion(id);

        if (id == null)
        {
            return NotFound("Could not fetch discussions with id: " + id);
        }

        return Ok(discussion);
    }
}


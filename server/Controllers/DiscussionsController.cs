using Microsoft.AspNetCore.Mvc;
using server.DAL;
using server.Models;

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

        if (discussion == null)
        {
            return NotFound("Could not fetch discussion with id: " + id);
        }

        return Ok(discussion);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Discussion discussion)
    {
        var exists = await _discussionsRepository.FetchDiscussion(id);

        if (exists == null)
        {
            return NotFound("Could not fetch discussion with id: " + id);
        }

        bool updated = await _discussionsRepository.Update(discussion);

        if (updated == false)
        {
            return BadRequest("Could not update discussion with id: " + id);
        }

        return Ok();
    }
}


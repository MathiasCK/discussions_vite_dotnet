using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DiscussionsController : Controller
{
    private readonly ILogger<DiscussionsController> _logger;

    public DiscussionsController(ILogger<DiscussionsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return Ok("Hello world");
    }
}


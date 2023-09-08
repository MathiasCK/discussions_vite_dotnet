using Microsoft.AspNetCore.Mvc;
using server.DAL;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        private readonly ILoginRepository _loginRepository;

        public LoginController(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }


        [HttpPost]
        public async Task<IActionResult> Index(User user)
        {

            var usr = await _loginRepository.FetchOrCreateUser(user.Email);

            if (usr == null)
            {
                return BadRequest("There was an error fetching user " + user.Email);
            }

            return Ok(usr);
        }
    }
}
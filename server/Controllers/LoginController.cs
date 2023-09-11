using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DAL;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

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
        public async Task<IActionResult> Login(User user)
        {
            var usr = await _loginRepository.FetchOrCreateUser(user.Email);

            if (usr == null)
            {
                return BadRequest("There was an error fetching user " + user.Email);
            }

            var token = GenerateJwtToken(usr.Id);

            return Ok(new { Token = token, User = usr });
        }

        private string GenerateJwtToken(string userId)
        {
            var secretKey = Encoding.UTF8.GetBytes("Gwy0hwYp2G1/EmrcV98gVOPoQFbJx+ecLigyQhsJVSw=");
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, userId.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature)
            };

            return jwtTokenHandler.WriteToken(jwtTokenHandler.CreateToken(tokenDescriptor));
        }
    }
}
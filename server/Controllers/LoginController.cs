using System.Text;
using Microsoft.AspNetCore.Mvc;
using server.DAL;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors;
using System.Net;
using System.Net.Mail;
using System.Net.Http;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowReactApp")]
    public class LoginController : Controller
    {

        private readonly ILoginRepository _loginRepository;

        public LoginController(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> SendEmail(User user)
        {
            var usr = await _loginRepository.FetchOrCreateUser(user.Email);

            if (usr == null)
            {
                return BadRequest("There was an error fetching user " + user.Email);
            }

            var configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("mail.config.json")
            .Build();

            string username = configuration["EmailSettings:Username"] ?? throw new Exception("gmail username not configured");
            string password = configuration["EmailSettings:Password"] ?? throw new Exception("gmail password not configured");

            return SendEmail(username, password, usr.Email);
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

        private static string GenerateJwtToken(string userId)
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

        private IActionResult SendEmail(string username, string password, string email)
        {

            SmtpClient smtpClient = new("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(username),
                Subject = "Verify your email",
                Body = "This is the body of your email.",
            };

            mailMessage.To.Add(email);

            try
            {
                smtpClient.Send(mailMessage);
                return Ok("Verification email sent to " + email);
            }
            catch (Exception ex)
            {
                throw new Exception("There was an error sending the verification email: " + ex.Message);
            }
        }
    }
}
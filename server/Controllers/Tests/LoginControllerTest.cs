using Microsoft.AspNetCore.Mvc;
using Moq;
using server.DAL;
using server.Models;
using Xunit;

namespace server.Controllers.Tests
{
    public class LoginControllerTests
    {
        private readonly Mock<ILoginRepository> _mockRepository;
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly LoginController _controller;

        public LoginControllerTests()
        {
            _mockRepository = new Mock<ILoginRepository>();
            _mockConfiguration = new Mock<IConfiguration>();
            _controller = new LoginController(_mockRepository.Object);
        }

        [Fact]
        public async Task Login_ReturnsBadRequest_WhenUserIsNull()
        {
            // Arrange
            var user = new User {};
            _mockRepository.Setup(repo => repo.FetchOrCreateUser(It.IsAny<string>())).ReturnsAsync(null as User);

            // Act
            var result = await _controller.Login(user);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("There was an error fetching user ", badRequestResult.Value);
        }

        [Fact]
        public async Task Login_ReturnsOk_WhenUserIsNotNull()
        {
            // Arrange
            var user = new User { Email = "test@example.com" };
            var usr = new User { Email = "test@example.com" };
            _mockRepository.Setup(repo => repo.FetchOrCreateUser(user.Email)).ReturnsAsync(usr);
            _mockConfiguration.Setup(config => config["EmailSettings:Username"]).Returns("testuser");
            _mockConfiguration.Setup(config => config["EmailSettings:Password"]).Returns("testpassword");

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Referer"] = "http://localhost:3000";
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = httpContext
            };

            // Act
            var result = await _controller.Login(user);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Verification email sent to test@example.com", okResult.Value);
        }

    }
}
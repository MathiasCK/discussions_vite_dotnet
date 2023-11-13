using Microsoft.AspNetCore.Mvc;
using Moq;
using server.DAL;
using server.Models;
using Xunit;

namespace server.Controllers.Tests {
    public class CommentsControllerTests
  {
      private readonly Mock<ICommentsRepository> _mockRepository;
      private readonly CommentsController _controller;

      public CommentsControllerTests()
      {
          _mockRepository = new Mock<ICommentsRepository>();
          _controller = new CommentsController(_mockRepository.Object);
      }

      [Fact]
      public async Task CreateComment_ReturnsBadRequest_WhenCommentNotCreated()
      {
          var comment = new Comment();
          _mockRepository.Setup(repo => repo.CreateComment(comment)).ReturnsAsync(false);

          var result = await _controller.CreateComment(comment);

          var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
          Assert.Equal("Could not create comment", badRequestResult.Value);
      }

      [Fact]
      public async Task CreateComment_ReturnsOk_WhenCommentCreated()
      {
          var comment = new Comment();
          _mockRepository.Setup(repo => repo.CreateComment(comment)).ReturnsAsync(true);

          var result = await _controller.CreateComment(comment);

          var okResult = Assert.IsType<OkObjectResult>(result);
          Assert.Equal(comment, okResult.Value);
      }

      [Fact]
      public async Task DeleteComment_ReturnsBadRequest_WhenCommentNotDeleted()
      {
          var commentId = "1";
          _mockRepository.Setup(repo => repo.DeleteComment(commentId)).ReturnsAsync(false);

          var result = await _controller.DeleteComment(commentId);

          var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
          Assert.Equal("Could not delete comment", badRequestResult.Value);
      }

      [Fact]
      public async Task DeleteComment_ReturnsOk_WhenCommentDeleted()
      {
          var commentId = "1";
          _mockRepository.Setup(repo => repo.DeleteComment(commentId)).ReturnsAsync(true);

          var result = await _controller.DeleteComment(commentId);

          var okResult = Assert.IsType<OkResult>(result);
          Assert.Equal(200, okResult.StatusCode);
      }
  }
}
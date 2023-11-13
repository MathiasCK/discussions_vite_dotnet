using Microsoft.AspNetCore.Mvc;
using Moq;
using server.Controllers;
using server.DAL;
using server.Models;
using Xunit;

namespace server.Controllers.Tests
{
    public class DiscussionsControllerTest
    {
        private readonly Mock<IDiscussionsRepository> _mockRepository;
        private readonly DiscussionsController _controller;

        public DiscussionsControllerTest()
        {
            _mockRepository = new Mock<IDiscussionsRepository>();
            _controller = new DiscussionsController(_mockRepository.Object, null);
        }

        [Fact]
        public async Task Index_ReturnsBadRequest_WhenDiscussionsNotFetched()
        {
            _mockRepository.Setup(repo => repo.FetchDiscussions()).ReturnsAsync(null as Discussion[]);

            var result = await _controller.Index();

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Could not fetch discussions", badRequestResult.Value);
        }

        [Fact]
        public async Task Index_ReturnsOk_WhenDiscussionsFetched()
        {
            var discussions = new Discussion[] { new Discussion(), new Discussion() };
            _mockRepository.Setup(repo => repo.FetchDiscussions()).ReturnsAsync(discussions);

            var result = await _controller.Index();

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(discussions, okResult.Value);
        }

        [Fact]
        public async Task Details_ReturnsNotFound_WhenDiscussionNotFound()
        {
            var discussionId = "1";
            _mockRepository.Setup(repo => repo.FetchDiscussion(discussionId)).ReturnsAsync(null as Discussion);

            var result = await _controller.Details(discussionId);

            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("Could not fetch discussion with id: " + discussionId, notFoundResult.Value);
        }

        [Fact]
        public async Task Details_ReturnsOk_WhenDiscussionFound()
        {
            var discussion = new Discussion();
            _mockRepository.Setup(repo => repo.FetchDiscussion(discussion.Id)).ReturnsAsync(discussion);

            var result = await _controller.Details(discussion.Id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(discussion, okResult.Value);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenDiscussionNotCreated()
        {
            var discussion = new Discussion();
            _mockRepository.Setup(repo => repo.CreateDiscussion(discussion)).ReturnsAsync(false);

            var result = await _controller.Create(discussion);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Could not create discussion", badRequestResult.Value);
        }

        [Fact]
        public async Task Create_ReturnsOk_WhenDiscussionCreated()
        {
            var discussion = new Discussion();
            _mockRepository.Setup(repo => repo.CreateDiscussion(discussion)).ReturnsAsync(true);

            var result = await _controller.Create(discussion);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(discussion, okResult.Value);
        }

        [Fact]
        public async Task Update_ReturnsNotFound_WhenDiscussionNotFound()
        {
            var discussion = new Discussion { Id = "1" };
            _mockRepository.Setup(repo => repo.FetchDiscussion(discussion.Id)).ReturnsAsync(null as Discussion);

            var result = await _controller.Update(discussion);

            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("Could not fetch discussion with id: " + discussion.Id, notFoundResult.Value);
        }

        [Fact]
        public async Task Update_ReturnsBadRequest_WhenDiscussionNotUpdated()
        {
            var discussion = new Discussion { Id = "1" };
            var existingDiscussion = new Discussion { Id = "1", Topic = "Existing Topic", Body = "Existing Body" };
            _mockRepository.Setup(repo => repo.FetchDiscussion(discussion.Id)).ReturnsAsync(existingDiscussion);
            _mockRepository.Setup(repo => repo.Update(existingDiscussion)).ReturnsAsync(false);

            var result = await _controller.Update(discussion);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Could not update discussion with id: " + discussion.Id, badRequestResult.Value);
        }

        [Fact]
        public async Task Update_ReturnsOk_WhenDiscussionUpdated()
        {
            var discussion = new Discussion { Id = "1", Topic = "New Topic", Body = "New Body" };
            var existingDiscussion = new Discussion { Id = "1", Topic = "Existing Topic", Body = "Existing Body" };
            _mockRepository.Setup(repo => repo.FetchDiscussion(discussion.Id)).ReturnsAsync(existingDiscussion);
            _mockRepository.Setup(repo => repo.Update(existingDiscussion)).ReturnsAsync(true);

            var result = await _controller.Update(discussion);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(existingDiscussion, okResult.Value);
            Assert.Equal(discussion.Topic, existingDiscussion.Topic);
            Assert.Equal(discussion.Body, existingDiscussion.Body);
        }

        [Fact]
        public async Task Delete_ReturnsBadRequest_WhenDiscussionNotDeleted()
        {
            var discussionId = "1";
            _mockRepository.Setup(repo => repo.DeleteDiscussion(discussionId)).ReturnsAsync(false);

            var result = await _controller.Delete(discussionId);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Could not delete discussion with id: " + discussionId, badRequestResult.Value);
        }

        [Fact]
        public async Task Delete_ReturnsOk_WhenDiscussionDeleted()
        {
            var discussionId = "1";
            _mockRepository.Setup(repo => repo.DeleteDiscussion(discussionId)).ReturnsAsync(true);

            var result = await _controller.Delete(discussionId);

            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }
    }
}
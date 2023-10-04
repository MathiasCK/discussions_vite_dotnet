using System.ComponentModel.DataAnnotations;

namespace server.Models
{
	public class Comment
	{
		public string ? Id { get; set; }
		public string ? DiscussionId { get; set; }
        [StringLength(500)]
        public string ? Text { get; set; } = string.Empty;
        public virtual User ? Author { get; set; }
		public DateTime Created { get; set; }

        public Comment() { }

        public Comment(string id, string discussionId, string text, User author, DateTime created)
        {
            Id = id;
            DiscussionId = discussionId;
            Text = text;
            Author = author;
            Created = created;
        }
    }
}


using System.ComponentModel.DataAnnotations;

namespace server.Models
{
	public class Discussion
	{

		public string Id { get; set; } = string.Empty;
        [StringLength(100)]
        public string Topic { get; set; } = string.Empty;
        [StringLength(200)]
        public string Body { get; set; } = string.Empty;
        public virtual User ? Author { get; set; }
        public DateTime ? Created { get; set; }
        public DateTime ? Updated { get; set; }
		public virtual List<Comment> Comments { get; set; } = new List<Comment>();

        public Discussion() { }

        public Discussion(string id, string topic, string body, User author, DateTime created, DateTime updated)
		{
			Id = id;
            Topic = topic;
			Body = body;
			Author = author;
			Created = created;
			Updated = updated;
		}
	}
}


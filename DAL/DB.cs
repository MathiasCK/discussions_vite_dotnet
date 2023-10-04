using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.DAL
{
	public class DB : DbContext
	{
		public DB(DbContextOptions<DB> options) : base(options)
		{
			Database.EnsureCreated();
		}

		public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}


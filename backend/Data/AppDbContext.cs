using Microsoft.EntityFrameworkCore;
using APIdangkyvadangnhap.Models; // sửa namespace nếu cần

namespace APIdangkyvadangnhap.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		public DbSet<User> Users { get; set; }
	}
}
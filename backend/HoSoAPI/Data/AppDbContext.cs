using Microsoft.EntityFrameworkCore;
using HoSoAPI.Models;

namespace HoSoAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<HoSoDoanhNghiep> HoSoDoanhNghieps { get; set; }
    }
}

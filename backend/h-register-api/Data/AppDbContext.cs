using Microsoft.EntityFrameworkCore;
using HRegisterApi.Models;

namespace HRegisterApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<HoSoDoanhNghiep> HoSos { get; set; }
    }
}

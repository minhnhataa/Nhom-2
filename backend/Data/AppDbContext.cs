using Microsoft.EntityFrameworkCore;
using APIdangkyvadangnhap.Models; // sửa namespace nếu Models nằm chỗ khác

namespace APIdangkyvadangnhap.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Bảng người dùng (đăng nhập, đăng ký)
        public DbSet<User> Users { get; set; }

        // Bảng hồ sơ đăng ký doanh nghiệp
        public DbSet<HoSoDangKy> HoSoDangKys { get; set; }
    }
}

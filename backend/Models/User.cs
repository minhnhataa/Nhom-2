using System.ComponentModel.DataAnnotations;

namespace APIdangkyvadangnhap.Models
{
	public class User
{
    public int Id { get; set; }

    // public string Username { get; set; } ❌ bỏ dòng này
    public string Email { get; set; } // ✅ dùng Email thay vì Username

    public string PasswordHash { get; set; }

    public string Role { get; set; } = "User";
}

}
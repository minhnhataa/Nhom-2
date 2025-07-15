using System.ComponentModel.DataAnnotations;

namespace APIdangkyvadangnhap.Models
{
	public class User
	{
		[Key]
		public int Id { get; set; } // 👈 Thêm ID để làm khoá chính

		[Required]
		public string Username { get; set; } = "";

		[Required]
		public string PasswordHash { get; set; } = "";

		[Required]
		public string Role { get; set; } = "User";
	}
}

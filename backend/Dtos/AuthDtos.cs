using System.ComponentModel.DataAnnotations;

namespace YourProjectName.Dtos
{
    public class RegisterDto
    {
         [Required, EmailAddress]
    public string Email { get; set; }

    [Required]
    public string MatKhau { get; set; }

    [Required]
    [Compare("MatKhau", ErrorMessage = "Mật khẩu xác nhận không khớp.")]
    public string XacNhanMatKhau { get; set; }
    }

    public class LoginDto
    {
        public string Email { get; set; }
        public string MatKhau { get; set; }
    }
}

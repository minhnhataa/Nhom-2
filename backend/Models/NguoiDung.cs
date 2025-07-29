using System.ComponentModel.DataAnnotations;

public class NguoiDung
{
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string MatKhauHash { get; set; }

    public string? VaiTro { get; set; } = "NguoiDung";  // Mặc định
}

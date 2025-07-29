using APIdangkyvadangnhap.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using YourProjectName.Dtos;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    // POST: /api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (_context.NguoiDungs.Any(u => u.Email == dto.Email))
            return BadRequest("Email đã được sử dụng.");

        var user = new NguoiDung
        {
            Email = dto.Email,
            MatKhauHash = HashPassword(dto.MatKhau)
        };

        _context.NguoiDungs.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Đăng ký thành công." });
    }

    // POST: /api/auth/login
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        var user = _context.NguoiDungs.FirstOrDefault(u => u.Email == dto.Email);
        if (user == null || user.MatKhauHash != HashPassword(dto.MatKhau))
            return Unauthorized("Email hoặc mật khẩu không đúng.");

        return Ok(new { message = "Đăng nhập thành công." });
    }

    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }
}

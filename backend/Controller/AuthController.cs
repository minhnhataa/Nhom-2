using APIdangkyvadangnhap.Data;
using APIdangkyvadangnhap.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APIdangkyvadangnhap.Controllers // sửa lại đúng "Controllers"
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly string secretKey = "this_is_a_super_long_secret_key_!_jwt_256";
		private readonly AppDbContext _context;

		public AuthController(AppDbContext context)
		{
			_context = context;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register(UserRegisterDto dto)
		{
			// Hash mật khẩu trước khi lưu
			string hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.PasswordHash);

			var user = new User
			{
				Username = dto.Username,
				PasswordHash = hashedPassword,
				Role = dto.Role
			};

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return Ok("✅ Đăng ký người dùng thành công");
		}

		[HttpPost("login")]
		public IActionResult Login(LoginRequest loginUser)
		{
			var user = _context.Users.FirstOrDefault(u => u.Username == loginUser.Username);
			if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.PasswordHash, user.PasswordHash))
			{
				return Unauthorized("❌ Sai tên đăng nhập hoặc mật khẩu");
			}

			var token = GenerateJwtToken(user);
			return Ok(new { token });
		}

		private string GenerateJwtToken(User user)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(secretKey);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[] {
					new Claim(ClaimTypes.Name, user.Username),
					new Claim(ClaimTypes.Role, user.Role)
				}),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(key),
					SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}

		[Authorize]
		[HttpGet("secret")]
		public IActionResult SecretData()
		{
			return Ok("🔐 Đây là dữ liệu bí mật bạn chỉ thấy nếu đã đăng nhập!");
		}

		[Authorize(Roles = "Admin")]
		[HttpGet("admin")]
		public IActionResult AdminOnly()
		{
			return Ok("🔐 Bạn là Admin nên mới truy cập được API này.");
		}

		[Authorize]
		[HttpGet("me")]
		public IActionResult WhoAmI()
		{
			var username = User.Identity?.Name;
			var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

			return Ok(new
			{
				username,
				role
			});
		}
	}
}

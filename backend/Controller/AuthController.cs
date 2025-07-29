using APIdangkyvadangnhap.Data;
using APIdangkyvadangnhap.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APIdangkyvadangnhap.Controller
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
    var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
    if (existing != null)
    {
        return BadRequest("Email already exists.");
    }

    var user = new User
    {
        Email = dto.Email,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
        Role = dto.Role
    };


    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return Ok("User registered successfully");
}





		[HttpPost("login")]

public IActionResult Login(LoginRequest loginUser)
{
    var user = _context.Users.FirstOrDefault(u => u.Email == loginUser.Email);
    if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.PasswordHash))
    {
        return Unauthorized("Invalid email or password");
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
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, user.Email),
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
			return Ok("Đây là dữ liệu bí mật bạn chỉ thấy nếu đã đăng nhập!");
		}
		[Authorize(Roles = "Admin")]
		[HttpGet("admin")]
		public IActionResult AdminOnly()
		{
			return Ok("Bạn là Admin nên mới truy cập được API này.");
		}
		[Authorize]
		[HttpGet("me")]
		public IActionResult WhoAmI()
		{
			var username = User.Identity?.Name;

			// Tìm role trong claim
			var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

			return Ok(new
			{
				username,
				role
			});
		}
	}
}
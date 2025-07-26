using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;
using System;
using System.Linq;
using APIdangkyvadangnhap.Data;
using APIdangkyvadangnhap.Models;

namespace APIdangkyvadangnhap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DangKyController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public DangKyController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // POST: /api/DangKy/nop
        [HttpPost("nop")]
        public async Task<IActionResult> NopHoSo([FromForm] HoSoDangKy model, IFormFile file)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (file != null && file.Length > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                if (!Directory.Exists(uploads))
                    Directory.CreateDirectory(uploads);

                var filePath = Path.Combine(uploads, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                model.TenFileUpload = fileName;
                model.DuongDanFile = "/uploads/" + fileName;
            }

            // ❌ Bỏ dòng model.NgayTao = DateTime.Now;
            _context.HoSoDangKys.Add(model);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Nộp hồ sơ thành công!" });
        }

        // GET: /api/DangKy/danhsach
        [HttpGet("danhsach")]
        public async Task<IActionResult> DanhSach([FromQuery] string? keyword)
        {
            var query = _context.HoSoDangKys.AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                query = query.Where(h => h.TenDoanhNghiep.Contains(keyword));
            }

            var result = await query.OrderByDescending(h => h.Id).ToListAsync(); // nếu bỏ NgayTao, dùng Id để sort
            return Ok(result);
        }
    }
}

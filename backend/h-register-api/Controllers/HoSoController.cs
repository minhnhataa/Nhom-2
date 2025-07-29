using Microsoft.AspNetCore.Mvc;
using HRegisterApi.Models;
using HRegisterApi.DTOs;
using HRegisterApi.Data;

namespace HRegisterApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HoSoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public HoSoController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateHoSo([FromForm] HoSoDto hoSoDto, IFormFile giayPhepFile)
        {
            if (giayPhepFile == null || giayPhepFile.Length == 0)
                return BadRequest("Vui lòng đính kèm file giấy phép kinh doanh.");

            var uploadsFolder = Path.Combine(_env.ContentRootPath, "Uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, giayPhepFile.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await giayPhepFile.CopyToAsync(stream);
            }

            var hoSo = new HoSoDoanhNghiep
            {
                TenDoanhNghiep = hoSoDto.TenDoanhNghiep,
                DiaChi = hoSoDto.DiaChi,
                MaSoThue = hoSoDto.MaSoThue,
                NguoiDaiDien = hoSoDto.NguoiDaiDien,
                EmailLienHe = hoSoDto.EmailLienHe,
                SoDienThoai = hoSoDto.SoDienThoai,
                LoaiHinhDoanhNghiep = hoSoDto.LoaiHinhDoanhNghiep,
                MoTa = hoSoDto.MoTa,
                GiayPhepKinhDoanhFile = giayPhepFile.FileName
            };

            _context.HoSos.Add(hoSo);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đăng ký hồ sơ thành công", hoSoId = hoSo.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHoSo(int id, [FromBody] HoSoDto dto)
        {
            var hoSo = await _context.HoSos.FindAsync(id);
            if (hoSo == null) return NotFound();

            hoSo.TenDoanhNghiep = dto.TenDoanhNghiep;
            hoSo.DiaChi = dto.DiaChi;
            hoSo.MaSoThue = dto.MaSoThue;
            hoSo.NguoiDaiDien = dto.NguoiDaiDien;
            hoSo.EmailLienHe = dto.EmailLienHe;
            hoSo.SoDienThoai = dto.SoDienThoai;
            hoSo.LoaiHinhDoanhNghiep = dto.LoaiHinhDoanhNghiep;
            hoSo.MoTa = dto.MoTa;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Cập nhật hồ sơ thành công" });
        }
    }
}

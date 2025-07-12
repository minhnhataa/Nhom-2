using Microsoft.AspNetCore.Mvc;
using HoSoAPI.Data;
using HoSoAPI.Models;

namespace HoSoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HoSoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HoSoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _context.HoSoDoanhNghieps.ToList();
            return Ok(data);
        }

        [HttpPost("search")]
        public IActionResult Search([FromBody] SearchRequest request)
        {
            var query = _context.HoSoDoanhNghieps.AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.TenDoanhNghiep))
            {
                query = query.Where(x => x.TenDoanhNghiep.Contains(request.TenDoanhNghiep));
            }

            if (!string.IsNullOrWhiteSpace(request.TinhTrang))
            {
                query = query.Where(x => x.TinhTrang == request.TinhTrang);
            }

            return Ok(query.ToList());
        }
    }
}

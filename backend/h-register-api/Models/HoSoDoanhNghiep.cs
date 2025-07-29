using System;
using System.ComponentModel.DataAnnotations;

namespace HRegisterApi.Models
{
    public class HoSoDoanhNghiep
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string TenDoanhNghiep { get; set; }

        [MaxLength(500)]
        public string DiaChi { get; set; }

        [MaxLength(12)]
        public string MaSoThue { get; set; }

        [MaxLength(255)]
        public string NguoiDaiDien { get; set; }

        [EmailAddress]
        public string EmailLienHe { get; set; }

        [Phone]
        public string SoDienThoai { get; set; }

        [MaxLength(100)]
        public string LoaiHinhDoanhNghiep { get; set; }

        public DateTime NgayDangKy { get; set; } = DateTime.Now;

        public string GiayPhepKinhDoanhFile { get; set; }

        [MaxLength(1000)]
        public string MoTa { get; set; }

        [MaxLength(50)]
        public string TrangThai { get; set; } = "Chờ duyệt";

        [MaxLength(500)]
        public string GhiChu { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

public class HoSoDangKy
{
    public int Id { get; set; }

    [Required]
    public string TenDoanhNghiep { get; set; }

    [Required]
    public string MaSoThue { get; set; }

    [Required]
    public string DiaChiTruSo { get; set; }

    [Required]
    public string NguoiDaiDien { get; set; }

    [Required]
    public string SoDienThoai { get; set; }

    [Required]
    public string EmailLienHe { get; set; }

    public string? GhiChu { get; set; }

    public string? TenFileUpload { get; set; }
    public string? DuongDanFile { get; set; }
}

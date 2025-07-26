using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIdangkyvadangnhap.Migrations
{
    /// <inheritdoc />
    public partial class AddHoSoDangKy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HoSoDangKys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDoanhNghiep = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaSoThue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChiTruSo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NguoiDaiDien = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoDienThoai = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailLienHe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenFileUpload = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DuongDanFile = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoSoDangKys", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoSoDangKys");
        }
    }
}

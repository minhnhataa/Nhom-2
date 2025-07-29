using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIdangkyvadangnhap.Migrations
{
    /// <inheritdoc />
    public partial class AddNgayTaoToHoSoDangKy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTao",
                table: "HoSoDangKys",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NgayTao",
                table: "HoSoDangKys");
        }
    }
}

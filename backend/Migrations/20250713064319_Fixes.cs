using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Chapter.Migrations
{
    /// <inheritdoc />
    public partial class Fixes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "ReadingStatuses",
                newName: "UserReadingStatus");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Ratings",
                newName: "UserRating");

            migrationBuilder.CreateTable(
                name: "Wishlists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AddedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    BookId = table.Column<string>(type: "text", nullable: false),
                    RatingId = table.Column<int>(type: "integer", nullable: false),
                    ReadingStatusId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wishlists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Wishlists_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Wishlists_Ratings_RatingId",
                        column: x => x.RatingId,
                        principalTable: "Ratings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Wishlists_ReadingStatuses_ReadingStatusId",
                        column: x => x.ReadingStatusId,
                        principalTable: "ReadingStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Wishlists_BookId",
                table: "Wishlists",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlists_RatingId",
                table: "Wishlists",
                column: "RatingId");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlists_ReadingStatusId",
                table: "Wishlists",
                column: "ReadingStatusId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Wishlists");

            migrationBuilder.RenameColumn(
                name: "UserReadingStatus",
                table: "ReadingStatuses",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "UserRating",
                table: "Ratings",
                newName: "Rating");
        }
    }
}

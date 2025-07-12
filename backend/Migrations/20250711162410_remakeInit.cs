using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chapter.Migrations
{
    /// <inheritdoc />
    public partial class remakeInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Books_BookidId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_ReadingStatuses_Books_BookidId",
                table: "ReadingStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Books_BookIdId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "BookIdId",
                table: "Reviews",
                newName: "BookId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_BookIdId",
                table: "Reviews",
                newName: "IX_Reviews_BookId");

            migrationBuilder.RenameColumn(
                name: "BookidId",
                table: "ReadingStatuses",
                newName: "BookId");

            migrationBuilder.RenameIndex(
                name: "IX_ReadingStatuses_BookidId",
                table: "ReadingStatuses",
                newName: "IX_ReadingStatuses_BookId");

            migrationBuilder.RenameColumn(
                name: "BookidId",
                table: "Ratings",
                newName: "BookId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_BookidId",
                table: "Ratings",
                newName: "IX_Ratings_BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Books_BookId",
                table: "Ratings",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReadingStatuses_Books_BookId",
                table: "ReadingStatuses",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Books_BookId",
                table: "Reviews",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Books_BookId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_ReadingStatuses_Books_BookId",
                table: "ReadingStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Books_BookId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "Reviews",
                newName: "BookIdId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_BookId",
                table: "Reviews",
                newName: "IX_Reviews_BookIdId");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "ReadingStatuses",
                newName: "BookidId");

            migrationBuilder.RenameIndex(
                name: "IX_ReadingStatuses_BookId",
                table: "ReadingStatuses",
                newName: "IX_ReadingStatuses_BookidId");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "Ratings",
                newName: "BookidId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_BookId",
                table: "Ratings",
                newName: "IX_Ratings_BookidId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Books_BookidId",
                table: "Ratings",
                column: "BookidId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReadingStatuses_Books_BookidId",
                table: "ReadingStatuses",
                column: "BookidId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Books_BookIdId",
                table: "Reviews",
                column: "BookIdId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

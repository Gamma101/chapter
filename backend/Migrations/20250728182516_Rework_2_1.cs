using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Rework_2_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<int>(
            //    name: "PageCount",
            //    table: "Books",
            //    type: "integer",
            //    nullable: true,
            //    oldClrType: typeof(string),
            //    oldType: "text");
              migrationBuilder.Sql(@"
                ALTER TABLE ""Books""
                ALTER COLUMN ""PageCount"" TYPE integer
                USING ""PageCount""::integer;
              ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<string>(
            //    name: "PageCount",
            //    table: "Books",
            //    type: "text",
            //    nullable: false,
            //    defaultValue: "",
            //    oldClrType: typeof(int),
            //    oldType: "integer",
            //    oldNullable: true);
              migrationBuilder.Sql(@"
                ALTER TABLE ""Books""
                ALTER COLUMN ""PageCount"" TYPE text
                USING ""PageCount""::text;
              ");
        }
    }
}

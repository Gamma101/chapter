using Chapter.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Chapter.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions dbContextOptions)
            :base(dbContextOptions)
        {
        }

        public DbSet<Books> Books { get; set; }
        public DbSet<Ratings> Ratings { get; set; }
        public DbSet<ReadingStatuses> ReadingStatuses { get; set; }
        public DbSet<Reviews> Reviews { get; set; }

    }
}

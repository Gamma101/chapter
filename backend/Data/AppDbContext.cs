using backend.Models;
using Chapter.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Chapter.Data
{
    public class AppDBContext : IdentityDbContext<AppUser>
    {
        public AppDBContext(DbContextOptions dbContextOptions)
            :base(dbContextOptions)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<UserLibrary> UserLibraries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "Admin",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "User",
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);

            builder.Entity<Book>(entity =>
            {
                entity.HasKey(b => b.Id);
            });
                
            
            builder.Entity<UserLibrary>(entity =>
            {
                entity.HasKey(ul => ul.Id);

                entity.HasIndex(ul => new { ul.UserId, ul.BookId }).IsUnique();

                entity.HasOne(ul => ul.User)
                .WithMany(u => u.LibraryEntries)
                .HasForeignKey(ul => ul.UserId)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(ul => ul.Book)
                .WithMany(b => b.LibraryEntries)
                .HasForeignKey(ul => ul.BookId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Rating>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasIndex(r => new { r.UserId, r.BookId }).IsUnique();

                entity.HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId) 
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(r => r.Book)
                .WithMany(b => b.Ratings)
                .HasForeignKey(r => r.BookId)
                .OnDelete(DeleteBehavior.Cascade);
                
            });

            builder.Entity<Review>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.HasIndex(r => new { r.UserId, r.BookId }).IsUnique();

                entity.HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(r => r.Book)
                .WithMany(b => b.Reviews)
                .HasForeignKey(r => r.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            });
        }

        

    }
}

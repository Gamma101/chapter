using Chapter.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {

        public virtual ICollection<UserLibrary> LibraryEntries { get; set; } = new List<UserLibrary>();
        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}

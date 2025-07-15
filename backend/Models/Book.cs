using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;

namespace Chapter.Models
{
    [Table("Books")]
    public class Book
    {
        public int Id { get;  set; } 
        public string GoogleBookId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Authors { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public DateTime? PublishedDate { get; set; }

        public virtual ICollection<UserLibrary> LibraryEntries { get; set; } = new List<UserLibrary>();
        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();


    }
}

using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;

namespace Chapter.Models
{
    [Table("Books")]
    public class Book
    {
        public string Id { get;  set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Authors { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public DateOnly? PublishedDate { get; set; }
        public int? PageCount { get; set; }
       

        public virtual ICollection<UserLibrary> LibraryEntries { get; set; } = new List<UserLibrary>();
        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();


    }
}

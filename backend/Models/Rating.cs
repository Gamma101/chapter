using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Ratings")]
    public class Rating
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public virtual AppUser User { get; set; }
        public int BookId { get; set; }
        public virtual Book Book { get; set; }
        public int Value { get; set; }

    }
}
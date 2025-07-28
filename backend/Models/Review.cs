using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Reviews")]
    public class Review
    {
        public int Id { get;  set; }
        public string UserId { get; set; } = string.Empty;
        public virtual AppUser User { get; set; }
        public string BookId { get; set; } 
        public virtual Book Book { get; set; }
        public string Title { get;  set; } = string.Empty;
        public string Content { get;  set; } = string.Empty;
        public DateTime CreatedAt { get;  set; }
        public DateTime? UpdatedAt { get; set; }

    }
    
}

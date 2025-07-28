using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    public enum ReadingStatus { WantToRead, Reading, Read }
    [Table("UserLibraries")]
    public class UserLibrary
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public virtual AppUser User { get; set; }
        public string BookId { get; set; } 
        public virtual Book Book { get; set; }
        public ReadingStatus? Status { get; set; }
        public DateOnly AddedDate { get; set; }
    }
}
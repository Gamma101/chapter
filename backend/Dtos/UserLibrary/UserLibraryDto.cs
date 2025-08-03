using Chapter.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.UserLibrary
{
    public class UserLibraryDto
    {
        public int Id { get; set; }

        [Range(0, 3)]
      
        public string Status { get; set; }
        public DateOnly AddedDate { get; set; }
        public string BookId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Authors { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public int? UserRating { get; set; }

    }

}

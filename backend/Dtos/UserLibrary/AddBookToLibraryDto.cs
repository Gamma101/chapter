using Chapter.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.UserLibrary
{
    public class AddBookToLibraryDto
    {
        public string BookId { get; set; }
        [Range(0, 3)]
        public ReadingStatus? ReadingStatus { get; set; }
    }
}

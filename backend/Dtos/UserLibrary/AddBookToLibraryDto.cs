using Chapter.Models;

namespace backend.Dtos.UserLibrary
{
    public class AddBookToLibraryDto
    {
        public string BookId { get; set; }
        public ReadingStatus? ReadingStatus { get; set; }
    }
}

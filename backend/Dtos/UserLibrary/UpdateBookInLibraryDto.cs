using Chapter.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.UserLibrary
{
    public class UpdateBookInLibraryDto
    {
        [Range(0, 2)]
        public ReadingStatus ReadingStatus { get; set; }
    }
}

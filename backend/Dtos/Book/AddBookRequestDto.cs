using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.BookRequest
{
    public class AddBookRequestDto
    {
        [Required]
        public string GoogleBookId { get; set; }
    }
}

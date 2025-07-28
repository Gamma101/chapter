using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.BookRequest
{
    public class AddBookRequestByGoogleDto
    {
        [Required]
        public string Id { get; set; }
    }
}

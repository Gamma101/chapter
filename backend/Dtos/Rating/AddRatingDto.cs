using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Rating
{
    public class AddRatingDto
    {
        [Required]
        [Range(1, 5)]
        public int Value { get; set; }
    }
}

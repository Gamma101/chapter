using Chapter.Models;

namespace backend.Dtos.Reviews
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string CreatedBy { get; set;} = string.Empty;
        public int? UserRating { get; set; }

    }
}

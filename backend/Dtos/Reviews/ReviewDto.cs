using Chapter.Models;

namespace backend.Dtos.Reviews
{
    public class ReviewDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

    }
}

using backend.Dtos.Reviews;
using Chapter.Models;

namespace backend.Mappers
{
    public static class ReviewMappers
    {
        public static ReviewDto ToReviewDto(this Review reviewModel)
        {
            return new ReviewDto
            {
                Title = reviewModel.Title,
                Content = reviewModel.Content,
                CreatedAt = reviewModel.CreatedAt
            };
        }
        public static Review ToReviewFromCreate(this CreateReviewDto createReviewDto, int bookId)
        {
            return new Review
            {
                Title = createReviewDto.Title,
                Content = createReviewDto.Content,
                BookId = bookId

            };
        }
    }
}

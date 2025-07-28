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
                Id = reviewModel.Id,
                Title = reviewModel.Title,
                Content = reviewModel.Content,
                CreatedAt = reviewModel.CreatedAt,
                UpdatedAt = reviewModel?.UpdatedAt,
                CreatedBy = reviewModel.User.UserName
            };
        }
        public static Review ToReviewFromCreate(this CreateReviewDto createReviewDto, string bookId)
        {
            return new Review
            {
                Title = createReviewDto.Title,
                Content = createReviewDto.Content,
                BookId = bookId,
                CreatedAt = DateTime.UtcNow

            };
        }
        public static Review ToReviewFromUpdate(this UpdateReviewRequestDto updateReviewDto)
        {
            return new Review
            {
                Title = updateReviewDto.Title,
                Content = updateReviewDto.Content,
                UpdatedAt = DateTime.UtcNow
            };
        }
    }
}

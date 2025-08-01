using backend.Dtos.Rating;
using backend.Dtos.Reviews;
using Chapter.Models;

namespace backend.Mappers
{
    public static class RatingMappers
    {
        public static RatingDto ToRatingDto(this Rating ratingModel)
        {
            return new RatingDto
            {
                Id = ratingModel.Id,
                Value = ratingModel.Value,
            };
        }
        public static Rating ToRatingFromCreateDto(this AddRatingDto addRatingDto, string bookId) 
        {
            return new Rating
            {
                Value = addRatingDto.Value,
                BookId = bookId
            };
        }
    }
}

using backend.Dtos.Rating;
using Chapter.Models;

namespace backend.Interfaces
{
    public interface IRatingRepository
    {
        Task<Rating> GetUserRatingForBookAsync(string bookId, string userId);
        Task<Rating> SetRatingAsync(string bookId, string userId, AddRatingDto ratingDto);
        Task<Rating> DeleteRatingAsync(string bookId, string userId);
    }
}

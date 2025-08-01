using backend.Dtos.Rating;
using backend.Interfaces;
using backend.Mappers;
using Chapter.Data;
using Chapter.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class RatingRepository : IRatingRepository
    {
        private readonly AppDBContext _dbContext;
        public RatingRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Rating> SetRatingAsync(string bookId, string userId, AddRatingDto ratingDto)
        {
            var ratingExist = await GetUserRatingForBookAsync(bookId, userId);
            if (ratingExist != null)
            {
                ratingExist.Value = ratingDto.Value;
            }
            else
            {
                var newRating = ratingDto.ToRatingFromCreateDto(bookId);
                newRating.UserId = userId;
                await _dbContext.Ratings.AddAsync(newRating);
                ratingExist = newRating;
            }
            await _dbContext.SaveChangesAsync();
            return ratingExist;
        }

        public async Task<Rating> GetUserRatingForBookAsync(string bookId, string userId)
        {
            return await _dbContext.Ratings.FirstOrDefaultAsync(r => r.BookId == bookId && r.UserId == userId);
        }
    }
}

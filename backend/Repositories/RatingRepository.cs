using backend.Dtos.Rating;
using backend.Interfaces;
using backend.Mappers;
using Chapter.Data;
using Chapter.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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

        public async Task<Rating> DeleteRatingAsync(string bookId, string userId)
        {
            var ratingModel = await _dbContext.Ratings.FirstOrDefaultAsync(r => r.BookId == bookId && r.UserId == userId);
            if (ratingModel == null) return null;
            _dbContext.Ratings.Remove(ratingModel);
            await _dbContext.SaveChangesAsync();
            return ratingModel;
        }

        public async Task<RatingInfoDto> GetRatingInfoAsync(string bookId)
        {
            var ratings = _dbContext.Ratings.Where(r => r.BookId == bookId);
            var reviews = _dbContext.Reviews.Where(r => r.BookId == bookId);
            var hasRating = await ratings.AnyAsync();
            
            if (!hasRating)
            {
                var reviewsCount = await reviews.CountAsync();
                return new RatingInfoDto
                {
                    AverageRating = null,
                    RatingsCount = 0,
                    ReviewsCount = reviewsCount
                };
            }
            var avgRatingTask = await ratings.AverageAsync(r => r.Value);
            var ratingCountTask = await ratings.CountAsync();
            var reviewsCountTask =  await reviews.CountAsync();
            var info = new RatingInfoDto
            {
                AverageRating = avgRatingTask,
                RatingsCount = ratingCountTask,
                ReviewsCount = reviewsCountTask
            };
            return info;
        }
    }
}

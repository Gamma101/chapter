using backend.Dtos.Reviews;
using backend.Interfaces;
using backend.Models;
using Chapter.Data;
using Chapter.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly AppDBContext _dbContext;
        public ReviewRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;

        }
        public async Task<ReviewDto?> GetByIdAsync(int id)
        {
            var rev = await _dbContext.Reviews.FindAsync(id);
            if (rev == null) { return null; }
            var bookId = rev.BookId;

            return await _dbContext.Reviews
                .Include(u => u.User)
                .Where(r => r.Id == id)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Content = r.Content,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CreatedBy = r.User.UserName,
                    UserRating = _dbContext.Ratings
                        .Where(rt => rt.BookId == r.BookId && rt.UserId == r.UserId)
                        .Select(rt => rt.Value)
                        .FirstOrDefault()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<List<ReviewDto>> GetAllByBookIdAsync(string bookId)
        {
            return await _dbContext.Reviews
                .Include(u => u.User)
                .Where(r => r.BookId == bookId)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Content = r.Content,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CreatedBy = r.User.UserName,
                    UserRating = _dbContext.Ratings
                        .Where(rt => rt.BookId == bookId && rt.UserId == r.UserId)
                        .Select(rt => rt.Value)
                        .FirstOrDefault()
                })
                .ToListAsync();
        }



        public async Task<Review> CreateAsync(Review reviewModel)
        {
            await _dbContext.Reviews.AddAsync(reviewModel);
            await _dbContext.SaveChangesAsync();
            return reviewModel;
        }

        public async Task<Review> UpdateAsync(int reviewId, Review reviewModel)
        {
            var exist = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);
            if (exist == null) { return null; }
            exist.Title = reviewModel.Title;
            exist.Content = reviewModel.Content;
            exist.UpdatedAt = reviewModel.UpdatedAt;
            await _dbContext.SaveChangesAsync();
            return exist;

        }

        public async Task<Review> DeleteAsync(int reviewId)
        {
            var reviewModel = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);
            if (reviewModel == null) { return null; }
            _dbContext.Reviews.Remove(reviewModel);
            await _dbContext.SaveChangesAsync();
            return reviewModel;
            
        }

        
    }
}
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
        public async Task<Review?> GetByIdAsync(int id)
        {
            return await _dbContext.Reviews.Include(u => u.User).FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Review>> GetAllByBookIdAsync(int id)
        {
            return await _dbContext.Reviews.Include(u => u.User).Where(b => b.BookId == id).ToListAsync();
        }



        public async Task<Review> CreateAsync(Review reviewModel)
        {
            await _dbContext.Reviews.AddAsync(reviewModel);
            await _dbContext.SaveChangesAsync();
            return reviewModel;
        }

        public async Task<Review> UpdateAsync(int bookId, int reviewId, Review reviewModel)
        {
            var exist = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId && r.BookId == bookId);
            if (exist == null) { return null; }
            exist.Title = reviewModel.Title;
            exist.Content = reviewModel.Content;
            await _dbContext.SaveChangesAsync();
            return exist;

        }

        public async Task<Review> DeleteAsync(int bookId, int reviewId)
        {
            var reviewModel = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId && r.BookId == bookId);
            if (reviewModel == null) { return null; }
            _dbContext.Reviews.Remove(reviewModel);
            await _dbContext.SaveChangesAsync();
            return reviewModel;
            
        }

        
    }
}
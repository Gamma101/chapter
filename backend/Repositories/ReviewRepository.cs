using backend.Interfaces;
using backend.Models;
using Chapter.Data;
using Chapter.Models;
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

        

        public async Task<Review> CreateAsync(Review reviewModel)
        {
            await _dbContext.Reviews.AddAsync(reviewModel);
            await _dbContext.SaveChangesAsync();
            return reviewModel;
        }

    }
}
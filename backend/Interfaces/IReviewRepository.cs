using Chapter.Models;

namespace backend.Interfaces
{
    public interface IReviewRepository
    {
        Task<Review> GetByIdAsync(int id);
        Task<List<Review>> GetAllByBookIdAsync(string id);
        Task<Review> CreateAsync(Review reviewModel);
        Task<Review> UpdateAsync(int reviewId, Review reviewModel);
        Task<Review> DeleteAsync(int reviewId);
       

    }
}

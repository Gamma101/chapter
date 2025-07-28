using Chapter.Models;

namespace backend.Interfaces
{
    public interface IReviewRepository
    {
        Task<Review> GetByIdAsync(int id);
        Task<List<Review>> GetAllByBookIdAsync(int id);
        Task<Review> CreateAsync(Review reviewModel);
        Task<Review> UpdateAsync(int bookId, int reviewId, Review reviewModel);
        Task<bool> DeleteAsync(int reviewId);
       

    }
}

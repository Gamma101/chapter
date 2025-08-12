using backend.Dtos.Reviews;
using Chapter.Models;

namespace backend.Interfaces
{
    public interface IReviewRepository
    {
        Task<ReviewDto> GetByIdAsync(int id);
        Task<List<ReviewDto>> GetAllByBookIdAsync(string id);
        Task<Review> CreateAsync(Review reviewModel);
        Task<Review> UpdateAsync(int reviewId, Review reviewModel);
        Task<Review> DeleteAsync(int reviewId);
       

    }
}

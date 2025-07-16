using Chapter.Models;

namespace backend.Interfaces
{
    public interface IReviewRepository
    {
        Task<Review> GetByIdAsync(int id);
        Task<Review> CreateAsync(Review reviewModel);
       

    }
}

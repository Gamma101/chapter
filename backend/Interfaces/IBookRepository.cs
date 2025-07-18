using Chapter.Models;

namespace backend.Interfaces
{
    public interface IBookRepository
    {
        Task<bool> BookExist(int id);
        Task<Book?> GetByIdAsync(int id);
    }
}

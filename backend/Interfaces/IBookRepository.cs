using Chapter.Models;

namespace backend.Interfaces
{
    public interface IBookRepository
    {
        Task<bool> BookExist(string id);
        Task<Book?> GetByIdAsync(string id);

        DateOnly GetDateOnlyAsync(List<int> date);
    }
}

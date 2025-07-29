using Chapter.Models;

namespace backend.Interfaces
{
    public interface IBookRepository
    {
        Task<bool> BookExist(string id);

        DateOnly GetDateOnlyAsync(List<int> date);
    }
}

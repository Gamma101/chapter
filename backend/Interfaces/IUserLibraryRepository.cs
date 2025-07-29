using Chapter.Models;

namespace backend.Interfaces
{
    public interface IUserLibraryRepository
    {
        Task<List<UserLibrary>> GetUserLibraryAsync(string userId);

        
    }
}

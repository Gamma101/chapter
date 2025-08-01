using backend.Dtos.UserLibrary;
using Chapter.Models;

namespace backend.Interfaces
{
    public interface IUserLibraryRepository
    {
        Task<List<UserLibraryDto>> GetUserLibraryAsync(string userId);
        Task<UserLibrary> GetUserLibraryEntryAsync(string userId, string bookId); 
        Task<UserLibrary> AddToUserLibraryAsync(UserLibrary userLibrary);
        Task<bool> LibraryEntryExist(string userId, string bookId);
        Task<UserLibrary> DeleteAsync(string userId, string bookId);

        
    }
}

using backend.Dtos.UserLibrary;
using Chapter.Models;

namespace backend.Interfaces
{
    public interface IUserLibraryRepository
    {
        Task<List<UserLibraryDto>> GetUserLibraryAsync(string userId);
        Task<UserLibraryDto> GetUserLibraryEntryAsync(string userId, string bookId); 
        Task<UserLibrary> AddToUserLibraryAsync(UserLibrary userLibrary);

        Task<UserLibrary> UpdateUserLibraryEntryAsync(string userId, string bookId, UpdateBookInLibraryDto libraryDto);
        Task<bool> LibraryEntryExist(string userId, string bookId);
        Task<UserLibrary> DeleteAsync(string userId, string bookId);

        
    }
}

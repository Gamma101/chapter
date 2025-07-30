using backend.Dtos.UserLibrary;
using backend.Interfaces;
using Chapter.Data;
using Chapter.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UserLibraryRepository : IUserLibraryRepository
    {
        private readonly AppDBContext _dbContext;
        public UserLibraryRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserLibrary> AddToUserLibraryAsync(UserLibrary userLibraryModel)
        {
            await _dbContext.AddAsync(userLibraryModel);
            await _dbContext.SaveChangesAsync();
            return userLibraryModel;
        }

        public async Task<UserLibrary> DeleteAsync(string userId, string bookId)
        {
            var bookModel = await _dbContext.UserLibraries.FirstOrDefaultAsync(b => b.BookId == bookId && b.UserId == userId);
            if (bookModel == null) { return null; }
            _dbContext.UserLibraries.Remove(bookModel);
            await _dbContext.SaveChangesAsync();
            return bookModel;
        }

        public async Task<List<UserLibrary>> GetUserLibraryAsync(string userId)
        {
            return await _dbContext.UserLibraries
                .Where(entry => entry.UserId == userId)
                .Include(entry => entry.Book)
                .OrderByDescending(entry => entry.AddedDate)
                .ToListAsync();
        }

        public async Task<UserLibrary> GetUserLibraryEntryAsync(string userId, string bookId)
        {
            return await _dbContext.UserLibraries.Include(e => e.Book).FirstOrDefaultAsync(entry => entry.BookId == bookId && entry.UserId == userId);
        }

        public async Task<bool> LibraryEntryExist(string userId, string bookId)
        {
            return await _dbContext.UserLibraries.AnyAsync(x => x.UserId == userId && x.BookId == bookId);
        }
    }
}

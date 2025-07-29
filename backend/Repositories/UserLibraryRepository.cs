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

        public async Task<List<UserLibrary>> GetUserLibraryAsync(string userId)
        {
            return await _dbContext.UserLibraries
                .Where(entry => entry.UserId == userId)
                .Include(entry => entry.Book)
                .OrderByDescending(entry => entry.AddedDate)
                .ToListAsync();
        }
    }
}

using backend.Interfaces;
using Chapter.Data;
using Chapter.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class BookRepository: IBookRepository
    {
        private readonly AppDBContext _dbContext;
        public BookRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;

        }
        public Task<bool> BookExist(int id)
        {
            return _dbContext.Books.AnyAsync(x => x.Id == id);
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _dbContext.Books.FirstOrDefaultAsync(b => b.Id == id);
        }
    }
}

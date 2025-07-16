using backend.Interfaces;
using Chapter.Data;
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
    }
}

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
        public Task<bool> BookExist(string id)
        {
            return _dbContext.Books.AnyAsync(x => x.Id == id);
        }


        public DateOnly GetDateOnlyAsync(List<int> date)
        {
            if (date != null & date.Count != 0)
            {
                DateOnly now = new DateOnly();
                if (date.Count == 1)
                {
                    now = new DateOnly(date[0], 1, 1);
                }
                else if (date.Count == 2)
                {
                    now = new DateOnly(date[0], date[1], 1);
                }
                else if (date.Count == 3)
                {
                    now = new DateOnly(date[0], date[1], date[2]);
                }
                return now;
            }
            else { return new DateOnly(); }
        }
    }
}

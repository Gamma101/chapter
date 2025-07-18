using backend.Dtos.Book;
using Chapter.Models;

namespace backend.Mappers
{
    public static class BookMappers
    {
        public static BookDto ToBookDto(this Book bookModel)
        {
            return new BookDto
            {
                GoogleBookId = bookModel.GoogleBookId,

            }
        }
    }
}

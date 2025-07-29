using backend.Dtos.UserLibrary;
using Chapter.Models;

namespace backend.Mappers
{
    public static class UserLibraryMapper
    {
        public static UserLibraryDto ToUserLibraryDto(this UserLibrary userLibraryModel) 
        {
            if(userLibraryModel.Book == null)
            {
                throw new InvalidOperationException("Related book entity has not found");
            }
            return new UserLibraryDto
            {
                Id = userLibraryModel.Id,
                Status = userLibraryModel.Status.ToString(),
                AddedDate = userLibraryModel.AddedDate,
                BookId = userLibraryModel.Book.Id,
                Title = userLibraryModel.Book.Title,
                Authors = userLibraryModel.Book.Authors,
                ThumbnailUrl = userLibraryModel.Book.ThumbnailUrl
            };
        }
    }
}

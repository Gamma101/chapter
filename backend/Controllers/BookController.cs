using backend.Dtos.Book;
using backend.Interfaces;
using backend.Models;
using Chapter.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController: ControllerBase
    {
        private readonly AppDBContext _dbContext;
        private readonly IGoogleBooksService _googleBooksService;
        private readonly IBookRepository _bookRepo;

        public BooksController(AppDBContext dbContext, IGoogleBooksService googleBooksService, IBookRepository bookRepo)
        {
            _dbContext = dbContext;
            _googleBooksService = googleBooksService;
            _bookRepo = bookRepo;
        }
        [HttpGet("{googleBookId}")]
        public async Task<ActionResult<BookDto>> GetBookByGoogleIdAsync(string googleBookId)
        {
            if (string.IsNullOrEmpty(googleBookId))
            {
                return BadRequest("Google Book ID cannot be empty.");
            }
            var bookEntity = await _dbContext.Books.FirstOrDefaultAsync(b => b.Id == googleBookId);
            if (bookEntity == null)
            {
                var googleBook = await _googleBooksService.GetByGoogleIdAsync(googleBookId);
                if (googleBook == null || googleBook.VolumeInfo == null) { return NotFound("The book was not found."); }
                DateOnly? publishedDate = null;
                try
                {
                    if (!string.IsNullOrEmpty(googleBook.VolumeInfo.PublishedDate))
                    {
                        var date = googleBook.VolumeInfo.PublishedDate.Split('-').Select(int.Parse).ToList();
                        publishedDate = _bookRepo.GetDateOnly(date);
                    }
                }
                catch (Exception ex) { }
                
               
                bookEntity = new Chapter.Models.Book
                {

                    Id = googleBook.Id,
                    Title = googleBook.VolumeInfo.Title ?? "No Title",
                    Authors = googleBook.VolumeInfo.Authors != null ? string.Join(",", googleBook.VolumeInfo.Authors) : "Unknown Author",
                    Description = googleBook.VolumeInfo.Description ?? "No description available.",
                    ThumbnailUrl = googleBook.VolumeInfo.ImageLinks?.Thumbnail ?? "",
                    Publisher = googleBook.VolumeInfo.Publisher ?? "Unknown Publisher.",
                    PublishedDate = publishedDate == new DateOnly() ? null : publishedDate,
                    PageCount = googleBook.VolumeInfo.PageCount != null ? googleBook.VolumeInfo.PageCount : 0


                };
                _dbContext.Books.Add(bookEntity);
                await _dbContext.SaveChangesAsync();
    
            }

            var bookDto = new BookDto
            {
                Id = bookEntity.Id,
                Title = bookEntity.Title,
                Authors = bookEntity.Authors,
                Description = bookEntity.Description,
                ThumbnailUrl = bookEntity.ThumbnailUrl,
                Publisher = bookEntity.Publisher,
                PublishedDate = bookEntity.PublishedDate,
                PageCount = bookEntity.PageCount

            };
        
            return Ok(bookDto);
            
        }
        
        

    }
}

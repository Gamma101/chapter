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

        public BooksController(AppDBContext dbContext, IGoogleBooksService googleBooksService)
        {
            _dbContext = dbContext;
            _googleBooksService = googleBooksService;
        }
        [HttpGet("{googleBookId}")]
        public async Task<ActionResult<BookDto>> GetBookByIdAsync(string googleBookId)
        {
            if (string.IsNullOrEmpty(googleBookId))
            {
                return BadRequest("Google Book ID cannot be empty.");
            }
            var bookEntity = await _dbContext.Books.FirstOrDefaultAsync(b => b.GoogleBookId == googleBookId);
            if (bookEntity == null)
            {
                var googleBook = await _googleBooksService.GetBookByIdAsync(googleBookId);
                if (googleBook == null || googleBook.VolumeInfo == null) { return NotFound("The book was not found."); }


                bookEntity = new Chapter.Models.Book
                {
                    
                    GoogleBookId = googleBook.Id,
                    Title = googleBook.VolumeInfo.Title ?? "No Title",
                    Authors = googleBook.VolumeInfo.Authors != null ? string.Join(",", googleBook.VolumeInfo.Authors) : "Unknown Author",
                    Description = googleBook.VolumeInfo.Description ?? "No description available.",
                    ThumbnailUrl = googleBook.VolumeInfo.ImageLinks?.Thumbnail ?? ""
                };
                _dbContext.Books.Add(bookEntity);
                await _dbContext.SaveChangesAsync();
    
            }

            var bookDto = new BookDto
            {
                Id = bookEntity.Id,
                GoogleBookId = bookEntity.GoogleBookId,
                Title = bookEntity.Title,
                Authors = bookEntity.Authors,
                Description = bookEntity.Description,
                ThumbnailUrl = bookEntity.ThumbnailUrl
            };
        
            return Ok(bookDto);
            
        }

    }
}

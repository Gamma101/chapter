using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using backend.Models;
using backend.Interfaces;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Microsoft.AspNetCore.Http.HttpResults;
using backend.Extensions;
using backend.Dtos.UserLibrary;
using backend.Mappers;
using Chapter.Models;
namespace backend.Controllers
{
    [Route("api/mylibrary")]
    [ApiController]
    public class UserLibraryController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserLibraryRepository _userLibraryRepo;

        public UserLibraryController(UserManager<AppUser> userManager, IUserLibraryRepository userLibraryRepo)
        {
            _userManager = userManager;
            _userLibraryRepo = userLibraryRepo;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserLibrary()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var library = await _userLibraryRepo.GetUserLibraryAsync(appUser.Id);
            if (library == null)
            {
                return NotFound("Your library is not found");
            }
            var UserLibraryDto = library.Select(ul => ul.ToUserLibraryDto()).ToList();
            return Ok(UserLibraryDto);
        }
        [HttpGet("{bookId}", Name = "GetUserLibraryEntryByBookId")]
        [Authorize]
        public async Task<IActionResult> GetUserLibraryEntry(string bookId)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var entry = await _userLibraryRepo.GetUserLibraryEntryAsync(appUser.Id, bookId);
            if (entry == null) { return NotFound(); }
            var entryDto = entry.ToUserLibraryDto();
            return Ok(entryDto);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToLibrary([FromBody] AddBookToLibraryDto libraryDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if (await _userLibraryRepo.LibraryEntryExist(appUser.Id, libraryDto.BookId)) { return Conflict("This book already exist in your library!"); }
            var status = libraryDto.ReadingStatus ?? Chapter.Models.ReadingStatus.WantToRead;
            DateTime currentDate = DateTime.UtcNow;

            var newEntry = new UserLibrary 
            {
                BookId = libraryDto.BookId,
                UserId = appUser.Id,
                Status = status,
                AddedDate = DateOnly.FromDateTime(currentDate)

            };
            await _userLibraryRepo.AddToUserLibraryAsync(newEntry);

            var responseData = await _userLibraryRepo.GetUserLibraryEntryAsync(appUser.Id, libraryDto.BookId);
            if (responseData == null) { return StatusCode(500); }
            var dataDto = responseData.ToUserLibraryDto();

            return CreatedAtAction(nameof(GetUserLibraryEntry), new { bookId = dataDto.BookId }, dataDto);
        }

    }
}
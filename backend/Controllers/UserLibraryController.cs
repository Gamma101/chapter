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
            var userId = User.GetUsername();
            var library = await _userLibraryRepo.GetUserLibraryAsync(userId);
            if (library == null)
            {
                return NotFound("Your library is not found");
            }
            var UserLibraryDto = library.Select(ul => ul.ToUserLibraryDto()).ToList();
            return Ok(UserLibraryDto);
        }
    }
}
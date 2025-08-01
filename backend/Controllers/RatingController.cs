using backend.Extensions;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Mappers;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos.Rating;

namespace backend.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IRatingRepository _ratingRepo;
        private readonly IBookRepository _bookRepo;
        public RatingController(UserManager<AppUser> userManager, IRatingRepository ratingRepo, IBookRepository bookRepo)
        {
            _userManager = userManager;
            _ratingRepo = ratingRepo;
            _bookRepo = bookRepo;
        }
        [HttpGet("/api/books/{bookId}/rating/my")]
        [Authorize]
        public async Task<IActionResult> GetUserRatingForBook([FromRoute] string bookId)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var rating = await _ratingRepo.GetUserRatingForBookAsync(bookId, appUser.Id);
            if(rating == null) {return NotFound();}
            return Ok(rating.ToRatingDto());
        }
        [HttpPut("/api/books/{bookId}/rating")]
        [Authorize]
        public async Task<IActionResult> SetRating([FromRoute] string bookId, [FromBody] AddRatingDto addRatingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(!await _bookRepo.BookExist(bookId)) { return NotFound("Book is not found"); }
            var username = User.GetUsername();
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized();
            }

            var appUser = await _userManager.FindByNameAsync(username);
            var updatedRating = await _ratingRepo.SetRatingAsync(bookId, appUser.Id, addRatingDto);
            var updatedRatingDto = updatedRating.ToRatingDto();
            return Ok(updatedRatingDto);
            

        }

    }
    
}

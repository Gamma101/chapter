using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/review")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IReviewRepository _reviewRepo;
        public ReviewController(UserManager<AppUser> userManager, IReviewRepository reviewRepo)
        {
            _userManager = userManager;
            _reviewRepo = reviewRepo;
        }
        [HttpGet("{reviewId:int}", Name = "GetReviewById")]
        public async Task<IActionResult> GetById([FromRoute] int reviewId)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var review = await _reviewRepo.GetByIdAsync(reviewId);
            if (review == null)
            {
                return NotFound("Review is not found for this book.");
            }
            return Ok(review.ToReviewDto());
        }
        [HttpDelete("{reviewId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int reviewId)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var reviewFromDb = await _reviewRepo.GetByIdAsync(reviewId);
            if(reviewFromDb == null)
            {
                return NotFound("Review is not found for this book.");
            }

            if (reviewFromDb.UserId != appUser.Id) { return Forbid(); }

            var reviewModel = await _reviewRepo.DeleteAsync(reviewId);
            if (reviewModel == null) { return NotFound("Review is not found for this book."); }
            return NoContent();

        }
    }
}

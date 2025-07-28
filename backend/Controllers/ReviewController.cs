using backend.Interfaces;
using backend.Mappers;
using backend.Models;
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
        private readonly IBookRepository _bookRepo;
        public ReviewController(UserManager<AppUser> userManager, IReviewRepository reviewRepo, IBookRepository bookRepo)
        {
            _userManager = userManager;
            _reviewRepo = reviewRepo;
            _bookRepo = bookRepo;
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
    }
}

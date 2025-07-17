using backend.Dtos.Reviews;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/books/{bookId:int}/reviews")]
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
        public async Task<IActionResult> GetById([FromRoute] int reviewId, [FromRoute] int bookId)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var review = await _reviewRepo.GetByIdAsync(reviewId);
            if (review == null || review.BookId != bookId)
            {
                return NotFound("Review not found for this book.");
            }
            return Ok(review.ToReviewDto());
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int bookId, [FromBody] CreateReviewDto reviewDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            if (!await _bookRepo.BookExist(bookId))
            {
                return BadRequest("Book is not exist");
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var reviewModel = reviewDto.ToReviewFromCreate(bookId);
            reviewModel.UserId = appUser.Id.ToString();
            await _reviewRepo.CreateAsync(reviewModel);
            return CreatedAtAction(nameof(GetById), new { bookId, reviewId = reviewModel.Id }, reviewModel.ToReviewDto());
        }
    }

}
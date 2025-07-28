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
    [Route("api/books/{bookId:int}/review")]
    [ApiController]
    public class BookReviewController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IReviewRepository _reviewRepo;
        private readonly IBookRepository _bookRepo;
        public BookReviewController(UserManager<AppUser> userManager, IReviewRepository reviewRepo, IBookRepository bookRepo)
        {
            _userManager = userManager;
            _reviewRepo = reviewRepo;
            _bookRepo = bookRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllByBookId(int bookId)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var reviews = await _reviewRepo.GetAllByBookIdAsync(bookId);
            if (reviews == null || reviews.Count == 0) { return NotFound("Reviews are not found for this book."); }
            var reviewsDto = reviews.Select(r => r.ToReviewDto());
            return Ok(reviewsDto);
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
            return CreatedAtAction(nameof(ReviewController.GetById), new { bookId, reviewId = reviewModel.Id }, reviewModel.ToReviewDto());
        }
        [HttpPut("{reviewId:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int bookId, [FromRoute] int reviewId, [FromBody] UpdateReviewRequestDto reviewRequestDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var review = await _reviewRepo.UpdateAsync(bookId, reviewId, reviewRequestDto.ToReviewFromUpdate());
            
            if (review == null) { return NotFound("Review is not found for this book"); }
            var reviewFromDb = await _reviewRepo.GetByIdAsync(reviewId);

            if (reviewFromDb.UserId != appUser.Id) { return Forbid(); }
            return Ok(review.ToReviewDto());
        }
        
    }

}
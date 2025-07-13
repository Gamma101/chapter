using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Ratings")]
    public class Rating
    {
        public int Id { get; private set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal UserRating { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public string BookId { get; protected set; } = string.Empty;
        public Book Book { get; protected set; }

        //USERID


        private Rating() { }
        public Rating(string bookId, decimal rating)
        {
            BookId = bookId;
            UserRating = rating;
            CreatedAt = DateTime.Now.ToUniversalTime();
        }

    }

}

using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Ratings")]
    public class Ratings
    {
        public int Id { get; private set; }

        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Rating { get; private set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public string BookId { get; protected set; }
        public Books Book { get; protected set; }

        //USERID


        private Ratings() { }
        public Ratings(string bookId, decimal rating)
        {
            BookId = bookId;
            Rating = rating;
            CreatedAt = DateTime.UtcNow;
        }

    }

}

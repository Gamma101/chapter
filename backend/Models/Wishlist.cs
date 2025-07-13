using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Wishlists")]
    public class Wishlist
    {
        public int Id { get; private set; }
        public DateTime AddedAt { get; private set; }
        public string BookId { get; protected set; } = string.Empty;
        public Book Book { get; protected set; }

        public int RatingId { get; protected set; }
        public Rating Rating { get; protected set; }

        public int ReadingStatusId { get; protected set; }
        public ReadingStatus ReadingStatus { get; protected set; }
        //userid

        private Wishlist() { }
        public Wishlist(string bookId, int ratingId, int readingStatusId)
        {
            BookId = bookId;
            AddedAt = DateTime.Now.ToUniversalTime();
            RatingId = ratingId;
            ReadingStatusId = readingStatusId;
            
        }


    }
}

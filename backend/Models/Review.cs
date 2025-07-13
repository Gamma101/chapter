using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Reviews")]
    public class Review
    {
        public int Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string Content { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; }
        public string BookId { get; protected set; } = string.Empty;
        public Book Book { get; protected set; }

        //user id identity

        private Review() { }
        public Review(string bookId, string title, string content)
        {
            BookId = bookId;
            Title = title;
            Content = content;
            CreatedAt = DateTime.Now.ToUniversalTime();
        }

    }
    
}

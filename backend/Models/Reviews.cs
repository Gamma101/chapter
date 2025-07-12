using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Reviews")]
    public class Reviews
    {
        public int Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string Content { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; } = DateTime.Now.ToUniversalTime();
        public string BookId { get; protected set; }
        public Books Book { get; protected set; }

        //user id identity

        private Reviews() { }
        public Reviews(string bookId, string title, string content)
        {
            BookId = bookId;
            Title = title;
            Content = content;
        }

    }
    
}

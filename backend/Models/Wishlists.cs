using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("Wishlists")]
    public class Wishlists
    {
        public int Id { get; set; }
        public DateTime Description { get; set; }
        public string BookId { get; protected set; }
        public Books Book { get; protected set; }
        //userid

        private Wishlists() { }
        public Wishlists(string bookId)
        {
            BookId = bookId;
            Description = DateTime.Now.ToUniversalTime();
        }


    }
}

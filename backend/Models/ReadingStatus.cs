using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("ReadingStatuses")]
    public class ReadingStatus
    {
        public int Id { get; private set; }
        public string UserReadingStatus { get; private set; } = string.Empty;
        public DateTime UpdatedAt { get; private set; }
        public string BookId { get; protected set; } = string.Empty;
        public Book Book { get; protected set; }

        //USERID

        private ReadingStatus() { }
        public ReadingStatus(string bookid, string status)
        {
            BookId = bookid;
            UserReadingStatus = status;
            UpdatedAt = DateTime.Now.ToUniversalTime();

        }
    }
}

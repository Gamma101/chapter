using System.ComponentModel.DataAnnotations.Schema;

namespace Chapter.Models
{
    [Table("ReadingStatuses")]
    public class ReadingStatuses
    {
        public int Id { get; private set; }

        
        public string Status { get; private set; }
        public DateTime UpdatedAt { get; private set; }
        public string BookId { get; protected set; }
        public Books Book { get; protected set; }

        //USERID

        private ReadingStatuses() { }
        public ReadingStatuses(string bookid, string status)
        {
            BookId = bookid;
            Status = status;
            UpdatedAt = DateTime.Now;

        }
    }
}

namespace backend.Dtos.Book
{
    public class BookDto
    {
        public int Id { get; set; }
        public string GoogleBookId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Authors { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public DateTime? PublishedDate { get; set; }
    }
}

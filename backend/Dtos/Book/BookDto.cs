namespace backend.Dtos.Book
{
    public class BookDto
    {
        public string Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Authors { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public DateOnly? PublishedDate { get; set; }
        public int? PageCount { get; set; }
    }
}

using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;

namespace Chapter.Models
{
    [Table("Books")]
    public class Book
    {
        public string Id { get; private set; } //Google books id
        public string Title { get; private set; } = string.Empty;
        public string Authors { get; private set; } = string.Empty;
        public string Description { get; private set; } = string.Empty;
        public string ThumbnailUrl { get; private set; } = string.Empty;
        public DateTime? PublishedDate { get; private set; } 

        private Book() { }
        public Book(string title, string authors, string description, string thumb)
        {
            Title = title;
            Authors = authors;
            Description = description;
            ThumbnailUrl = thumb;
            PublishedDate = DateTime.Now.ToUniversalTime();
        }

    }
}

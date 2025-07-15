using backend.Interfaces;
using backend.Models;
using Newtonsoft.Json;
using System.Text.Json;

namespace backend.Service
{
    public class GoogleBooksService : IGoogleBooksService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public GoogleBooksService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }
        public async Task<GoogleBookItem?> GetBookByIdAsync(string volumeId)
        {
            var apiKey = _configuration["GoogleBooks:ApiKey"];
            var url = $"https://www.googleapis.com/books/v1/volumes/{volumeId}?key={apiKey}";

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) {return null;}

            var json = await response.Content.ReadAsStringAsync();
            var book = System.Text.Json.JsonSerializer.Deserialize<GoogleBookItem>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return book;
        }

    }
}

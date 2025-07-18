using backend.Models;

namespace backend.Interfaces
{
    public interface IGoogleBooksService
    {
        public Task<GoogleBookItem?> GetByGoogleIdAsync(string volumeId);
    }
}

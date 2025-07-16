namespace backend.Interfaces
{
    public interface IBookRepository
    {
        Task<bool> BookExist(int id);
    }
}

namespace backend.Models
{
    public class GoogleBookItem
    {
        public string Id { get; set; }
        public VolumeInfo VolumeInfo { get; set; }
    }

    public class VolumeInfo
    {
        public string Title { get; set; }
        public List<string>? Authors { get; set; }
        public string? Description { get; set; }
        public ImageLinks? ImageLinks { get; set; }
    }

    public class ImageLinks
    {
        public string? Thumbnail { get; set; }
    }
}

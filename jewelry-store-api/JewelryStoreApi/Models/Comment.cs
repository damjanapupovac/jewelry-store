using System;

namespace JewelryStoreApi.Models
{
    public class Comment
    {
        public int? Id { get; set; }
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        public string? UserName { get; set; }
        public string? Text { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

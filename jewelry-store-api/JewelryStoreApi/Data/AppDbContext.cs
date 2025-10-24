using System;
using Microsoft.EntityFrameworkCore;
using JewelryStoreApi.Models;

namespace JewelryStoreApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}

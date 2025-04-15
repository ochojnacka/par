using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace ProductsApi.Models
{
    public class ProductContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public ProductContext(DbContextOptions<ProductContext> options) : base(options)
        {
        }
    }
}
namespace ProductsApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public bool Instock { get; set; }
        public required string Name { get; set; }
    }
}

namespace ProductsApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string? Token { get; set; }
    }
}
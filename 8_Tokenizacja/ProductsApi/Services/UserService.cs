using ProductsApi.Models;

namespace ProductsApi.Services
{
    public class UserService : IUserService
    {
        public User? Authenticate(string username, string password)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
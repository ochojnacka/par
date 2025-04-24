using ProductsApi.Models;

namespace ProductsApi.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Authenticates a user with the given credentials
        /// </summary>
        /// <param name="username">The username of the user</param>
        /// <param name="password">The password of the user</param>
        /// <returns>User object if authentication is successful, null otherwise</returns>
        User? Authenticate(string username, string password);

        /// <summary>
        /// Gets all users in the system
        /// </summary>
        /// <returns>Collection of all users</returns>
        IEnumerable<User> GetAll();
    }
}
using System.Threading.Tasks;
using GiftApp.API.Models;

namespace GiftApp.API.Repository
{
    public interface IRepository
    {
         
        Task<User> Login(string userEmail, string password);     

        Task<bool> UserExists(string userEmail);
        

    }
}
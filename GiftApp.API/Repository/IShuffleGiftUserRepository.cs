using System.Threading.Tasks;
using GiftApp.API.Models;

namespace GiftApp.API.Repository
{
    public interface IShuffleGiftUserRepository
    {
        Task<Shuffle> GetShuffleGiftData(int eventId, int userId);
    }
}
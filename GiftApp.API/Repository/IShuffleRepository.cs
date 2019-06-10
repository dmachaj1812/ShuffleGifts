using System.Threading.Tasks;

namespace GiftApp.API.Repository
{
    public interface IShuffleRepository
    {
         bool ShuffleUsers();
         bool ShuffleGifts();
    }
}
using System.Threading.Tasks;
using GiftApp.API.Data;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Repository
{
    public class ShuffleGiftUserRepository : IShuffleGiftUserRepository
    {
        private readonly DataContext _context;
        public ShuffleGiftUserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Shuffle> GetShuffleGiftData(int eventId, int userId)
        {
            var userEventDB = await _context.UserEvent
                                    .Include(x => x.Shuffle)
                                        .ThenInclude(x => x.UserGiftFor)
                                    .Include(x => x.Shuffle)
                                        .ThenInclude(x => x.Gifts)
                                    .FirstOrDefaultAsync(x => x.EventId == eventId && x.UserId == userId);

            return userEventDB.Shuffle;
        }

    }
}
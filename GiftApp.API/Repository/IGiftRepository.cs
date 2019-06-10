using System.Collections.Generic;
using System.Threading.Tasks;
using GiftApp.API.DTOs;
using GiftApp.API.Models;

namespace GiftApp.API.Repository
{
    public interface IGiftRepository
    {
         Task<ICollection<Gift>> GetAll(int userId, int eventId);
         Task<Gift> CreateWishListGift(GiftToCreateDTO gift);
         Task<Gift> CreateUserEventGift(GiftToCreateDTO gift);
         Task<string> DeleteGift(List<int> giftIds);
         Task<Gift> EditGift(Gift gift);
         Task<List<Gift>> GetAllWishGiftList(int userId);
         Task<List<Gift>> AddFromWishList(AddRemoveWishListGiftDTO addFromWishListDTO);
         Task<string> DeleteWishListGift(AddRemoveWishListGiftDTO addRemoveWishListGiftDTO);
    }
}
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using GiftApp.API.Data;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Repository
{
    public class GiftRepository : IGiftRepository
    {
        private readonly DataContext _context;
        public GiftRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Gift>> GetAll(int userId, int eventId)
        {
            var giftsToReturn = new List<Gift>();

            var userEventDB = await _context.UserEvent.
                        Include(x => x.Gift).
                        FirstOrDefaultAsync(x => x.UserId == userId && x.EventId == eventId);

            if (userEventDB == null) return null;

            foreach (var gift in userEventDB.Gift)
            {

                if (gift.IsActive == true)
                {
                    giftsToReturn.Add(gift);
                }

            }

            return giftsToReturn;
        }

        public async Task<string> DeleteGift(List<int> giftIds)
        {
            foreach (var giftId in giftIds)
            {
                var giftDB = await _context.Gifts.FirstOrDefaultAsync(x => x.Id == giftId);
                giftDB.IsActive = false;
            }

            await _context.SaveChangesAsync();
            return "OK";
        }

        public async Task<string> DeleteWishListGift(AddRemoveWishListGiftDTO addRemoveWishListGiftDTO)
        {
            var userEventDB = await _context.UserEvent.
                                    Include(x => x.Gift).
                                    FirstOrDefaultAsync(x => x.EventId == addRemoveWishListGiftDTO.EventId &&
                                        x.UserId == addRemoveWishListGiftDTO.UserId);

            foreach (var giftToRemoveId in addRemoveWishListGiftDTO.GiftIds)
            {
                userEventDB.Gift.Remove(userEventDB.Gift.FirstOrDefault(x => x.Id == giftToRemoveId));
            }

            await _context.SaveChangesAsync();
            return "OK";
        }

        public async Task<Gift> CreateWishListGift(GiftToCreateDTO gift)
        {

            var userDB = await _context.Users.Include(x => x.WishListGifts).FirstOrDefaultAsync(x => x.Id == gift.UserId);
            if (userDB == null) return null;

            var giftToAdd = new Gift()
            {
                GiftName = gift.GiftName,
                GiftDescription = gift.GiftDescription,
                Price = gift.Price,
                GiftUrl = gift.GiftUrl
            };


            userDB.WishListGifts.Add(giftToAdd);
            _context.SaveChanges();
            return giftToAdd;
        }

        public async Task<List<Gift>> AddFromWishList(AddRemoveWishListGiftDTO addRemoveWishListGiftDTO)
        {

            var userEventDB = await _context.UserEvent.FirstOrDefaultAsync(x => x.UserId == addRemoveWishListGiftDTO.UserId &&
                                                                           x.EventId == addRemoveWishListGiftDTO.EventId);

            var giftsToReturn = new List<Gift>();

            foreach (var giftId in addRemoveWishListGiftDTO.GiftIds)
            {
                var giftDB = await _context.Gifts.FirstOrDefaultAsync(x => x.Id == giftId);

                userEventDB.Gift.Add(giftDB);
                giftsToReturn.Add(giftDB);
            }

            await _context.SaveChangesAsync();

            return giftsToReturn;
        }

        public async Task<Gift> CreateUserEventGift(GiftToCreateDTO gift)
        {
            var userEventDB = await _context.UserEvent.FirstOrDefaultAsync(x => x.EventId == gift.EventId && x.UserId == gift.UserId);

            var giftToAdd = new Gift()
            {
                GiftName = gift.GiftName,
                GiftDescription = gift.GiftDescription,
                Price = gift.Price,
                GiftUrl = gift.GiftUrl
            };

            userEventDB.Gift.Add(giftToAdd);
            await _context.SaveChangesAsync();

            return giftToAdd;
        }



        public async Task<List<Gift>> GetAllWishGiftList(int userId)
        {
            var userDB = await _context.Users.Include(x => x.WishListGifts).FirstOrDefaultAsync(x => x.Id == userId);
            if (userDB == null) return null;

            var allWishListGiftsToReturn = new List<Gift>();

            foreach (var gift in userDB.WishListGifts)
            {
                if (gift.IsActive == true)
                {
                    allWishListGiftsToReturn.Add(gift);
                }
            }

            return allWishListGiftsToReturn;


        }

        public async Task<Gift> EditGift(Gift gift)
        {
            var giftDB = await _context.Gifts.FirstOrDefaultAsync(x => x.Id == gift.Id);
            if (giftDB == null) return null;

            giftDB.GiftName = gift.GiftName;
            giftDB.GiftDescription = gift.GiftDescription;
            giftDB.GiftUrl = gift.GiftUrl;
            giftDB.Price = gift.Price;
            giftDB.GiftName = gift.GiftName;


            await _context.SaveChangesAsync();

            return giftDB;
        }


    }
}
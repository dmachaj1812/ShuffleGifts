using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using GiftApp.API.Models;

namespace GiftApp.API.Helpers
{
    public class ShuffleGiftsHelper
    {

        public static GiftBundle ShuffleGiftsAlgorithm(IList<Gift> giftsToShuffle, double maxPrice)
        {
            Random _rand = new Random(Guid.NewGuid().GetHashCode());

            IList<Gift> copyGiftsToShuffle = new List<Gift>(giftsToShuffle);
            GiftBundle giftBundle = new GiftBundle();
            int randNumber;

            while (copyGiftsToShuffle.Any())
            {
                randNumber = _rand.Next(0, copyGiftsToShuffle.Count);

                if (giftBundle.TotalPrice + copyGiftsToShuffle.ElementAt(randNumber).Price <= maxPrice)
                {
                    giftBundle.Gifts.Add(copyGiftsToShuffle.ElementAt(randNumber));
                    giftBundle.TotalPrice += copyGiftsToShuffle.ElementAt(randNumber).Price;

                    if (copyGiftsToShuffle.ElementAt(randNumber).Price == maxPrice)
                    {
                        break;
                    }
                }

                 copyGiftsToShuffle.RemoveAt(randNumber); 

            }

            return giftBundle;
        }
    }
}
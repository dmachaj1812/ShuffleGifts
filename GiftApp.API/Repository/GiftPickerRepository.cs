using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GiftApp.API.Data;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Repository
{
    public class GiftPickerRepository : IGiftPickerRepository
    {
        private readonly DataContext _context;
        public GiftPickerRepository(DataContext context)
        {
            _context = context;
        }
        public ICollection<User> GiftPicker()
        {
            var giftTable = _context.Users.Where(x => x.IsActive == true).Select(x => x.Id).ToList();
            if (giftTable == null) return null;
            var listLength = giftTable.Count - 1;            
            goto ForLoop;

            ForLoop:
            ShuffleList(giftTable);
            for (int i = 0; i <= listLength; i++)
            {
                User userToAd = new User();
                User user = new User();

                if (i == listLength)
                {
                    user = _context.Users.FirstOrDefault(x => x.Id == giftTable[i]);                   
                   // user.BuysForUserId = giftTable[0];
                    
                }
                else
                {
                    user = _context.Users.FirstOrDefault(x => x.Id == giftTable[i]);                   
                   // user.BuysForUserId = giftTable[i+1];
                    
                }

            }

            // var ListOfGiftForId = _context.Users.Where(x => x.IsActive == true)
            //                         .Where(x => x.Role == "user").Select(x => x.Id).ToList();
            // bool isUnique = ListOfGiftForId.Distinct().Count() == ListOfGiftForId.Count();
            // if (!isUnique)
            // {
            //     goto ForLoop;
            // }
            _context.SaveChanges();
            var usersToReturn = _context.Users.Where(x => x.IsActive == true).ToList();
            return usersToReturn;
        }

        private void ShuffleList(IList<int> ListToShuffle)
        {
            Random rnd = new Random(DateTime.Now.Millisecond);

            int listLength = ListToShuffle.Count;

            for (int i = 0; i < listLength; i++)
            {
                int temp = ListToShuffle[i];
                int randNumber = rnd.Next(0, listLength - 1);
                int temp2 = ListToShuffle[randNumber];

                ListToShuffle[randNumber] = temp;
                ListToShuffle[i] = temp2;
                Thread.Sleep(22);

            }

        }
    }
}
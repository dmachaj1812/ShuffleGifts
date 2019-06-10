using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftApp.API.Data;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Repository
{
    public class GetSeededDataRepository : IGetSeededDataRepository
    {
        private readonly DataContext _context;
        public GetSeededDataRepository(DataContext context)
        {
            _context = context;
        }

        //Return a list of list of EventOptions
        public async Task<List<List<EventOption>>> GetEventOptions()
        {
            var allEventOptions = await _context.EventOptions.ToListAsync();
            if (allEventOptions == null) return null;

            var tempList = new List<EventOption>();
            var allEventOptionsToReturn = new List<List<EventOption>>();

            var category = allEventOptions[0].Category;
            foreach (var option in allEventOptions)
            {
                if (option.Category == category)
                {
                    tempList.Add(option);
                }
                else
                {
                    allEventOptionsToReturn.Add(tempList);
                    tempList = new List<EventOption>();
                    tempList.Add(option);
                    category = option.Category;
                }
            }
            allEventOptionsToReturn.Add(tempList);
            return allEventOptionsToReturn;
        }
    }
}
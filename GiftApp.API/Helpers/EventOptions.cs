using System.Collections.Generic;
using System.Collections.ObjectModel;
using GiftApp.API.Models;

namespace GiftApp.API.Helpers
{
    public class EventOptions
    {
        public static EventOption UnkonwGiftGiver()
        {
            return new EventOption
            {
                Name = "Unkown",
                Category = "GiftReceiverKnown",
                Description = "A gift giver will not know, for whom the gift is."
            };
        }
        public static EventOption KnownGiftGiver()
        {
            return new EventOption
            {
                Name = "Known",
                Category = "GiftReceiverKnown",
                Description = "A gift giver will know, for whom the gift is."
            };
        }
        public static EventOption OneOfManyGifts()
        {
            return new EventOption
            {
                Name = "One of Many",
                Category = "HowManyGifts",
                Description = "A participant can add as many gifts as he wants , and a gift giver will choose which ones to buy"
            };
        }
        public static EventOption OneGift()
        {
            return new EventOption
            {
                Name = "One",
                Category = "HowManyGifts",
                Description = "A participant cannot add more gifts of value more than the max price of event."
            };
        }
        public static EventOption AlgorithmChooses()
        {
            return new EventOption
            {
                Name = "Algorithm",
                Category = "WhoChoosesGifts",
                Description = "An algoritm will choose which gifts to buy."
            };
        }
        public static EventOption ParticipantChooses()
        {
            return new EventOption
            {
                Name = "Participant",
                Category = "WhoChoosesGifts",
                Description = "A participant will choose which gifts to buy."
            };
        }

        public static ICollection<EventOption> GetAllEventOptions(){
            ICollection<EventOption> allEventOptions = new Collection<EventOption>();
            allEventOptions.Add(EventOptions.UnkonwGiftGiver());
            allEventOptions.Add(EventOptions.UnkonwGiftGiver());
            allEventOptions.Add(EventOptions.UnkonwGiftGiver());
            allEventOptions.Add(EventOptions.UnkonwGiftGiver());
            allEventOptions.Add(EventOptions.UnkonwGiftGiver());
            allEventOptions.Add(EventOptions.UnkonwGiftGiver());

            return allEventOptions;
        }
    }
}
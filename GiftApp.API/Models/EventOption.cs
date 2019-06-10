using System.Collections.Generic;

namespace GiftApp.API.Models
{
    public class EventOption
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }

        public IList<EventOptionEvent> EventOptionEvents { get; set; }

    }
}
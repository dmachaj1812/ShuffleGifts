using System;
using System.Collections.Generic;

namespace GiftApp.API.Models
{
    public class Event : IEntity
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string EventPlace { get; set; }
        public double MaxPrice{get;set;} 
        public double MinPrice{get;set;} 
        public DateTime DateTimeOfEvent{get;set;}
        public DateTime GiftsAddBy{get;set;} // optional
        public DateTime RSVP { get; set; }

        public Address Address { get; set; }
        public EventType EventType {get;set;}
        public IList<UserEvent> UserEvents { get; set; } = new List<UserEvent>();
        public IList<EventOptionEvent> EventOptionEvents { get; set; } = new List<EventOptionEvent>();
        public IList<Comment> Comments {get;set;} = new List<Comment>();

        public bool ParticipantsShuffled { get; set; } = false;
        public bool GiftsShuffled { get; set; } = false;
        public bool IsActive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }

    }
}
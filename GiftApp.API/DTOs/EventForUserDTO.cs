using System;

namespace GiftApp.API.DTOs
{
    public class EventForUserDTO
    {
        public int EventId { get; set; }
        public string  EventName { get; set; }
        public string  EventType {get;set;}

        public DateTime RSVP {get;set;}
        
        public bool IsConfirmed {get;set;}
    }
}
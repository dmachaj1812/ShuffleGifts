using System;
using System.Collections.Generic;
using GiftApp.API.Models;

namespace GiftApp.API.DTOs
{
    public class EventToReturnDTO
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string EventType { get; set; }
        public string EventPlace { get; set; }
        public string MailingAddress { get; set; }
        public int? ZipCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime RSVP { get; set; }
        public DateTime GiftsAddBy { get; set; } 
        public DateTime DateTimeOfEvent {get;set;}
        public int? MaxPrice { get; set; } 
        public int? MinPrice { get; set; } 
        public IEnumerable<string> EventOptions { get; set; }

        public bool GiftsShuffled { get; set; }
        public bool ParticipantsShuffled {get;set;} 
       
        
    }
}
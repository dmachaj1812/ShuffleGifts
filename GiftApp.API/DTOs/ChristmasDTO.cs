using System;

namespace GiftApp.API.DTOs
{
    public class ChristmasDTO
    {
        public int MaxPrice{get;set;}
        public int MinPrice{get;set;}
        public DateTime GiftsAddBy{get;set;}
        public bool SecretSanta{get;set;} // Secret Santa od Known Names
        public bool OneOfMany{get;set;} // One of many or One
        public bool ParticipantsChoices{get;set;} // Participants or Algorimth chooses gifts to buy 
    }
}
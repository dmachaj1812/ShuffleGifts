using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiftApp.API.Models
{
    public class UserEvent
    {

        public int UserId{get;set;}
        public User User {get;set;}
        public int EventId {get;set;}
        public Event Event {get;set;}
        public List<Gift> Gift{get;set;} = new List<Gift>();

        public int RoleId {get;set;}
        public Role Role{get;set;}

        public Shuffle Shuffle { get; set; }

        public bool IsConfirmed{get;set;} = false;

        public bool Participats {get;set;} = true;

        public bool IsActive {get;set;} = true;
    }
}
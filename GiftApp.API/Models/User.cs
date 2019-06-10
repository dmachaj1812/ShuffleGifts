using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace GiftApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public bool IsActive {get;set;}
        public string UserName { get; set; }
        public string Email {get;set;}
        
        public  IList<UserEvent> UserEvents{get;set;} = new List<UserEvent>();

        public IList<Gift> WishListGifts{get;set;} = new List<Gift>();
        
       
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }      
    }
}
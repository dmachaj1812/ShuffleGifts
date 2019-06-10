using System.Collections.Generic;
using GiftApp.API.Models;

namespace GiftApp.API.DTOs
{
    public class UsersToReturnDTO
    {
        public int Id { get; set; }
        public bool IsActive {get;set;}
        public string UserName { get; set; }
        public string Email {get;set;}        
        public ICollection<GiftToRetrunDTO> Gifts {get;set;}
    }
}
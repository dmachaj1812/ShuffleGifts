using System.Collections.Generic;

namespace GiftApp.API.DTOs
{
    public class DeleteUserEventGiftDTO
    {
        public int UserId { get; set; } 
        public int EventId { get; set; }
        public List<int>  GiftIds { get; set; }
    }
}
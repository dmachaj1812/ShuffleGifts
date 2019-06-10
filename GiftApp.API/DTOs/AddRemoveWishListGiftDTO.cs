using System.Collections.Generic;

namespace GiftApp.API.DTOs
{
    public class AddRemoveWishListGiftDTO
    {   
        public int UserId { get; set; }
        public int EventId { get; set; }
        public IList<int> GiftIds { get; set; }
    }
}
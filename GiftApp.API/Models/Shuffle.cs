using System.Collections.Generic;

namespace GiftApp.API.Models
{
    public class Shuffle
    {   
        public int Id { get; set; }
        public User UserGiftFor { get; set; }
        public ICollection<Gift> Gifts { get; set; }

        

    }
}
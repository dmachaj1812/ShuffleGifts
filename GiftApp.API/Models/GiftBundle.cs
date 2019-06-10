using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace GiftApp.API.Models
{
    public class GiftBundle
    {
        public ICollection<Gift> Gifts { get; set; } = new Collection<Gift>();
        public double TotalPrice{ get; set; } = 0;
    }
}
using System.Collections.Generic;

namespace GiftApp.API.DTOs
{
    public class ShuffleGiftDataToReturnDTO
    {
        public string GiftForName { get; set; }
        public IList<GiftToRetrunDTO> ListOfGiftsToBuy { get; set; }
    }
}
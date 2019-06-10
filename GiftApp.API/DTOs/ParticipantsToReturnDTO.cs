using GiftApp.API.Models;

namespace GiftApp.API.DTOs
{
    public class ParticipantsToReturnDTO
    {
        public UsersToReturnDTO User { get; set; }
        public int GiftNumber { get; set; }
        public bool IsConfirmed { get; set; }
        public Role Role {get;set;}

        
    }
}
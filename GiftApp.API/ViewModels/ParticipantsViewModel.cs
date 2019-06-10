using System.Collections.Generic;
using GiftApp.API.DTOs;

namespace GiftApp.API.ViewModels
{
    public class ParticipantsViewModel
    {
        public IList<ParticipantToAddDTO> Participants { get; set; }
        public int EventId{get;set;}
    }
}
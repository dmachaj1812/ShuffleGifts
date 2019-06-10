namespace GiftApp.API.DTOs
{
    public class HostingEventToReturnDTO
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string EventType { get; set; }
        public int NumberOfParticipants {get;set;}
        public int NumberOfConfirmed { get; set; }
    }
}
namespace GiftApp.API.Models
{
    public class EventOptionEvent
    {
       public int EventOptionId { get; set; }
       public EventOption EventOption { get; set; }
       public int EventId { get; set; }
       public Event Event { get; set; }
    }
}
namespace GiftApp.API.DTOs
{
    public class GiftToCreateDTO
    {
        public int UserId { get; set; }
        public int? EventId { get; set; }    
        public string  GiftName { get; set; }
        public string GiftUrl { get; set; }
        public double Price { get; set; }
        public string GiftDescription { get; set; } 
        public string GiftType { get; set; }
    }
}
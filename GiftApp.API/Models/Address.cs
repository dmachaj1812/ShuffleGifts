namespace GiftApp.API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string MailingAddress {get;set;}
        public int? ZipCode{get;set;}
        public string City {get;set;}
        public string State {get;set;}
    }
}
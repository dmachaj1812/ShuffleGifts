using System.ComponentModel.DataAnnotations;

namespace GiftApp.API.Models
{
    public class Gift   
    {
        public int Id { get; set; }
        public bool IsActive { get; set; } = true;
        public string  GiftName { get; set; }
        public string GiftUrl { get; set; }
        public string GiftDescription { get; set; }
        public double Price {get;set;}


     
       
    }
}
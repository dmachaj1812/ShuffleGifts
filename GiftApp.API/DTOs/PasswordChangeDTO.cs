namespace GiftApp.API.DTOs
{
    public class PasswordChangeDTO
    {   
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
     
    }
}
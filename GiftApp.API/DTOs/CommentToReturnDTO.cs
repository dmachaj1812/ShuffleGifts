using System;

namespace GiftApp.API.DTOs
{
    public class CommentToReturnDTO
    {
        public int UserId {get;set;}
        public string CommentText { get; set; }
        public string UserName {get;set;}
        public DateTime CreatedOn {get;set;}
        
    }
}
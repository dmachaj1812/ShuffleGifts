using System;

namespace GiftApp.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime? CreatedOn { get; set; }
        public User User { get; set; } 

    }
}
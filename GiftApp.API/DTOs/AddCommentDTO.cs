namespace GiftApp.API.DTOs
{
    public class AddCommentDTO
    {
        public int EventId { get; set; }
        public int UserId {get;set;}
        public string CommentText { get; set; }
    }
}
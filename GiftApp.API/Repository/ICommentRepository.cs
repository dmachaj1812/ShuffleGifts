using System.Collections.Generic;
using System.Threading.Tasks;
using GiftApp.API.DTOs;
using GiftApp.API.Models;

namespace GiftApp.API.Repository
{
    public interface ICommentRepository
    {
         Task<IList<Comment>> GetAll (int eventId);
         Task<Comment> AddComment (AddCommentDTO addCommentDTO);
    }
}
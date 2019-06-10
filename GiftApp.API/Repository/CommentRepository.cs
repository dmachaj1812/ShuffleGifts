using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftApp.API.Data;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _context;
        public CommentRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IList<Comment>> GetAll(int eventId)
        {
            var allCommentsDB = new List<Comment>();
            var eventDB = await _context.Events.
                            Include(x => x.Comments).
                            ThenInclude(x => x.User).
                            Where(x => x.Id == eventId && x.IsActive == true).
                            FirstOrDefaultAsync();

            if (eventDB == null || eventDB.Comments == null) return null;

            foreach (var comment in eventDB.Comments)
            {
                allCommentsDB.Add(comment);
            }

            return allCommentsDB;
        }
        public async Task<Comment> AddComment(AddCommentDTO addCommentDTO)
        {

            var eventDB = await _context.Events.FirstOrDefaultAsync(x => x.Id == addCommentDTO.EventId);
            if (eventDB == null) return null;

            var userDB = await _context.Users.FirstOrDefaultAsync(x => x.Id == addCommentDTO.UserId);
            if (userDB == null) return null;

            var newComment = new Comment()
            {
                CommentText = addCommentDTO.CommentText,
                CreatedOn = DateTime.Now,
                User = userDB
            };


            await _context.Comments.AddAsync(newComment);


            eventDB.Comments.Add(newComment);

            await _context.SaveChangesAsync();

            return newComment;

        }
    }
}
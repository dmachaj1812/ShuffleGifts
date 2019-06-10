using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{
    //[Authorize] Remove commnet before deployment
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _repo;
        private readonly IMapper _mapper;
        public CommentController(ICommentRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("GetAll/{eventId}")]
        public async Task<IActionResult> GetAll(int eventId){
            var commentsDB = await _repo.GetAll(eventId);
            if(commentsDB == null) return BadRequest();

            var commentsToReturn = _mapper.Map<IList<CommentToReturnDTO>>(commentsDB);

            return Ok(commentsToReturn);
        }

        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment(AddCommentDTO addCommentDto){
            
            var commnetDB = await _repo.AddComment(addCommentDto);
            if(commnetDB == null) return BadRequest();

            var commentToReturn = _mapper.Map<CommentToReturnDTO>(commnetDB);
            

            return Ok(commentToReturn);
        }
    }
}
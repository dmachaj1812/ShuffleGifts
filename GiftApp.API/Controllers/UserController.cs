using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using GiftApp.API.Repository;
using GiftApp.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{
   // [Authorize()]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IUsersRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        

        [HttpPost("addParticipants")]
        public async Task<IActionResult> AddParticipants(ParticipantsViewModel participants){
            
           var participantsDB = await _repo.AddParticipants(participants);
           if(participantsDB == null) return BadRequest();
        
           var participantsToReturn = _mapper.Map<IList<UsersToReturnDTO>>(participantsDB);
            return Ok(participantsToReturn);
            
        }

        [HttpGet("GetParticipants/{eventId}")]
        public async Task<IActionResult> GetParticipants(int eventId){
            var allParticipants = await _repo.GetAllParticipants(eventId);
            if(allParticipants == null) return Ok(null);

            var allParticipantsToReturn = _mapper.Map<IList<ParticipantsToReturnDTO>>(allParticipants);

            return Ok(allParticipantsToReturn);
        }

        [HttpGet("DeleteParticipant/{eventId}/{userId}")]
        public async Task<IActionResult> DeleteParticipant(int eventId, int userId){
            var participantToDelete = await _repo.DeleteParticipant(eventId, userId);
            if(participantToDelete == false) return BadRequest();
            return Ok(); 
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser(UserToRegisterDTO user){

            var userDB = await _repo.AddUser(user);

            if(userDB == null) return StatusCode(409); // Status Code 409 Conflict / Email exists

            return Ok(userDB);
        }
        [HttpGet("GetEmails/{eventId}")]
        public async Task<IActionResult> GetEmails(int eventId){
            var allEmails = await _repo.GetEmails(eventId);

            return Ok(allEmails);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id){
            var userDB = await _repo.DeleteUser(id);
            if(userDB == null) return BadRequest();
            return  StatusCode(202);
        }


        
    }
}
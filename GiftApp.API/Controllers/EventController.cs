using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using GiftApp.API.Repository;
using GiftApp.API.SeedData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GiftApp.API.Classes;


namespace GiftApp.API.Controllers
{
    //[Authorize] Remove commnet before deployment
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _repo;
        private readonly IMapper _mapper;
        public EventController(IEventRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        [HttpPost("AddEvent")]
        public async Task<IActionResult> AddEvent(EventToAddDTO eventToAdd)
        {
            var eventDB = await _repo.Add(eventToAdd);
            
            var eventToReturn = _mapper.Map<EventToReturnDTO>(eventDB);

            return Ok(eventToReturn);
        }

        [HttpGet("GetAll/{userId}")]
        public async Task<IActionResult> GetAllEvents(int userId)
        {
            var allEvents = await _repo.GetAll(userId);
            if (allEvents == null) return BadRequest();

            var allEventsToReturn = _mapper.Map<ICollection<EventToReturnDTO>>(allEvents);

            return Ok(allEventsToReturn);
        }

        [HttpGet("GetAllHostingEvents/{userId}")]
        public async Task<IActionResult> GetAllHostingEvents(int userId){
            var allHostingEvents = await _repo.GetAll(userId);
            if( allHostingEvents == null) return BadRequest();

            var allHostingEventsToReturn = _mapper.Map<ICollection<HostingEventToReturnDTO>>(allHostingEvents);
            return Ok(allHostingEventsToReturn);
        }

        //Returns a list of events for role user
        [HttpGet("GetAllUserEvent/{userId}")]
        public async Task<IActionResult> GetAllForUser(int userId)
        {
            var allEvents = await _repo.GetAllUserEvent(userId);
            if (allEvents == null) return BadRequest();

            var allEventsToReturn = _mapper.Map<ICollection<EventForUserDTO>>(allEvents);
            return Ok(allEventsToReturn);
        }

        [HttpPatch("ConfirmUserEvent")]
        public async Task<IActionResult> ConfirmUserEvent(ConfirmUserEventDTO confirmUserEventDTO){
            var userEventDB = await _repo.ConfirmUserEvent(confirmUserEventDTO);

            if(userEventDB == null) return BadRequest();

            var userEventToReturn = _mapper.Map<EventForUserDTO>(userEventDB);

            return Ok(userEventToReturn);
        }


        [HttpGet("GetById/{eventId}")]
        public async Task<IActionResult> GetById(int eventId)
        {
            var eventDB = await _repo.GetById(eventId);

            if (eventDB == null) return BadRequest();

            var eventToReturn = _mapper.Map<EventToReturnDTO>(eventDB);
          
            return Ok(eventToReturn);
        }

        [HttpDelete("DeleteEvent/{eventId}")]
        public async Task<IActionResult> DeleteEvent(int eventId)
        {
            var deletedEvent = await _repo.Delete(eventId);

            if (deletedEvent == null) return BadRequest();

            return Ok();
        }
        [HttpPatch("edit")]
        public async Task<IActionResult> EditEvent(EventToEditDTO eventToEdit)
        {

            var eventDB = await _repo.Edit(eventToEdit);

            if (eventDB == null) return BadRequest();

            return Ok();
        }

        [HttpGet("CheckUserEventRole/{eventId}/{userId}")]
        public async Task<IActionResult> CheckUserEventRole(int eventId, int userId){
            var role = await _repo.CheckUserEventRole(eventId, userId);

            if(role == null){
                return Ok(Roles.UserRole());
            }

            return Ok(role);
        }
    }
}
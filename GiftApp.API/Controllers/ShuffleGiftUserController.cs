using System.Threading.Tasks;
using AutoMapper;
using GiftApp.API.DTOs;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{
    // [Authorize] Remove Comment before deployment
    [ApiController]
    [Route("api/[controller]")]
    public class ShuffleGiftUserController : ControllerBase
    {
        private readonly IShuffleGiftUserRepository _repo;
        private readonly IMapper _mapper;
        public ShuffleGiftUserController(IShuffleGiftUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("GetShuffleGiftData/{eventId}/{userId}")]
        public async Task<IActionResult> GetShuffleGiftData(int eventId, int userId){
            
            var shuffleGiftData = await _repo.GetShuffleGiftData(eventId, userId);

            var shuffleGiftDataToReturn = _mapper.Map<ShuffleGiftDataToReturnDTO>(shuffleGiftData);
           
            return Ok(shuffleGiftDataToReturn);
        }


        
    }
}
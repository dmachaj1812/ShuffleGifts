using System.Threading.Tasks;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{
    // [Authorize(Roles="SuperAdmin")] Remove Comment before deployment 
    [Route("api/[controller]")]
    [ApiController]
    public class ShuffleController: ControllerBase
    {
        private readonly IShuffleRepository _repo;
        public ShuffleController(IShuffleRepository repo)
        {
            _repo = repo;
        }


        [HttpGet("ShuffleGifts")]
        public IActionResult ShuffleGifts(){
            _repo.ShuffleUsers();
            _repo.ShuffleGifts();

            return Ok();

        }
        
    }
}
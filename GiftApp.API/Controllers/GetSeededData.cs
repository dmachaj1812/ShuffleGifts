using System.Threading.Tasks;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{
    //[Authorize] Remove commnet before deployment
    [Route("api/[controller]")]
    [ApiController]
    public class GetSeededData : ControllerBase
    {
        private readonly IGetSeededDataRepository _repo;
        public GetSeededData(IGetSeededDataRepository repo){
            _repo = repo;
        }

        [HttpGet("getEventOptions")]
        public async Task<IActionResult> GetEventOptions(){
            var allEventOptionsDB =  await _repo.GetEventOptions();
            if(allEventOptionsDB == null) return BadRequest();
            return Ok(allEventOptionsDB);
        }

        
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using GiftApp.API.DTOs;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{
    //[Authorize] Remove Comment before deployment
    [Route("api/[controller]")]
    [ApiController]
    public class GiftPickerController:ControllerBase
    {
        private readonly IGiftPickerRepository _repo;
        private readonly IMapper _mapper;
        public GiftPickerController(IGiftPickerRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet("GiftShuffle")]
        public IActionResult GiftPicker(){

            var users =  _repo.GiftPicker();

             var usersToReturn =  _mapper.Map<IEnumerable<UsersToReturnDTO>>(users);

            return Ok(users);
        }
    }
}
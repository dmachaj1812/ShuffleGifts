using System.Threading.Tasks;
using GiftApp.API.DTOs;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{   
    
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordRepository _repo;
        public PasswordController(IPasswordRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("GeneratePasswordResetToken")]
        public async Task<IActionResult> GeneratePasswordResetToken(PasswordResetRequestDTO passwordResetRequestDTO){

            var token = await _repo.GeneratePasswordResetToken(passwordResetRequestDTO.Email);
            if(token == null) return BadRequest();
            return Ok(token);
       }

        [Authorize]
        [HttpPost("PasswordChange")]
        public async Task<IActionResult> PasswordChange(PasswordChangeDTO passwordChangeDTO){

           var password = await _repo.PasswordChange(passwordChangeDTO);
           if(password == null) return BadRequest();

           return Ok();
         }
        
    }
}
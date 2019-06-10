using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GiftApp.API.DTOs;
using GiftApp.API.Helpers;
using GiftApp.API.Models;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NLog;

namespace GiftApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDTO user)
        {

            var loggedInUser = await _repo.Login(user.Email, user.Password);

            if (loggedInUser == null) return Unauthorized();

            var claims = new[]{
                    new Claim(ClaimTypes.NameIdentifier,loggedInUser.Id.ToString()),
                    new Claim(ClaimTypes.Name, loggedInUser.UserName),
                    new Claim(ClaimTypes.Email, loggedInUser.Email)

            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:JWTKEY").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

          

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }

    }
}
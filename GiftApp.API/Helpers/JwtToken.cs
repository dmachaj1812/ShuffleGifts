
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GiftApp.API.Helpers
{
    public class JwtToken: IJwtToken
    {
        private readonly IConfiguration _config;
        public JwtToken(IConfiguration config)
        {
            _config = config;
        }
       
       
        public string GenerateJwtToken(Claim[] claimToAdd, int hoursToExpire){
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:JWTKEY").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimToAdd),
                Expires = DateTime.Now.AddHours(hoursToExpire),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenToReturn = tokenHandler.WriteToken(token);

            return tokenToReturn;
        }
    }
}
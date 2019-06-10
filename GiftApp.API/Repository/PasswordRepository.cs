using System;
using System.Security.Claims;
using System.Threading.Tasks;
using GiftApp.API.Classes;
using GiftApp.API.Data;
using GiftApp.API.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using GiftApp.API.DTOs;
using System.Security.Principal;
using System.Text;

namespace GiftApp.API.Repository
{
    public class PasswordRepository : IPasswordRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly SendEmail _sendEmail;
        private readonly RandomKeyGenerator _randomKeyGenerator;
        public PasswordRepository(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
            _sendEmail = new SendEmail();
            _randomKeyGenerator = new RandomKeyGenerator();
        }
        public async Task<string> GeneratePasswordResetToken(string email)
        {
            var userDB = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (userDB == null) return null;


            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,userDB.Id.ToString()),
                new Claim(ClaimTypes.Name, email),

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:JWTKEY").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(12),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenToReturn = tokenHandler.WriteToken(token);

            _sendEmail.ResetPasswordEmail(email, tokenToReturn);
            return tokenToReturn;
        }

        public async Task<string> PasswordChange(PasswordChangeDTO passwordChangeDTO)
        {
            var userDB = await _context.Users.FirstOrDefaultAsync(x => x.Id == passwordChangeDTO.UserId && x.Email == passwordChangeDTO.Email);
            if (userDB == null) return null;

            byte[] passwordSalt, passwordHash;

            Password.CreateHashPassword(passwordChangeDTO.Password, out passwordSalt, out passwordHash);

            userDB.PasswordHash = passwordHash;
            userDB.PasswordSalt = passwordSalt;
            await _context.SaveChangesAsync();


            return passwordChangeDTO.Password;
        }
    }
}
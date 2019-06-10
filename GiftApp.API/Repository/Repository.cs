using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GiftApp.API.Classes;
using GiftApp.API.Data;
using GiftApp.API.Helpers;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Repository
{
    public class Repository : IRepository
    {
        private static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
        private readonly DataContext _context;
        private readonly SendEmail _sendEmail;
        private readonly RandomKeyGenerator _randomKeyGenerator;
        public Repository(DataContext context)
        {
            _context = context;
            _sendEmail = new SendEmail();
            _randomKeyGenerator = new RandomKeyGenerator();
        }

        public async Task<User> Login(string userEmail, string password)
        {

            var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == userEmail && x.IsActive == true);
            if (currentUser == null) return null;

            if (CheckPassword(password, currentUser.PasswordSalt, currentUser.PasswordHash))
                return currentUser;

            return null;


        }

        public async Task<bool> UserExists(string userEmail)
        {
            var userDB = await _context.Users.AnyAsync(x => x.UserName == userEmail);
            if (userDB == false) return false;
            return true;
        }



        public bool CheckPassword(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var toCheckPasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (toCheckPasswordHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }





    }
}
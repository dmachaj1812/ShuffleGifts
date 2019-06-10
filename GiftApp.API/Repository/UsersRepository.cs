using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftApp.API.Data;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;
using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;
using System;
using System.Text;
using GiftApp.API.Classes;
using GiftApp.API.ViewModels;
using GiftApp.API.Helpers;
using System.Security.Claims;

namespace GiftApp.API.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;
        private readonly IJwtToken _jwtToken;
        private readonly SendEmail _sendEmail;

        public UsersRepository(DataContext context, IJwtToken jwtToken)
        {
            _context = context;
            _jwtToken = jwtToken;
            _sendEmail = new SendEmail();

        }

        public async Task<IList<User>> AddParticipants(ParticipantsViewModel participants)
        {

            var userEvent = new UserEvent();
            IList<User> participantsToReturn = new List<User>();
            var eventDB = await _context.Events.FirstOrDefaultAsync(x => x.Id == participants.EventId);

            foreach (var participant in participants.Participants)
            {
                var userDB = _context.Users.FirstOrDefault(x => x.Email == participant.Email);
                if (userDB == null)
                {
                    userDB = new User()
                    {
                        Email = participant.Email,
                        UserName = participant.Name,
                        IsActive = true
                    };
                    var password = Password.PasswordGenerator();
                    byte[] passwordSalt, passwordHash;
                    Password.CreateHashPassword(password, out passwordSalt, out passwordHash);
                    userDB.PasswordHash = passwordHash;
                    userDB.PasswordSalt = passwordSalt;

                    _context.Users.Add(userDB);
                    _context.SaveChanges();

                    var claims = new[]{
                        new Claim(ClaimTypes.NameIdentifier,userDB.Id.ToString()),
                        new Claim(ClaimTypes.Name, participant.Email),
                    };

                    var token = _jwtToken.GenerateJwtToken(claims, 336);

                    _sendEmail.CreatingNewUser(participant.Email, eventDB.EventName, token);



                }


                //Check to see where a user was already added and then removed from event 
                bool wasAlreadyAdded = false;
                userEvent = _context.UserEvent.FirstOrDefault(x => x.EventId == eventDB.Id && x.UserId == userDB.Id);

                if (!(userEvent == null))
                {
                    userEvent.Participats = true;
                    wasAlreadyAdded = true;


                }
                else
                {
                    userEvent = new UserEvent()
                    {
                        UserId = userDB.Id,
                        User = userDB,
                        EventId = eventDB.Id,
                        Event = eventDB,
                        Participats = true
                    };
                }





                if (eventDB.CreatedBy == userDB.Id)
                {
                    userEvent.RoleId = Roles.AdminRole();
                }
                else if (participant.SemiAdmin == true)
                {
                    userEvent.RoleId = Roles.SemiAdminRole();
                }
                else
                {
                    userEvent.RoleId = Roles.UserRole();
                }

                _sendEmail.UserAddToEvent(userDB.Email, userDB.UserName);

                if (wasAlreadyAdded == false)
                {
                    _context.UserEvent.Add(userEvent);
                }



                participantsToReturn.Add(userDB);

            }

            _context.SaveChanges();

            return participantsToReturn;
        }

        public async Task<bool> DeleteParticipant(int eventId, int userId)
        {
            var userEvent = await _context.UserEvent.Include(x => x.Gift).Where(x => x.EventId == eventId && x.UserId == userId).FirstOrDefaultAsync();

            if (userEvent == null) return false;

            userEvent.Participats = false;
            userEvent.Gift.Clear();
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IList<UserEvent>> GetAllParticipants(int eventId)
        {
            var allParticipants = await _context.UserEvent
                                        .Include(b => b.User)
                                        .Include(b => b.Role)
                                        .Include(b => b.Gift)
                                            .Where(x => x.IsActive == true)
                                        .Where(x => x.EventId == eventId && x.IsActive == true && x.Participats == true)
                                        .ToListAsync();
            return allParticipants;
        }

        public async Task<IList<string>> GetEmails(int eventId)
        {
            var allParticipants = await _context.UserEvent.
                                        Include(b => b.User).
                                        Where(x => x.EventId == eventId && x.Participats == true).
                                        ToListAsync();

            var emailsToReturn = new List<string>();

            foreach (var email in allParticipants)
            {
                emailsToReturn.Add(email.User.Email);
            }

            return emailsToReturn;
        }
        public async Task<User> AddUser(UserToRegisterDTO user)
        {
            var userDB = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            if (!(userDB == null)) return null;

            var password = user.Password;


            byte[] passwordSalt, passwordHash;

            Password.CreateHashPassword(password, out passwordSalt, out passwordHash);

            User UserToAdd = new User()
            {
                IsActive = true,
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            await _context.Users.AddAsync(UserToAdd);
            await _context.SaveChangesAsync();

            return UserToAdd;

        }

        public async Task<User> DeleteUser(int id)
        {
            User user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return null;
            user.IsActive = false;
            await _context.SaveChangesAsync();

            return user;
        }




    }
}
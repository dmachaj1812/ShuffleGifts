using System.Collections.Generic;
using System.Threading.Tasks;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using GiftApp.API.ViewModels;

namespace GiftApp.API.Repository
{
    public interface IUsersRepository
    {
         
        
         Task<IList<User>> AddParticipants(ParticipantsViewModel participants);
         Task<bool> DeleteParticipant(int eventId, int userId);
         Task<IList<UserEvent>> GetAllParticipants(int eventId);
         Task<IList<string>> GetEmails(int eventId);
         Task<User> DeleteUser(int id);
         Task<User> AddUser(UserToRegisterDTO user);
        

    }
}
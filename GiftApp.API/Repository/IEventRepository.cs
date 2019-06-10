using System.Collections.Generic;
using System.Threading.Tasks;
using GiftApp.API.Classes;
using GiftApp.API.DTOs;
using GiftApp.API.Models;

namespace GiftApp.API.Repository
{
    public interface IEventRepository
    {
         Task<Event> Add(EventToAddDTO eventToAdd);
         Task<ICollection<Event>> GetAll(int userId);
         Task<ICollection<UserEvent>> GetAllUserEvent (int userId);
         Task<UserEvent> ConfirmUserEvent(ConfirmUserEventDTO confirmUserEventDTO);
         Task<Event> GetById(int eventId);
         Task<Event> Edit(EventToEditDTO eventToEdit);
         Task<Event> Delete(int id);
         Task<Role> CheckUserEventRole(int eventId, int userId);

    }
}
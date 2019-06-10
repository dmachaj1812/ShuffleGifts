using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftApp.API.Classes;
using GiftApp.API.Data;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;
        private readonly IUsersRepository _userRepo;
        public EventRepository(DataContext context, IUsersRepository userRepo)
        {
            _context = context;
            _userRepo = userRepo;
        }
        public async Task<Event> Add(EventToAddDTO eventToAdd)
        {
            var user = await _context.Users.Include(x => x.UserEvents).FirstOrDefaultAsync(x => x.Id == eventToAdd.UserId);
            if (user == null) return null;

            var addressDB = new Address()
            {
                MailingAddress = eventToAdd.MailingAddress,
                ZipCode = eventToAdd.ZipCode,
                State = eventToAdd.State,
                City = eventToAdd.City
            };

            var eventDB = new Event()
            {
                EventName = eventToAdd.EventName,
                EventPlace = eventToAdd.EventPlace,
                EventType = _context.EventTypes.FirstOrDefault(x => x.EventTypeName == eventToAdd.EventType),
                Address = addressDB,
                IsActive = true,
                CreatedOn = DateTime.Now,
                CreatedBy = eventToAdd.UserId,
                RSVP = eventToAdd.RSVP,
                GiftsAddBy = eventToAdd.GiftsAddBy,
                DateTimeOfEvent = eventToAdd.DateTimeOfEvent,
                MinPrice = Convert.ToDouble(eventToAdd.MinPrice),
                MaxPrice = Convert.ToDouble(eventToAdd.MaxPrice),

            };

            // eventDB.EventType.EventTabs = GetEventTabs(eventDB.EventType);

            await _context.Events.AddAsync(eventDB);

            foreach (var eventOption in eventToAdd.EventOptionsIds)
            {
                var eventOptionEvent = new EventOptionEvent();

                eventOptionEvent.EventId = eventDB.Id;
                eventOptionEvent.Event = eventDB;
                eventOptionEvent.EventOptionId = eventOption;
                eventOptionEvent.EventOption = _context.EventOptions.FirstOrDefault(x => x.Id == eventOption);

                _context.EventOptionEvent.Add(eventOptionEvent);
                eventDB.EventOptionEvents.Add(eventOptionEvent);
            }






            var userEvent = new UserEvent();
            userEvent.User = user;
            userEvent.Event = eventDB;
            userEvent.RoleId = Roles.AdminRole();
            userEvent.Participats = eventToAdd.AdminParticipates;

            user.UserEvents.Add(userEvent);
            eventDB.UserEvents.Add(userEvent);

            await _context.SaveChangesAsync();


            return eventDB;

        }



        public async Task<Event> Delete(int id)
        {
            var eventDB = await _context.Events.Include(x => x.UserEvents).FirstOrDefaultAsync(x => x.Id == id);
            if (eventDB == null) return null;

            foreach (var userEvent in eventDB.UserEvents)
            {
                userEvent.IsActive = false;
            }

            eventDB.IsActive = false;
            await _context.SaveChangesAsync();

            return eventDB;

        }

        public async Task<ICollection<Event>> GetAll(int userId)
        {
            var allEventsDB = await _context.Events.
                                Include(x => x.Address).
                                Include(x => x.EventType).
                                Where(x => x.CreatedBy == userId && x.IsActive == true).
                                ToListAsync();

            if (allEventsDB == null) return null;

            foreach (var eventt in allEventsDB)
            {
                eventt.UserEvents = await _context.UserEvent.
                                    Where(x => x.EventId == eventt.Id && x.IsActive == true && x.Participats == true).
                                    ToListAsync();
            }

            return allEventsDB;
        }

        public async Task<ICollection<UserEvent>> GetAllUserEvent(int userId)
        {
            /*  var allUserEvents = await _context.UserEvent.Include(x=>x.Event).
             Where(x=>x.UserId == userId && (x.Role.Id == Roles.UserRole() || x.Role.Id == Roles.SemiAdminRole())).
             ToListAsync();  */

            var userEventList = new List<UserEvent>();

            var userDB = await _context.Users.
                            Include(x => x.UserEvents).
                                ThenInclude(x => x.Event).
                                    ThenInclude(x => x.EventType).
                            Where(x => x.Id == userId && x.IsActive == true).
                            FirstOrDefaultAsync();

            foreach (var userEvent in userDB.UserEvents)
            {
                if (userEvent.Participats == true && userEvent.IsActive == true)
                {
                    userEventList.Add(userEvent);
                }
            }

            if (userDB == null) return null;

            userDB.UserEvents = userEventList;

            var allUserEvent = userDB.UserEvents;

            if (allUserEvent == null) return null;


            return allUserEvent;
        }

        public async Task<UserEvent> ConfirmUserEvent(ConfirmUserEventDTO confirmUserEventDTO)
        {
            var userEventDB = await _context.UserEvent.
                                Include(x => x.Event).
                                Where(x => x.EventId == confirmUserEventDTO.EventId && x.UserId == confirmUserEventDTO.UserId).
                                FirstOrDefaultAsync();

            if (userEventDB == null) return null;

            userEventDB.IsConfirmed = !userEventDB.IsConfirmed;

            await _context.SaveChangesAsync();

            return userEventDB;
        }

        public async Task<Event> GetById(int eventId)
        {
            var eventDB = await _context.Events
                .Include(x => x.Address)
                .Include(x => x.EventType)
                .Include(x => x.EventOptionEvents)
                .FirstOrDefaultAsync(x => x.Id == eventId);
            if (eventDB == null) return null;

            return eventDB;
        }


        public async Task<Event> Edit(EventToEditDTO eventToEdit)
        {
            var eventDB = await _context.Events
                .Include(x => x.Address)
                .Include(x => x.EventOptionEvents)
                .FirstOrDefaultAsync(x => x.Id == eventToEdit.EventId && x.IsActive == true);

            if (eventDB == null) return null;

            EventEdit(ref eventDB, eventToEdit);
            await _context.SaveChangesAsync();

            return eventDB;
        }

        public async Task<Role> CheckUserEventRole(int eventId, int userId)
        {
            var userEventDB = await _context.UserEvent.
                                    Include(x => x.Role).
                                    FirstOrDefaultAsync(x => x.EventId == eventId && x.UserId == userId);

            return userEventDB.Role;
        }


        private void EventEdit(ref Event eventDb, EventToEditDTO eventEdits)
        {

            eventDb.Address.City = eventEdits.City;
            eventDb.Address.MailingAddress = eventEdits.MailingAddress;
            eventDb.Address.State = eventEdits.State;
            eventDb.Address.ZipCode = eventEdits.ZipCode;

            eventDb.EventName = eventEdits.EventName;
            eventDb.EventPlace = eventEdits.EventPlace;
            eventDb.DateTimeOfEvent = eventEdits.DateTimeOfEvent;
            eventDb.GiftsAddBy = eventEdits.GiftsAddBy;
            eventDb.RSVP = eventEdits.RSVP;
            eventDb.MinPrice = Convert.ToDouble(eventEdits.MinPrice);
            eventDb.MaxPrice = Convert.ToDouble(eventEdits.MaxPrice);

            if (eventEdits.EventOptions != null && eventEdits.EventOptions.GetEnumerator().MoveNext())
            {
                eventDb.EventOptionEvents.Clear();
                foreach (var eventOption in eventEdits.EventOptions)
                {

                }
            }

        }




    }
}
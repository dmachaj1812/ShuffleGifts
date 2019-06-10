using System.Collections.Generic;
using AutoMapper;
using GiftApp.API.Data;
using GiftApp.API.DTOs;
using GiftApp.API.Models;

namespace GiftApp.API.AutoMapper
{
    public class MappingProfile:Profile
    {
       
        public MappingProfile()
        {
            CreateMap<User,UsersToReturnDTO>();
            CreateMap<Gift,GiftToRetrunDTO>();
            CreateMap<Event,EventToReturnDTO>()
                .ForMember(dest => dest.EventId, opt => opt.MapFrom(x=>x.Id))
                .ForMember(dest => dest.EventType, opt => opt.MapFrom(x=>x.EventType.EventTypeName))
                .ForMember(dest => dest.MailingAddress, opt => opt.MapFrom(x=>x.Address.MailingAddress))
                .ForMember(dest => dest.City, opt => opt.MapFrom(x=>x.Address.City))
                .ForMember(dest => dest.ZipCode, opt => opt.MapFrom(x=>x.Address.ZipCode))
                .ForMember(dest => dest.State, opt => opt.MapFrom(x=>x.Address.State))
                .ForMember(dest => dest.EventOptions, opt => opt.MapFrom(x => CreateEventOptionsIds(x.EventOptionEvents)));
            CreateMap<UserEvent, ParticipantsToReturnDTO>()
                .ForMember(dest => dest.GiftNumber, opt => opt.MapFrom(x=>x.Gift.Count));
            CreateMap<UserEvent, EventForUserDTO>().
                ForMember(dest => dest.EventId, opt => opt.MapFrom(x => x.Event.Id)).
                ForMember(dest => dest.EventName, opt => opt.MapFrom(x => x.Event.EventName)).
                ForMember(dest => dest.EventType, opt => opt.MapFrom(x => x.Event.EventType.EventTypeName)).
                ForMember(dest => dest.RSVP, opt => opt.MapFrom(x => x.Event.RSVP)).
                ForMember(dest => dest.IsConfirmed, opt => opt.MapFrom(x => x.IsConfirmed));
            CreateMap<Comment,CommentToReturnDTO>().
                ForMember(dest => dest.UserName, opt => opt.MapFrom(x => x.User.UserName));
            CreateMap<Event, HostingEventToReturnDTO>().
                ForMember(dest => dest.EventId, opt => opt.MapFrom(x=>x.Id)).
                ForMember(dest => dest.EventType, opt => opt.MapFrom(x=>x.EventType.EventTypeName)).
                ForMember(dest => dest.NumberOfParticipants, opt => opt.MapFrom(x=> x.UserEvents.Count)).
                ForMember(dest => dest.NumberOfConfirmed, opt => opt.MapFrom(x=> NumberOfConfirmed(x.UserEvents)));
            CreateMap<Shuffle, ShuffleGiftDataToReturnDTO>().
                ForMember(dest => dest.GiftForName, opt => opt.MapFrom(x => x.UserGiftFor.UserName)).
                ForMember(dest => dest.ListOfGiftsToBuy, opt => opt.MapFrom(x => x.Gifts));
        }
        

        private static List<string> CreateEventOptionsIds(IList<EventOptionEvent> EventOptionsEvents){

            var eventOptIds = new List<string>();
            foreach(var eventOpt in EventOptionsEvents){
                eventOptIds.Add(eventOpt.EventOptionId.ToString());
            }
            return eventOptIds;
        }

        private static int NumberOfConfirmed(ICollection<UserEvent> userEvents){
            var numOfConfirmed = 0;
            foreach(var userEvent in userEvents){
                if(userEvent.IsConfirmed == true){
                    numOfConfirmed++;
                }
            }
            return numOfConfirmed;
        }

        

       
        
    }
}
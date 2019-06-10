using System.Threading.Tasks;
using GiftApp.API.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using GiftApp.API.Models;
using GiftApp.API.Helpers;

namespace GiftApp.API.Repository
{
    public class ShuffleRepository : IShuffleRepository
    {
        private readonly DataContext _context;
        private readonly Random _rand;

        public ShuffleRepository(DataContext context)
        {
            _context = context;
            _rand = new Random(Guid.NewGuid().GetHashCode());
        }
        public bool ShuffleUsers()
        {

            var allEvents = _context.Events.
                                Include(x => x.UserEvents).
                                    ThenInclude(x => x.User).
                                // Where(x => x.RSVP.Date == DateTime.Today).
                                ToList();

            foreach (var eventt in allEvents)
            {
                var allUserEvents = eventt.UserEvents.Where(x => x.IsActive == true &&
                                                            x.IsConfirmed == true &&
                                                            x.Participats == true).
                                                            ToList();

                if (allUserEvents.Count <= 1)
                {
                    continue;
                }

                var users = allUserEvents.Select(x => x.User).ToList();

                foreach (var userEvent in allUserEvents)
                {
                Begin:
                    var randNumber = _rand.Next(0, users.Count);
                    if (users.ElementAt(randNumber).Id == userEvent.UserId)
                    {
                        goto Begin;
                    }
                    else
                    {
                        userEvent.Shuffle = new Shuffle();
                        userEvent.Shuffle.UserGiftFor = users.ElementAt(randNumber);
                        users.RemoveAt(randNumber);
                    }
                }

                eventt.ParticipantsShuffled = true;
            }
            _context.SaveChanges();

            return true;
        }

        public bool ShuffleGifts()
        {


            bool algorithmChooses = false;


            var allEvents = _context.Events.
                               Include(x => x.EventOptionEvents).
                                  ThenInclude(x => x.EventOption).
                               Include(x => x.UserEvents).
                                   ThenInclude(x => x.User).
                                Include(x => x.UserEvents).
                                   ThenInclude(x => x.Shuffle).
                               //Where(x => x.GiftsAddBy.Date == DateTime.Today).
                               ToList();

            foreach (var eventt in allEvents)
            {
                foreach (var eventOptionEvent in eventt.EventOptionEvents)
                {
                    if (eventOptionEvent.EventOption.Name == EventOptions.AlgorithmChooses().Name)
                    {
                        algorithmChooses = true;
                    };
                }

                var allUserEvents = eventt.UserEvents.Where(x => x.IsActive == true &&
                                                            x.IsConfirmed == true &&
                                                            x.Participats == true).
                                                            ToList();


                if (algorithmChooses)
                {
                    foreach (var userEvent in allUserEvents)
                    {
                        var userEventGiftFor = _context.UserEvent.Include(x => x.Gift).FirstOrDefault(x => x.UserId == userEvent.Shuffle.UserGiftFor.Id &&
                                                                           x.EventId == eventt.Id);

                        var allGifts = userEventGiftFor.Gift.Where(x => x.IsActive == true).ToList();

                        if (algorithmChooses)
                        {
                            var shuffledGifts = ShuffleGiftsHelper.ShuffleGiftsAlgorithm(allGifts, eventt.MaxPrice);
                            userEvent.Shuffle.Gifts = shuffledGifts.Gifts;
                        }
                        else
                        {
                            userEvent.Shuffle.Gifts = allGifts;
                        }


                    }
                }

                eventt.GiftsShuffled = true;
                _context.SaveChanges();
            }

            return true;
        }
    }
}
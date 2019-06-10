using GiftApp.API.Data;
using GiftApp.API.Helpers;
using GiftApp.API.Models;
using GiftApp.API.Repository;
using System.Collections.Generic;
using System.Linq;

namespace GiftApp.API.SeedData
{
    public class SeedData
    {
        private readonly DataContext _context;
        public SeedData(DataContext context)
        {
            _context = context;
        }

        public void SeedRoles()
        {

            if (!_context.Roles.Any())
            {
                var roles = new List<Role>();

                var adminRole = new Role()
                {
                    Name = "Admin"
                };

                var userRole = new Role()
                {
                    Name = "User"
                };

                //Allows participant of an event to invate other people.
                var semiAdminRole = new Role()
                {
                    Name = "SemiAdmin"
                };

                roles.Add(adminRole);
                roles.Add(userRole);
                roles.Add(semiAdminRole);


                _context.AddRange(roles);
                _context.SaveChanges();
            }
        }

        public void SeedGiftStatuses()
        {
            if (!_context.GiftStatuses.Any())
            {
                var status1 = new GiftStatus()
                {
                    StatusName = "Waiting"
                };
                var status2 = new GiftStatus()
                {
                    StatusName = "Bought"
                };

                _context.GiftStatuses.Add(status1);

                _context.GiftStatuses.Add(status2);

                _context.SaveChanges();

            };
        }

        public void SeedEventOptions()
        {

            if (!_context.EventOptions.Any())
            {
                _context.EventOptions.Add(EventOptions.UnkonwGiftGiver());
                _context.EventOptions.Add(EventOptions.KnownGiftGiver());
                _context.EventOptions.Add(EventOptions.OneOfManyGifts());
                _context.EventOptions.Add(EventOptions.OneGift());
                _context.EventOptions.Add(EventOptions.AlgorithmChooses());
                _context.EventOptions.Add(EventOptions.ParticipantChooses());

                _context.SaveChanges();
            }
        }

        public void SeedEventTypes(){
            if(!_context.EventTypes.Any()){
                var christmasEvent = new EventType(){
                    EventTypeName = "Christmas"
                };
                _context.EventTypes.Add(christmasEvent);
                _context.SaveChanges();
            }

           
        }

    
        private void CreateHashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


    }
}
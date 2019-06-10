using GiftApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GiftApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Gift> Gifts { get; set; }
        public DbSet<Event> Events { get; set; }
      
        public DbSet<Address> Addresses { get; set; }
        public DbSet<UserEvent> UserEvent { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<GiftStatus> GiftStatuses {get;set;}
        public DbSet<EventOption> EventOptions { get; set; }
        public DbSet<EventType> EventTypes {get;set;}
        public DbSet<EventOptionEvent> EventOptionEvent {get;set;}
        public DbSet<Shuffle> Shuffles { get; set; }
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEvent>()
                .HasKey(bc => new { bc.UserId, bc.EventId });
            modelBuilder.Entity<UserEvent>()
                .HasOne(bc => bc.Event)
                .WithMany(bc => bc.UserEvents)
                .HasForeignKey(bc => bc.EventId);
            modelBuilder.Entity<UserEvent>()
                .HasOne(bc => bc.User)
                .WithMany(bc => bc.UserEvents)
                .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<EventOptionEvent>()
                .HasKey(bc=> new{bc.EventOptionId, bc.EventId});

            modelBuilder.Entity<EventOptionEvent>()
                .HasOne(bc => bc.Event)
                .WithMany(bc => bc.EventOptionEvents)
                .HasForeignKey(bc => bc.EventId);

            modelBuilder.Entity<EventOptionEvent>()
                .HasOne(bc => bc.EventOption)
                .WithMany(bc => bc.EventOptionEvents)
                .HasForeignKey(bc => bc.EventOptionId);

        



        }
    }

}
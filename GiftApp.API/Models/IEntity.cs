using System;

namespace GiftApp.API.Models
{
    public interface IEntity
    {
         int Id{get;set;}
         bool IsActive{get;set;}
         DateTime? CreatedOn{get;set;}
         DateTime? ModifiedOn{get;set;}
         int? CreatedBy{get;set;}
         int? ModifiedBy{get;set;}

    }
}
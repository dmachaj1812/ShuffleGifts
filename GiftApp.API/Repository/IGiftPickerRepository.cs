using System.Collections.Generic;
using System.Threading.Tasks;
using GiftApp.API.Models;

namespace GiftApp.API.Repository
{
    public interface IGiftPickerRepository
    {
         ICollection<User> GiftPicker();
    }
}
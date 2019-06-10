using System.Threading.Tasks;
using GiftApp.API.DTOs;

namespace GiftApp.API.Repository
{
    public interface IPasswordRepository
    {
        Task<string> GeneratePasswordResetToken(string email);
        Task<string> PasswordChange(PasswordChangeDTO passwordChangeDTO);
        
    }
}
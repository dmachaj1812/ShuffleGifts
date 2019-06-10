using System.Security.Claims;

namespace GiftApp.API.Helpers
{
    public interface IJwtToken
    {
        string GenerateJwtToken(Claim[] claimToAdd, int hoursToExpire);
    }
}
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace GiftApp.API.Helpers
{
    public class RandomKeyGenerator
    {
        public string GetUniqueKey(int size)
        {
            char[] alphabet =
                 "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            byte[] data = new byte[size];

            using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
            {
                crypto.GetBytes(data);
            }

            StringBuilder result = new StringBuilder(size);

             foreach (byte b in data)
            {
                result.Append(alphabet[b % (alphabet.Length)]);
            }

             return result.ToString();
        }

    }
}
using System;
using System.Text;

namespace GiftApp.API.Helpers
{
    public class Password
    {
         public static void CreateHashPassword(string password, out byte[] passwordSalt, out byte[] passwordHash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        public static string PasswordGenerator()
        {
            Random rnd = new Random(Guid.NewGuid().GetHashCode());
            StringBuilder passwordString = new StringBuilder();
            var caseNumber = 0;
            var alphaNumbericNumber = 0;
            for (int i = 0; i < 10; i++)
            {
                caseNumber = rnd.Next(1, 4);
                switch (caseNumber)
                {
                    //UpperCase
                    case 1:
                        {
                            alphaNumbericNumber = rnd.Next(65, 91);
                            passwordString.Append((char)alphaNumbericNumber);
                            break;
                        }
                    //LowerCase
                    case 2:
                        {
                            alphaNumbericNumber = rnd.Next(97, 122);
                            passwordString.Append((char)alphaNumbericNumber);
                            break;
                        }
                    //Number
                    case 3:
                        {
                            alphaNumbericNumber = rnd.Next(49, 58);
                            passwordString.Append((char)alphaNumbericNumber);
                            break;
                        }
                }
            }
            return passwordString.ToString();
        }

    }
}
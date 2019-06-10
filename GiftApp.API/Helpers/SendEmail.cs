using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using MimeKit;

namespace GiftApp.API.Classes
{
    public class SendEmail
    {
        private string MailFrom = "prezentowaapka@gmail.com";
        private NetworkCredential credentials;
        private SmtpClient client;
       // private string giftAppUrl = "http://shufflegifts.com";

        public SendEmail()
        {
            credentials = new NetworkCredential(MailFrom, "Clearwindow3650");

            client = new SmtpClient()
            {
                Port = 587,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                Credentials = credentials
            };
        }

        public void UserAddToEvent(string emailTo, string name)
        {
            var mail = new MailMessage()
            {
                From = new MailAddress(MailFrom),
                Subject = "You have been added to new event!",
                IsBodyHtml = true
            };
            mail.To.Add(new MailAddress(emailTo));
            mail.Body = @"<h1>You have been added to new event</h1>";
            client.Send(mail);
        }

        public void CreatingNewUser(string emailTo, string eventName, string randomToken)
        {
            StringBuilder url = new StringBuilder();
            url.Append("http://localhost:4200/PasswordChange/");
            url.Append(randomToken);



            var mail = new MailMessage()
            {
                From = new MailAddress(MailFrom),
                Subject = "You have been added to " + eventName,
                IsBodyHtml = true
            };
            mail.To.Add(new MailAddress(emailTo));
            var builder = new BodyBuilder();
            builder.HtmlBody = string.Format(@"<h1>Hi!</h1>
                                                <h3>You have been added to " + eventName + "</h3>" +
                                                "<h4>Since you do not have an account with, we have created one for you!</h4>"+
                                                "<h4>Here is a link to access your account, and create your password</h4>"+
                                                "<h4>Since you do not have an account with, we have created one for you!</h4>"+
                                                "<a href="+ url + ">Get to my account</a>"
                                                );

            mail.Body = builder.HtmlBody;                                   
            client.Send(mail);
        }

        public void ResetPasswordEmail(string email, string randomToken){   

            StringBuilder url = new StringBuilder();
            url.Append("http://localhost:4200/PasswordChange/");
            url.Append(randomToken);

            var mail = new MailMessage()
            {
                From = new MailAddress(MailFrom),
                Subject = "Password Reset Request",
                IsBodyHtml = true
            };

            mail.To.Add(new MailAddress(email));
            var builder = new BodyBuilder();
            builder.HtmlBody = string.Format(@"<h1>Please click on the link below to reset your password</h1>
                                                <h3>Remeber the token is valid only for 12 hours.<h3>
                                                <a href="+ url + "> Reset Password</a>"+"");

            mail.Body = builder.HtmlBody;                                   
            client.Send(mail);

        }

    }
}
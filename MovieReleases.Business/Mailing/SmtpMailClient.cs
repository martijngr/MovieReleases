using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Business.Mailing
{
    public class SmtpMailClient : IMailClient
    {
        public void SendMail(MailMessage mail)
        {
            var client = new SmtpClient();
            client.Send(mail);
        }
    }
}

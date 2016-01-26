using System.Net.Mail;

namespace MovieReleases.Business.Mailing
{
    public interface IMailClient
    {
        void SendMail(MailMessage mail);
    }
}

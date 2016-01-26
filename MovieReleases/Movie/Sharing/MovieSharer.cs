using MovieReleases.Business.Mailing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace MovieReleases.Movie.Sharing
{
    public interface IShareMovieEmail
    {
        IShareMovieMessage SetEmail(string email);
    }

    public interface IShareMovieMessage
    {
        IShareMovieSendMail SetMessage(string message);
    }

    public interface IShareMovieSendMail
    {
        void SendMail();
    }

    public class MovieSharer : IShareMovieEmail, IShareMovieMessage, IShareMovieSendMail
    {
        private static MovieSharer _instance;
        private MailMessage _mailMessage;
        private readonly IMailClient _mailClient;

        private MovieSharer(IMailClient mailClient)
        {
            _mailMessage = new MailMessage();
            _mailClient = mailClient;
        }

        public static IShareMovieEmail Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new MovieSharer(new SmtpMailClient());

                return _instance;
            }
        }

        public IShareMovieMessage SetEmail(string email)
        {
            _mailMessage.To.Add(email);

            return this;
        }

        public IShareMovieSendMail SetMessage(string message)
        {
            _mailMessage.Body = message;

            return this;
        }

        public void SendMail()
        {
            _mailClient.SendMail(_mailMessage);   
        }
    }
}
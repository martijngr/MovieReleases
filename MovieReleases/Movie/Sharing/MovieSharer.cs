using MovieReleases.Business.Mailing;
using MovieReleases.Business.Settings;
using MovieReleases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace MovieReleases.Movie.Sharing
{
    public class MovieSharer
    {
        private MailMessage _mailMessage;
        private readonly IMailClient _mailClient;
        private readonly ISettings _settings;

        public MovieSharer(IMailClient mailClient, ISettings settings)
        {
            _mailMessage = new MailMessage();
            _mailClient = mailClient;
            _settings = settings;
        }

        public void SendMail(ShareMovieModel sendModel)
        {
            _mailMessage.To.Add(sendModel.Email);
            _mailMessage.IsBodyHtml = true;
            _mailMessage.Body = ComposeHtmlBody(sendModel);
            _mailMessage.Subject = string.Format("Je hebt een filmtip gekregen van {0}!", sendModel.SendBy);

            SendMail();
        }

        private void SendMail()
        {
            _mailClient.SendMail(_mailMessage);   
        }

        private string ComposeHtmlBody(ShareMovieModel sendModel)
        {
            StringBuilder builder = new StringBuilder();
            builder.AppendFormat("Ha vriend(in) van {0}!", sendModel.SendBy);
            builder.AppendFormat("<br/><br/>");
            builder.AppendFormat("{0} heeft een filmtip voor je, namelijk '{1}' en heeft daarbij de volgende boodschap voor je achtergelaten:",
                sendModel.SendBy, sendModel.Movie.Title);
            builder.AppendFormat("<br/><br/>");
            builder.AppendFormat(sendModel.Message);
            builder.AppendFormat("<br/><br/>");
            builder.AppendFormat("<a href='{0}#/Movie/{1}'>Klik hier om de film te bekijken!</a>", _settings.SiteUrl, sendModel.Movie.Imdb);
            builder.AppendFormat("<br/><br/>");
            builder.AppendFormat("- Het MovieRelease Team");

            return builder.ToString();
        }
    }
}
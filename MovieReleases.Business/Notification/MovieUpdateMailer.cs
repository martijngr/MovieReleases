using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Core.Movies;
using MovieReleases.DTO;

namespace MovieReleases.Business.Notification
{
    public class MovieUpdateMailer
    {
        private SmtpClient _smtpClient;
        private MailAddress _fromAddress;
        private StringBuilder _mailBody;

        public MovieUpdateMailer()
        {
            _mailBody = new StringBuilder();
            InitializeSmtpClient();
        }

        public void CreateMail(Dictionary<MovieType, List<MovieDto>> modifiedMovies)
        {
            foreach (var item in modifiedMovies)
            {
                CreateMovieListForEmail(item.Value, item.Key.ToFriendlyString());
            }
        }

        public void SendMail()
        {
            var mail = new MailMessage();

            mail.To.Add(new MailAddress("martijngr@gmail.com"));
            mail.Subject = "Er zijn filmupdates";
            mail.From = _fromAddress;
            mail.Body = _mailBody.ToString();

            _smtpClient.Send(mail);
        }

        private void CreateMovieListForEmail(IEnumerable<MovieDto> movies, string category)
        {
            if (movies.Any())
            {
                if (movies.Count() == 1)
                {
                    _mailBody.AppendFormat("Er is een film uitgekomen in de categorie '{0}'", category);
                }
                else
                {
                    _mailBody.AppendFormat("Er zijn {0} films uitgekomen in de categorie '{1}'", movies.Count(), category);
                }
                _mailBody.AppendLine();

                foreach (var movie in movies)
                {
                    _mailBody.AppendFormat("- {0}, uitgekomen op {1}{2}", movie.Title, movie.ReleaseDate.ToShortDateString(), Environment.NewLine);
                }

                _mailBody.AppendLine();
                _mailBody.AppendLine();
                _mailBody.AppendLine();
            }
        }

        private void InitializeSmtpClient()
        {
            _fromAddress = new MailAddress("martijngr@gmail.com", "MovieReleases");

            _smtpClient = new SmtpClient();
        }
    }
}

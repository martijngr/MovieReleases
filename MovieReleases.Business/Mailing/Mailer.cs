using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business;
using MovieReleases.Business.DownloadList;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.Domain;
using MovieReleases.DTO;
using SimpleInjector;

namespace MovieReleases.Business.Mailing.MovieMailer
{
    public class MovieMailer
    {
        private Container _container;
        private SmtpClient _smtpClient;
        private MailAddress _fromAddress;
        private MovieService _movieService;
        private DownloadListService _downloadListService;
        private Dictionary<string, MovieDto[]> _moviesNowInCinema;
        private Dictionary<string, MovieDto[]> _moviesOutOnDvd;
        private MovieRepository _movieRepository;
        private StringBuilder _mailBodyBuilder;
        private Dictionary<MovieType, List<Movie>> _moviesToMail;

        public MovieMailer()
        {
            _mailBodyBuilder = new StringBuilder();
            _moviesToMail = new Dictionary<MovieType,List<Movie>>();

            InitializeSmtpClient();
        }

        private void InitializeSmtpClient()
        {
            _fromAddress = new MailAddress("martijngr@gmail.com", "MovieReleases");
            const string fromPassword = "sliedrecht85";

            _smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_fromAddress.Address, fromPassword)
            };

        }

        private void CreateMovieListForEmail(IEnumerable<MovieDto> movies, StringBuilder mailBodyBuilder, string category)
        {
            if (movies.Any())
            {
                if (movies.Count() == 1)
                {
                    mailBodyBuilder.AppendFormat("Er is een film uitgekomen in de categorie {0}", category);
                }
                else
                {
                    mailBodyBuilder.AppendFormat("Er zijn {0} films uitgekomen in de categorie {1}", movies.Count(), category);
                }
                mailBodyBuilder.AppendLine();

                foreach (var movie in movies)
                {
                    mailBodyBuilder.AppendFormat("- {0}, uitgekomen op {1}", movie.Title, movie.ReleaseDate.ToShortDateString());
                }

                mailBodyBuilder.AppendLine();
                mailBodyBuilder.AppendLine();
                mailBodyBuilder.AppendLine();
            }
        }
        
        private MailMessage CreateMail(string body)
        {
            var mail = new MailMessage();

            mail.To.Add(new MailAddress("martijngr@gmail.com"));
            mail.Subject = "Er zijn filmupdates";
            mail.From = _fromAddress;
            mail.Body = body;

            return mail;
        }

        public void SendMail(MailMessage mail)
        {
            _smtpClient.Send(mail);
        }

        public void AddMovieToMail(Movie movieFromDb, MovieType movieType)
        {
            if (_moviesToMail.ContainsKey(movieType))
            {
                _moviesToMail[movieType].Add(movieFromDb);
            }
            else
            {
                _moviesToMail.Add(movieType, new List<Movie> { movieFromDb });
            }
        }
    }
}
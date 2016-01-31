using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Core.Movies;
using MovieReleases.DTO;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business.Grabbing.GrabberDecorators
{
    public class GrabberLogDecorator : IGrabber
    {
        private Dictionary<MovieType, List<MovieDto>> _newAddedMovies;
        private Dictionary<MovieType, List<MovieDto>> _modifiedMovies;
        private Dictionary<MovieType, List<MovieDto>> _failedMovies;

        private readonly IGrabber _grabberDecorator;

        public GrabberLogDecorator(IGrabber grabberDecorator)
        {
            _grabberDecorator = grabberDecorator;
            _newAddedMovies = new Dictionary<MovieType, List<MovieDto>>();
            _modifiedMovies = new Dictionary<MovieType, List<MovieDto>>();

            _newAddedMovies.Add(MovieType.Dvd, new List<MovieDto>());
            _newAddedMovies.Add(MovieType.InCinema, new List<MovieDto>());
            _newAddedMovies.Add(MovieType.SoonInCinema, new List<MovieDto>());

            _modifiedMovies.Add(MovieType.Dvd, new List<MovieDto>());
            _modifiedMovies.Add(MovieType.InCinema, new List<MovieDto>());
            _modifiedMovies.Add(MovieType.SoonInCinema, new List<MovieDto>());

            _failedMovies = new Dictionary<MovieType, List<MovieDto>>();
            _failedMovies.Add(MovieType.Dvd, new List<MovieDto>());
            _failedMovies.Add(MovieType.InCinema, new List<MovieDto>());
            _failedMovies.Add(MovieType.SoonInCinema, new List<MovieDto>());
        }

        public Dictionary<MovieType, List<MovieDto>> NewAddedMovies 
        {
            get { return _newAddedMovies; }
        }

        public Dictionary<MovieType, List<MovieDto>> ModifiedMovies 
        {
            get { return _modifiedMovies; }
        }

        public Dictionary<MovieType, List<MovieDto>> FailedMovies 
        { 
            get { return _failedMovies; } 
        }

        public void AddNewMovie(MovieType movieType, MovieDto movie)
        {
            _newAddedMovies[movieType].Add(movie);

            if (_grabberDecorator != null)
            {
                _grabberDecorator.AddNewMovie(movieType, movie);
            }
        }

        public void UpdateMovie(MovieType movieType, MovieDto movie, Movie movieFromDb)
        {
            _modifiedMovies[movieType].Add(movie);

            if (_grabberDecorator != null)
            {
                _grabberDecorator.UpdateMovie(movieType, movie, movieFromDb);
            }
        }

        public void MovieGrabFailed(MovieType movieType, MovieDto movie, Exception ex)
        {
            _failedMovies[movieType].Add(movie);

            if (_grabberDecorator != null)
            {
                _grabberDecorator.MovieGrabFailed(movieType, movie, ex);
            }
        }

        public void GrabbingFinished()
        {
            var logfileFilename = string.Format(@"Logs\{0}.txt", DateTime.Now.ToString("dd MMM yyyy"));
            WriteLogFile(logfileFilename);

            MailLogFile(logfileFilename);

            if (_grabberDecorator != null)
            {
                _grabberDecorator.GrabbingFinished();
            }
        }

        public virtual void WriteLogFile(string file)
        {
            using (var stream = File.Create(file))
            using (var writer = new StreamWriter(stream))
            {
                WriteMovieList(_failedMovies, writer, "De volgende films zijn mislukt om binnen te halen");
                WriteMovieList(_newAddedMovies, writer, "De volgende films succesvol binnengehaald");
                WriteMovieList(_modifiedMovies, writer, "De volgende films zijn bijgewerkt");
            }
        }

        private void MailLogFile(string logfileFilename)
        {
            var from = new MailAddress("martijngr@gmail.com", "MovieReleases grabber log");
            var to = new MailAddress("martijngr@gmail.com", "martijngr@gmail.com");
            var mail = new MailMessage(from, to);
            mail.Subject = "Log movie grabber";
            mail.Body = "Zie bijlage";
            mail.Attachments.Add(new Attachment(logfileFilename));

            var client = new SmtpClient();
            client.Send(mail);
        }

        private static void WriteMovieList(Dictionary<MovieType, List<MovieDto>> list, StreamWriter writer, string headerText)
        {
            WriteLogLine(list, MovieType.SoonInCinema, writer, headerText);

            WriteLogLine(list, MovieType.InCinema, writer, headerText);

            WriteLogLine(list, MovieType.Dvd, writer, headerText);
        }

        private static void WriteLogLine(Dictionary<MovieType, List<MovieDto>> list, MovieType movieType, StreamWriter writer, string headerText)
        {
            writer.WriteLine(string.Format("{0} [{1}] ({2})", headerText, movieType.ToString(), list[movieType].Count()));
            foreach (MovieDto movie in list[movieType])
            {
                writer.WriteLine(string.Format("- {0}", movie.Title));
            }
        }
    }
}
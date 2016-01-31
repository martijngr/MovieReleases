using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business.Notification;
using MovieReleases.Core.Movies;
using MovieReleases.Domain;
using MovieReleases.DTO;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business.Grabbing.GrabberDecorators
{
    public class GrabberNotifierDecorator : IGrabber
    {
        private readonly IGrabber _grabberDecorator;
        private Dictionary<MovieType, List<MovieDto>> _newAddedMovies;
        private Dictionary<MovieType, List<MovieDto>> _modifiedMovies;
        private Dictionary<MovieType, List<MovieDto>> _failedMovies;

        public GrabberNotifierDecorator(IGrabber grabberDecorator)
        {
            _grabberDecorator = grabberDecorator;

            _newAddedMovies = new Dictionary<MovieType, List<MovieDto>>();
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

        public void AddNewMovie(MovieType newMovieType, MovieDto movie)
        {
            if (newMovieType != movie.MovieType)
            {
                _newAddedMovies[newMovieType].Add(movie);
            }

            if (_grabberDecorator != null)
            {
                _grabberDecorator.AddNewMovie(newMovieType, movie);
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
            var mailer = new MovieUpdateMailer();
            mailer.CreateMail(_modifiedMovies);
            mailer.SendMail();

            if (_grabberDecorator != null)
            {
                _grabberDecorator.GrabbingFinished();
            }
        }
    }
}

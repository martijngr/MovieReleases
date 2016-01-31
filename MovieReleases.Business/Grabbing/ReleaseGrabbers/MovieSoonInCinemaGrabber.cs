using MovieReleases.Business.Grabbing.GrabberDecorators;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.Grabber.Grabbers;
using System;

namespace MovieReleases.Business.Grabbing.ReleaseGrabbers
{
    public class MovieSoonInCinemaGrabber : MovieReleaseGrabber
    {
        private readonly IGrabMoviesSoonInCinema _movieScraper;
        private readonly IGrabber _grabberDecorator;
        private readonly IMovieRepository _movieRepository;

        public MovieSoonInCinemaGrabber(IGrabMoviesSoonInCinema movieScraper, IGrabber grabberDecorator, IMovieRepository movieRepository)
        {
            _movieScraper = movieScraper;
            _grabberDecorator = grabberDecorator;
            _movieRepository = movieRepository;
        }

        public override void GrabAndSave()
        {
            var movies = _movieScraper.GetMoviesSoonInCinema();

            foreach (var movie in movies)
            {
                try
                {
                    ValidateMovie(movie);
                    var movieFromDb = _movieRepository.GetByImdb(movie.Imdb);

                    if (movieFromDb == null)
                        _grabberDecorator.AddNewMovie(MovieType.SoonInCinema, movie);
                }
                catch (Exception ex)
                {
                    _grabberDecorator.MovieGrabFailed(MovieType.SoonInCinema, movie, ex);
                }
            }
        }
    }
}

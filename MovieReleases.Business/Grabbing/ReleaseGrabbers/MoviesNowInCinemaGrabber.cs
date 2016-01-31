using MovieReleases.Business.Grabbing.GrabberDecorators;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.Domain.Movies;
using MovieReleases.DTO;
using MovieReleases.Grabber.Grabbers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Business.Grabbing.ReleaseGrabbers
{
    public class MoviesNowInCinemaGrabber : MovieReleaseGrabber
    {
        private readonly IGrabMoviesNowInCinema _movieScraper;
        private readonly IGrabber _grabberDecorator;
        private readonly IMovieRepository _movieRepository;
        public MoviesNowInCinemaGrabber(IGrabMoviesNowInCinema movieScraper, IGrabber grabberDecorator, IMovieRepository movieRepository)
        {
            _movieScraper = movieScraper;
            _grabberDecorator = grabberDecorator;
            _movieRepository = movieRepository;
        }

        public override void GrabAndSave()
        {
            var movies = _movieScraper.GetMoviesInCinema();

            foreach (var movie in movies)
            {
                try
                {
                    ValidateMovie(movie);
                    var movieFromDb = _movieRepository.GetByImdb(movie.Imdb);

                    if (movieFromDb == null)
                        _grabberDecorator.AddNewMovie(MovieType.InCinema, movie);
                    else if (ShouldUpdateMovie(movie, movieFromDb))
                        _grabberDecorator.UpdateMovie(MovieType.InCinema, movie, movieFromDb);
                }
                catch (Exception ex)
                {
                    _grabberDecorator.MovieGrabFailed(MovieType.InCinema, movie, ex);
                }
            }
        }

        private bool ShouldUpdateMovie(MovieDto movieDto, Movie movie)
        {
            return movie != null && movieDto.MovieType != movie.MovieType;
        }
    }
}

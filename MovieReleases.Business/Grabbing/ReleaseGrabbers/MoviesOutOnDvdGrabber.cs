using MovieReleases.Business.Grabbing.GrabberDecorators;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.Domain.Movies;
using MovieReleases.DTO;
using System;

namespace MovieReleases.Business.Grabbing.ReleaseGrabbers
{
    public class MoviesOutOnDvdGrabber : MovieReleaseGrabber
    {
        private readonly IGrabMoviesOutOnDvd _movieScraper;
        private readonly IGrabber _grabberDecorator;
        private readonly IMovieRepository _movieRepository;

        public MoviesOutOnDvdGrabber(IGrabMoviesOutOnDvd movieScraper, IGrabber grabberDecorator, IMovieRepository movieRepository)
        {
            _movieScraper = movieScraper;
            _grabberDecorator = grabberDecorator;
            _movieRepository = movieRepository;
        }

        public override void GrabAndSave()
        {
            var movies = _movieScraper.GetMoviesOutOnDvd();

            foreach (var movie in movies)
            {
                try
                {
                    ValidateMovie(movie);
                    var movieFromDb = _movieRepository.GetByImdb(movie.Imdb);

                    if (movieFromDb == null)
                        _grabberDecorator.AddNewMovie(MovieType.Dvd, movie);
                    else if (ShouldUpdateMovie(movie, movieFromDb))
                        _grabberDecorator.UpdateMovie(MovieType.Dvd, movie, movieFromDb);
                }
                catch (Exception ex)
                {
                    _grabberDecorator.MovieGrabFailed(MovieType.Dvd, movie, ex);
                }
            }
        }

        private bool ShouldUpdateMovie(MovieDto movieDto, Movie movie)
        {
            return movie != null && movieDto.MovieType != movie.MovieType;
        }
    }
}
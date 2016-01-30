using System;
using System.Collections.Generic;
using MovieReleases.Business.Grabbers;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.DTO;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business.MovieScrapers
{
    public class MovieGrabber
    {
        private readonly IMovieService _movieService;
        private readonly IMovieRepository _movieRepository;
        private readonly IOutOnDvdScraper _outOnDvdScraper;
        private readonly IMovieScraper _movieScraper;
        private readonly IGrabber _grabberDecorator;

        public MovieGrabber(
            IMovieService movieService,
            IMovieRepository movieRepository,
            IMovieScraper movieScraper,
            IOutOnDvdScraper outOnDvdScraper,
            IGrabber grabberDecorator)
        {
            _movieService = movieService;
            _movieRepository = movieRepository;
            _outOnDvdScraper = outOnDvdScraper;
            _movieScraper = movieScraper;

            _grabberDecorator = grabberDecorator;
        }

        public void GrabAndSaveNewReleases()
        {
            var soonInCinama = _movieScraper.GetMoviesSoonInCinema();
            var nowInCinema = _movieScraper.GetMoviesInCinema();
            var dvds = _outOnDvdScraper.GetMoviesOutOnDvd();

            SaveMovies(soonInCinama, MovieType.SoonInCinema);
            SaveMovies(nowInCinema, MovieType.InCinema);
            SaveMovies(dvds, MovieType.Dvd);

            GrabbingFinished();
        }

        private void SaveMovies(Dictionary<DateTime, MovieDto[]> movies, MovieType newMovieType)
        {
            foreach (var key in movies.Keys)
            {
                var movieList = movies[key];

                foreach (var movie in movieList)
                {
                    try
                    {
                        var imdb = GetMovieImdb(movie);
                        var movieFromDb = _movieRepository.GetByImdb(imdb);

                        movie.Imdb = imdb;
                        if (movieFromDb == null)
                        {
                            AddNewMovie(newMovieType, movie);
                        }
                        else
                        {
                            if (movieFromDb.MovieType != newMovieType)
                            {
                                UpdateMovie(newMovieType, movie, movieFromDb);
                            }
                        }
                    }
                    catch(Exception ex)
                    {
                        MovieGrabFailed(newMovieType, movie, ex);
                    }
                }
            }
        }

        private string GetMovieImdb(MovieDto movie)
        {
            var imdb = movie.Imdb;

            if (string.IsNullOrEmpty(imdb))
            {
                var movieDetails = _movieService.GetMovieById(movie.ProviderId);
                imdb = movieDetails.Imdb;
            }

            if (!imdb.StartsWith("tt"))
            {
                imdb = string.Format("tt{0}", imdb);
            }

            return imdb;
        }

        public void AddNewMovie(MovieType newMovieType, MovieDto movie)
        {
            if (_grabberDecorator != null)
            {
                _grabberDecorator.AddNewMovie(newMovieType, movie);
            }
        }

        public void UpdateMovie(MovieType newMovieType, MovieDto movie, Movie movieFromDb)
        {
            if (_grabberDecorator != null)
            {
                _grabberDecorator.UpdateMovie(newMovieType, movie, movieFromDb);
            }
        }

        public void MovieGrabFailed(MovieType newMovieType, MovieDto movie, Exception ex)
        {
            if (_grabberDecorator != null)
            {
                _grabberDecorator.MovieGrabFailed(newMovieType, movie, ex);
            }   
        }

        public void GrabbingFinished()
        {
            if (_grabberDecorator != null)
            {
                _grabberDecorator.GrabbingFinished();
            }
        }
    }
}

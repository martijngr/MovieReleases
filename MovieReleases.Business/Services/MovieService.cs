using System.Linq;
using System.Collections.Generic;
using MovieReleases.Business.DownloadList;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.MovieScrapers.MovieMeter;
using MovieReleases.Business.MovieScrapers.RottenTomatoes;
using MovieReleases.Business.MovieScrapers.TheMovieDB;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.Domain.Uow;
using MovieReleases.DTO;
using MovieReleases.Business.Converters;
using System;
using MovieReleases.Domain;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business
{
    public class MovieService : IMovieService
    {
        private IMovieScraper _scraper;
        private IMovieDetailsScraper _detailsMovieScraper;
        private IMovieTrailerScraper _trailerScraper;
        private IPlotScraper _plotScraper;
        private IFindScraper _findScraper;
        private IOutOnDvdScraper _outOnDvdScraper;
        private MovieRepository _movieRepository;
        private MovieConverter _movieConverter;

        public MovieService(
            IPlotScraper plotScraper,
            IFindScraper findScraper,
            IMovieScraper movieScraper,
            IMovieTrailerScraper trailerScraper,
            IMovieDetailsScraper detailScraper,
            IOutOnDvdScraper outOnDvdScraper,
            MovieRepository movieRepository,
            MovieConverter movieConverter)
        {
            _scraper = movieScraper;
            _detailsMovieScraper = detailScraper;
            _trailerScraper = trailerScraper;
            _plotScraper = plotScraper;
            _findScraper = findScraper;
            _outOnDvdScraper = outOnDvdScraper;
            _movieRepository = movieRepository;
            _movieConverter = movieConverter;
        }

        public Dictionary<DateTime, MovieDto[]> GetMoviesOutOnDvd()
        {
            //var rentals = _outOnDvdScraper.GetMoviesOutOnDvd();
            var moviesFromDb = _movieRepository.GetByMovieType(MovieType.Dvd).ToList();
            var convertedMovies = _movieConverter.ConvertToMovieDto(moviesFromDb);
            var rentals = convertedMovies.GroupBy(m => m.ReleaseDate).ToDictionary(k => k.Key, e => e.ToArray());

            return rentals;
        }

        public Dictionary<DateTime, MovieDto[]> GetMoviesInCinema()
        {
            //var inCinema = _scraper.GetMoviesInCinema();
            var moviesFromDb = _movieRepository.GetByMovieType(MovieType.InCinema).ToList();
            var convertedMovies = _movieConverter.ConvertToMovieDto(moviesFromDb);
            var inCinema = convertedMovies.GroupBy(m => m.ReleaseDate).ToDictionary(k => k.Key, e => e.ToArray());

            return inCinema;
        }

        public Dictionary<DateTime, MovieDto[]> GetMoviesSoonInCinema()
        {
            //var soonInCinema = _scraper.GetMoviesSoonInCinema();
            var moviesFromDb = _movieRepository.GetByMovieType(MovieType.SoonInCinema).ToList();
            var convertedMovies = _movieConverter.ConvertToMovieDto(moviesFromDb);
            var soonInCinema = convertedMovies.GroupBy(m => m.ReleaseDate).ToDictionary(k => k.Key, e => e.ToArray());

            return soonInCinema;
        }

        public virtual MovieDto GetMovieById(int id)
        {
            var movieDb = _movieRepository.GetById(id);
            var movieDto = GetMovie(movieDb, id.ToString());

            return movieDto;
        }

        public MovieDto GetMovieByImdb(string imdb)
        {
            var movieDb = _movieRepository.GetByImdb(imdb);
            var movieDto = GetMovie(movieDb, imdb);

            return movieDto;
        }

        public IEnumerable<MovieFindDTO> SearchMovie(string name)
        {
            var movies = _findScraper.Find(name);

            return movies;
        }

        public void UpdateMovies(IEnumerable<MovieDto> movies)
        {
            foreach (var movie in movies)
            {
                var movieDb = _movieRepository.GetById(movie.Id);

                if (movieDb != null)
                {
                    movieDb.MovieType = movie.MovieType;
                }
            }

            _movieRepository.SaveChanges();
        }

        private MovieDto GetMovie(Movie movieDb, string id)
        {
            if (movieDb == null)
            {
                var movieDto = _detailsMovieScraper.GetMovieByImdb(id);
                movieDb = _movieConverter.ConvertToMovie(movieDto);
                AddAndSaveMovie(movieDb);
            }

            var movie = _movieConverter.ConvertToMovieDto(movieDb);
            movie.TrailerUrl = _trailerScraper.GetTrailerUrl(movie.Imdb, movie.Title);

            return movie;
        }

        private void AddAndSaveMovie(Movie movie)
        {
            _movieRepository.AddMovie(movie);
            _movieRepository.SaveChanges();
        }
    }
}
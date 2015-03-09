using System;
using System.Collections.Generic;
using System.Linq;
using CookComputing.XmlRpc;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.MovieScrapers.MovieMeter;
using MovieReleases.Business.MovieScrapers.RottenTomatoes;
using MovieReleases.Business.Repositories;
using MovieReleases.DTO;

namespace MovieReleases.Business
{
    public class MovieService
    {
        private MovieRepository _movieRepository;
        private MovieContainer _context;
        private IMovieScraper _scraper;
        private IMovieScraper _dutchMovieScraper;

        public MovieService()
        {
            _context = new MovieContainer();
            _movieRepository = new MovieRepository(_context);
            _scraper = new RottenTomatoesScraper();
            _dutchMovieScraper = new MovieMeterScraper();
        }

        public void AddMovieToDownloadList(MovieDto movieDto)
        {
            var movie = FromDto(movieDto);

            _movieRepository.AddMovie(movie);
            SaveChanges();
        }

        public MovieDto[] GetMoviesToDownload()
        {
            var movies = from m in _movieRepository.Movies()
                         select new MovieDto
                         {
                             Duration = m.Duration,
                             ImdbId = m.Imdb,
                             Plot = m.Plot,
                             Title = m.Title,
                             Year = m.Year,
                         };

            return movies.ToArray();
        }

        public Dictionary<string, MovieDto[]> GetMoviesOutOnDvd()
        {
            var rentals = _scraper.GetMoviesOutOnDvd();
            return rentals;
        }

        public Dictionary<string, MovieDto[]> GetMoviesInCinema()
        {
            var rentals = _scraper.GetMoviesInCinema();
            return rentals;
        }

        public Dictionary<string, MovieDto[]> GetMoviesSoonInCinema()
        {
            var rentals = _scraper.GetMoviesSoonInCinema();
            return rentals;
        }

        public MovieDto GetFilmById(string id)
        {
            var movie = _dutchMovieScraper.GetMovieById(id);

            return movie;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        private Movie FromDto(MovieDto movie)
        {
            return new Movie
            {
                Downloaded = false,
                Duration = movie.Duration,
                Imdb = movie.ImdbId,
                Plot = movie.Plot,
                PosterUrl = movie.Thumbnail,
                Title = movie.Title,
                Year = movie.Year
            };
        }

        public void DeleteMovieFromDownloadList(string imdbId)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.Imdb == imdbId);
            _context.Movies.Remove(movie);

            SaveChanges();
                 
        }
    }
}
using System.Collections.Generic;
using MovieReleases.Business.DownloadList;
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
    }
}
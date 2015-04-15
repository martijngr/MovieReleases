using System.Collections.Generic;
using MovieReleases.Business.DownloadList;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.MovieScrapers.MovieMeter;
using MovieReleases.Business.MovieScrapers.RottenTomatoes;
using MovieReleases.Business.MovieScrapers.TheMovieDB;
using MovieReleases.Business.Repositories;
using MovieReleases.DTO;

namespace MovieReleases.Business
{
    public class MovieService
    {
        private MovieRepository _movieRepository;
        private MovieContainer _context;
        private IMovieScraper _scraper;
        private IMovieScraper _detailsMovieScraper;
        private IMovieTrailerScraper _trailerScraper;
        private IPlotScraper _plotScraper;
        private IFindScraper _findScraper;

        public MovieService()
        {
            _context = new MovieContainer();
            _movieRepository = new MovieRepository(_context);
            _scraper = new RottenTomatoesScraper();
            //_scraper = new TheMovieDBScraper();
            _detailsMovieScraper = new TheMovieDBScraper();
            //_dutchMovieScraper = new MovieMeterScraper();
            _trailerScraper = new TrailerAddictTrailerScraper();
            _plotScraper = new MovieMeterPlotScraper();
            //_findScraper = new MovieMeterFindScraper();
            _findScraper = new RottenTomatiesFindScraper();
        }

        public Dictionary<string, MovieDto[]> GetMoviesOutOnDvd()
        {
            var rentals = _scraper.GetMoviesOutOnDvd();
            return rentals;
        }

        public Dictionary<string, MovieDto[]> GetMoviesInCinema()
        {
            var inCiname = _scraper.GetMoviesInCinema();
            return inCiname;
        }

        public Dictionary<string, MovieDto[]> GetMoviesSoonInCinema()
        {
            var rentals = _scraper.GetMoviesSoonInCinema();
            return rentals;
        }

        public MovieDto GetFilmById(string id)
        {
            var movie = _detailsMovieScraper.GetMovieById(id);// _dutchMovieScraper.GetMovieById(id);
            movie.TrailerUrl = _trailerScraper.GetTrailerUrl(movie.Imdb);

            return movie;
        }

        public IEnumerable<MovieFindDTO> SearchMovie(string name)
        {
            var movies = _findScraper.Find(name);

            return movies;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
using System.Collections.Generic;
using MovieReleases.Business.DownloadList;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.MovieScrapers.MovieMeter;
using MovieReleases.Business.MovieScrapers.RottenTomatoes;
using MovieReleases.Business.MovieScrapers.TheMovieDB;
using MovieReleases.Business.Repositories;
using MovieReleases.Domain.Uow;
using MovieReleases.DTO;

namespace MovieReleases.Business
{
    public class MovieService
    {
        private MovieRepository _movieRepository;
        private IMovieScraper _scraper;
        private IMovieScraper _detailsMovieScraper;
        private IMovieTrailerScraper _trailerScraper;
        private IPlotScraper _plotScraper;
        private IFindScraper _findScraper;

        public MovieService(MovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
            _scraper = new RottenTomatoesScraper();
            _detailsMovieScraper = new TheMovieDBScraper();
            _trailerScraper = new TrailerAddictTrailerScraper();
            _plotScraper = new MovieMeterPlotScraper();
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
    }
}
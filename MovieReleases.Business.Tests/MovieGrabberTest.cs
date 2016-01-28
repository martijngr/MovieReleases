using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MovieReleases.Business.Converters;
using MovieReleases.Business.Grabbers;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.Repositories;
using MovieReleases.Domain;
using MovieReleases.Domain.Uow;
using MovieReleases.DTO;
using NSubstitute;
using MovieReleases.Core.Movies;

namespace MovieReleases.Business.Tests
{
    [TestClass]
    public class MovieGrabberTest
    {
        [TestMethod]
        public void Should_Modify_Movie_When_Exists_In_Persistance_Store()
        {
            // Given
            var unitOfWork = Substitute.For<IUnitOfWork>();
            var movieService = Substitute.For<IMovieService>();
            var movieRepository = Substitute.For<IMovieRepository>();
            var movieScraper = Substitute.For<IMovieScraper>();
            var outOnDvd = Substitute.For<IOutOnDvdScraper>();

            movieService.GetMovieById(Arg.Any<int>()).Returns(new MovieDto { ReleaseDate = new DateTime(2015, 5, 15) });
            movieRepository.GetByImdb("tt112233").Returns(new Movie { MovieType = Core.Movies.MovieType.InCinema, Title="Updated", ReleaseDate = DateTime.Now });
            movieScraper.GetMoviesSoonInCinema().Returns(CreateMoviesSoonInCinema());
            movieScraper.GetMoviesInCinema().Returns(CreateEmptyMovieList());
            outOnDvd.GetMoviesOutOnDvd().Returns(CreateEmptyMovieList());

            var saver = new GrabberSaveDecorator(unitOfWork, movieService, new MovieConverter(), movieRepository, null);
            var logger = new GrabberLogDecorator(saver);
            var notifier = new GrabberNotifierDecorator(logger);

            var grabber = new MovieGrabber(
                movieService,
                movieRepository,
                movieScraper, 
                outOnDvd,
                notifier);

            // WHEN
            grabber.GrabAndSaveNewReleases();

            // THEN
            Assert.AreEqual(1, logger.ModifiedMovies[Core.Movies.MovieType.SoonInCinema].Count);
            Assert.AreEqual(MovieType.SoonInCinema, logger.ModifiedMovies[Core.Movies.MovieType.SoonInCinema].First().MovieType);
            Assert.AreEqual("01-01-1985", logger.ModifiedMovies[Core.Movies.MovieType.SoonInCinema].First().ReleaseDate);
        }

        private Dictionary<DateTime, MovieDto[]> CreateMoviesSoonInCinema()
        {
            var date = new DateTime(2016, 1, 1);
            var movies = new Dictionary<DateTime, MovieDto[]>();

            movies.Add(date, new MovieDto[] 
            { 
                new MovieDto { Imdb = "tt112233", ReleaseDate = new DateTime(1985, 1, 1), MovieType = MovieType.SoonInCinema } 
            });

            return movies;
        }

        private Dictionary<DateTime, MovieDto[]> CreateEmptyMovieList()
        {
            var movies = new Dictionary<DateTime, MovieDto[]>();

            return movies;
        }
    }
}

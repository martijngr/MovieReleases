using Microsoft.VisualStudio.TestTools.UnitTesting;
using MovieReleases.Business.Converters;
using MovieReleases.Business.Grabbing.GrabberDecorators;
using MovieReleases.Business.Grabbing.ReleaseGrabbers;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.Domain.Movies;
using MovieReleases.Domain.Uow;
using MovieReleases.DTO;
using MovieReleases.Grabber.Grabbers;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;

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
            var movieScraper = Substitute.For<IGrabMoviesSoonInCinema>();
            var outOnDvd = Substitute.For<IGrabMoviesOutOnDvd>();
            
            movieService.GetMovieById(Arg.Any<int>()).Returns(new MovieDto { ReleaseDate = new DateTime(2015, 5, 15) });
            movieRepository.GetByImdb("tt112233").Returns(new Movie { MovieType = Core.Movies.MovieType.InCinema, Title = "Updated", ReleaseDate = DateTime.Now });
            movieScraper.GetMoviesSoonInCinema().Returns(CreateMoviesSoonInCinema());

            var saver = new GrabberSaveDecorator(unitOfWork, movieService, new MovieConverter(), movieRepository, null);
            var logger = new GrabberLogDecorator(saver);
            var notifier = new GrabberNotifierDecorator(logger);
            var nowInCinemaGrabber = new MoviesOutOnDvdGrabber(outOnDvd, saver, movieRepository);
            var grabber = new MovieGrabber(
                movieService,
                movieRepository,
                outOnDvd,
                notifier);

            grabber.AddReleaseGrabber(nowInCinemaGrabber);

            // WHEN
            grabber.GrabAndSaveNewReleases();

            // THEN
            Assert.AreEqual(1, logger.ModifiedMovies[Core.Movies.MovieType.SoonInCinema].Count);
            Assert.AreEqual(MovieType.SoonInCinema, logger.ModifiedMovies[Core.Movies.MovieType.SoonInCinema].First().MovieType);
            Assert.AreEqual("01-01-1985", logger.ModifiedMovies[Core.Movies.MovieType.SoonInCinema].First().ReleaseDate);
        }

        private IEnumerable<MovieDto> CreateMoviesSoonInCinema()
        {
            var movies = new List<MovieDto>();

            movies.Add(new MovieDto
            {
                Imdb = "tt112233",
                ReleaseDate = new DateTime(1985, 1, 1),
                MovieType = MovieType.SoonInCinema
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

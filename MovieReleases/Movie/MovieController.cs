using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using MovieReleases.Business;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.DTO;
using MovieReleases.Movie.Sharing;

namespace MovieReleases.Movie
{
    [RoutePrefix("api/Movie")]
    public class MovieController : ApiController
    {
        private MovieService _movieService;

        public MovieController(MovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet]
        public MovieDto GetByImdb(string imdb)
        {
            // More on exception handling: http://www.asp.net/web-api/overview/error-handling/exception-handling
            try
            {
                var movie = _movieService.GetMovieByImdb(imdb);
                return movie;
            }
            catch (MovieNotFoundException ex)
            {
                var resp = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.NotFound)
                {
                    Content = new System.Net.Http.StringContent(ex.Message),
                    ReasonPhrase = "Film niet gevonden"
                };

                throw new HttpResponseException(resp);
            }
        }

        [HttpGet]
        [Route("Search/{movieName?}")]
        public IEnumerable<MovieFindDTO> Search(string movieName)
        {
            var movies = _movieService.SearchMovie(movieName);
            return movies;
        }

        [HttpGet]
        [Route("GetById/{imdb}")]
        public MovieDto GetById(int id)
        {
            var movie = _movieService.GetMovieById(id);

            return movie;
        }

        [HttpGet]
        [Route("Trailer/{imdb?}")]
        public void Trailer(string imdb)
        {
            var scraper = new YoutubeTrailerScraper();
            var res = scraper.GetTrailerUrl("", imdb);
        }

        [HttpPost]
        public void ShareMovieWithFriend(ShareMovieModel model)
        {
            MovieSharer.Instance.SetEmail(model.Email)
                                .SetMessage(model.Message)
                                .SendMail();
        }
    }
}

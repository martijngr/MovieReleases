using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MovieReleases.Business;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.DTO;

namespace MovieReleases.Controllers
{
    [RoutePrefix("api/Movie")]
    public class MovieController : ApiController
    {
        private MovieService _movieService;

        public MovieController(MovieService movieService)
        {
            _movieService = movieService;
        }

        public MovieDto Get(string movieMeterId)
        {
            // More on exception handling: http://www.asp.net/web-api/overview/error-handling/exception-handling
            try
            {
                var movie = _movieService.GetMovieById(movieMeterId);
                return movie;
            }
            catch (MovieNotFoundException ex)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(ex.Message),
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
        public MovieDto GetById(string id)
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
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MovieReleases.Business;
using MovieReleases.DTO;

namespace MovieReleases.Controllers
{
    [RoutePrefix("api/Movie")]
    public class MovieController : ApiController
    {
        private MovieService _movieService;

        public MovieController()
        {
            _movieService = new MovieService();
        }

        public MovieDto Get(string movieMeterId)
        {
            var movie = _movieService.GetFilmById(movieMeterId);

            return movie;
        }

        [HttpGet]
        //[Route("search{movieName}")]
        public IEnumerable<MovieFindDTO> Search(string movieName)
        {
            var movies = _movieService.SearchMovie(movieName);
            return movies;
        }
    }
}

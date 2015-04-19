using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using MovieReleases.Business;
using MovieReleases.DTO;

namespace MovieReleases.Controllers
{
    public class CinemaController : ApiController
    {
        private MovieService _movieService;

        public CinemaController(MovieService movieService)
        {
            _movieService = movieService;
        }

        public Dictionary<string, MovieDto[]> Get()
        {
            var movies = _movieService.GetMoviesInCinema();
            return movies;
        }
    }
}

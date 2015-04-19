using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using MovieReleases.Business;
using MovieReleases.DTO;
using MovieReleases.Hubs;

namespace MovieReleases.Controllers
{
    public class SoonInCinemaController : ApiController
    {
        private MovieService _movieService;

        public SoonInCinemaController(MovieService movieService)
        {
            _movieService = movieService;
        }

        public Dictionary<string, MovieDto[]> Get()
        {
            var movies = _movieService.GetMoviesSoonInCinema();

            return movies;
        }
    }
}
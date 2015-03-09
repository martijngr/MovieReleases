﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using MovieReleases.Business;
using MovieReleases.DTO;

namespace MovieReleases.Controllers
{
    public class RentController : ApiController
    {
        private MovieService _movieService;

        public RentController()
        {
            _movieService = new MovieService();
        }

        public Dictionary<string, MovieDto[]> Get()
        {
            var videos = _movieService.GetMoviesOutOnDvd();
            return videos;
        }
    }
}

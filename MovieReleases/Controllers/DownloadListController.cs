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
    public class DownloadListController : ApiController
    {
        private MovieService _movieService;

        public DownloadListController()
        {
            _movieService = new MovieService();
        }

        public void Post(MovieDto movie)
        {
            _movieService.AddMovieToDownloadList(movie);
        }

        public MovieDto[] Get()
        {
            var movies = _movieService.GetMoviesToDownload();
            return movies;
        }

        public HttpResponseMessage Delete(string imdbId)
        {
            _movieService.DeleteMovieFromDownloadList(imdbId);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}

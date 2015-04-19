using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using MovieReleases.Business;
using MovieReleases.Business.DownloadList;
using MovieReleases.DTO;

namespace MovieReleases.Controllers
{
    [EnableCors(origins: "http://localhost", headers: "*", methods: "*")]
    public class DownloadListController : ApiController
    {
        private DownloadListService _downloadListService;

        public DownloadListController(DownloadListService downloadListService)
        {
            _downloadListService = downloadListService;
        }

        public void Post(MovieDto movie)
        {
            _downloadListService.AddMovieToDownloadList(movie);
        }

        public MovieDto[] Get()
        {
            var movies = _downloadListService.GetMoviesToDownload();
            return movies;
        }

        public HttpResponseMessage Delete(string id)
        {
            _downloadListService.DeleteMovieFromDownloadList(id);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}

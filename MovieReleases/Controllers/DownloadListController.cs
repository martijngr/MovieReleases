﻿using System;
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
    [RoutePrefix("api/DownloadList")]
    [EnableCors(origins: "http://localhost", headers: "*", methods: "*")]
    public class DownloadListController : ApiController
    {
        private DownloadListService _downloadListService;

        public DownloadListController(DownloadListService downloadListService)
        {
            _downloadListService = downloadListService;
        }

        public WatchListItemDTO Post(MovieDto movie)
        {
            var watchlistItem = _downloadListService.AddMovieToDownloadList(movie);

            return watchlistItem;
        }

        [HttpPost]
        [Route("MarkMovieAsWatched/{id}")]
        public void MarkMovieAsWatched(int id)
        {
 
        }

        public void Put(WatchListItemDTO watchlistItem)
        {
            _downloadListService.Update(watchlistItem);
        }

        public IEnumerable<WatchListItemDTO> Get()
        {
            var watchlistItems = _downloadListService.GetMoviesInWatchlist();
            return watchlistItems;
        }

        public HttpResponseMessage Delete(int id)
        {
            _downloadListService.DeleteMovieFromDownloadList(id);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}

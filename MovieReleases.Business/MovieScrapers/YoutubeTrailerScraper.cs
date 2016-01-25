using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;

namespace MovieReleases.Business.MovieScrapers
{
    public class YoutubeTrailerScraper : IMovieTrailerScraper
    {
        private const string _apikey = "AIzaSyBxKczzeRnzukFo4y-eXSxaSGCO1aTDcew";

        public string GetTrailerUrl(string imdb, string movieName)
        {
            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = _apikey,
                ApplicationName = "MovieReleases",
            });

            var search = youtubeService.Search.List("snippet");

            search.Q = movieName + " official trailer";
            search.Type = "video";

            var result = search.Execute();
            var url = string.Format("http://www.youtube.com/embed/{0}?autoplay=0&fs=1", result.Items.First().Id.VideoId);

            foreach (var searchResult in result.Items)
            {
                var x = searchResult;
            }

            return url;
        }
    }
}

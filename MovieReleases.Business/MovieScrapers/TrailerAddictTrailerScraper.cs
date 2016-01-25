using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers
{
    // http://www.traileraddict.com/trailerapi
    public class TrailerAddictTrailerScraper : IMovieTrailerScraper
    {
        public string GetTrailerUrl(string imdb, string movieName)
        {
            imdb = this.StripTTOfImdb(imdb);
            string url = string.Format("http://api.traileraddict.com/?imdb={0}", imdb);

            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url).Trim();

                if (!string.IsNullOrEmpty(jsonString))
                {
                    var regex = new Regex("src=\"(.*?)\"");

                    if (regex.IsMatch(jsonString))
                    {
                        var trailerUrl = regex.Match(jsonString).Groups[1].Value;

                        return trailerUrl;
                    }
                }
                
                return string.Empty;
            }
        }

        private string StripTTOfImdb(string imdb)
        {
            if (imdb.ToLower().StartsWith("tt"))
            {
                return imdb.Substring(2);
            }

            return imdb;
        }
    }
}

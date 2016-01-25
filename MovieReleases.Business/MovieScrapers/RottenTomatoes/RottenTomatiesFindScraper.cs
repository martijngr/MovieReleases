using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MovieReleases.DTO;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers.RottenTomatoes
{
    public class RottenTomatiesFindScraper : IFindScraper
    {
        private string _apikey = "dr2w352c8agvake5x24cu4e7";
        
        public IEnumerable<DTO.MovieFindDTO> Find(string movieName)
        {
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey={0}&q={1}&page_limit=50", _apikey, movieName);
            using (var client = new WebClient())
            {
                try
                {
                    var movies = new List<MovieFindDTO>();
                    var jsonString = client.DownloadString(url).Trim();
                    var moviesJson = JObject.Parse(jsonString);
                    var jarray = (JArray)moviesJson["movies"];

                    foreach (var movieJson in jarray)
                    {
                        var movie = new MovieFindDTO
                        {
                            ProviderId = movieJson.GetValue<string>("id"),
                            Imdb = string.Format("tt{0}", movieJson.GetValue<string>("alternate_ids", "imdb")),
                            Title = movieJson.GetValue<string>("title"),
                            Year = movieJson.GetValue<string>("year"),
                        };

                        movies.Add(movie);
                    }

                    return movies;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }
    }
}

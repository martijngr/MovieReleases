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
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey={0}&q={1}&page_limit=1", _apikey, movieName);
            using (var client = new WebClient())
            {
                try
                {
                    var movies = new List<MovieFindDTO>();
                    var jsonString = client.DownloadString(url).Trim();
                    var moviesJson = JObject.Parse(jsonString);
                    var jarray = (JArray)moviesJson["movies"];
                    var regEx = new Regex(@"(\d*).json");

                    foreach (var movieJson in jarray)
                    {
                        var id = regEx.Match(movieJson.GetValue<string>("links", "self")).Groups[1].Value;
                        var movie = new MovieFindDTO
                        {
                            Id = id,
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

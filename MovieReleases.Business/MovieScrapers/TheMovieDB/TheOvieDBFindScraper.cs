using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.DTO;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers.TheMovieDB
{
    public class TheOvieDBFindScraper : IFindScraper
    {
        private string _apikey = "980071c1008d3dd64ab4a0893fe5a727";

        public IEnumerable<DTO.MovieFindDTO> Find(string movieName)
        {
            var url = string.Format("http://api.themoviedb.org/3/search/movie?query={0}&api_key={1}", movieName, _apikey);
            using (var client = new WebClient())
            {
                try
                {
                    var movies = new List<MovieFindDTO>();
                    var jsonString = client.DownloadString(url).Trim();
                    var moviesJson = JObject.Parse(jsonString);
                    var jarray = (JArray)moviesJson["results"];

                    foreach (var movieJson in jarray)
                    {
                        var movie = new MovieFindDTO
                        {
                            Id = movieJson.GetValue<string>("id"),
                            Title = movieJson.GetValue<string>("title"),
                            Year = movieJson.GetValue<string>("release_date"),
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

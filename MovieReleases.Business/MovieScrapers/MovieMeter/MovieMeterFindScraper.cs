using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.DTO;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers.MovieMeter
{
    public class MovieMeterFindScraper : IFindScraper
    {
        private string _apikey = "85u0w0rdhnwxfvdyvw24657axpbmcfxa";


        public IEnumerable<MovieFindDTO> Find(string movieName)
        {
            var url = string.Format("http://www.moviemeter.nl/api/film/?q={0}&api_key={1}", movieName, _apikey);
            using (var client = new WebClient())
            {
                try
                {
                    var movies = new List<MovieFindDTO>();
                    var jsonString = client.DownloadString(url).Trim();
                    var moviesJson = JArray.Parse(jsonString);

                    foreach (var movieJson in moviesJson)
                    {
                        var movie = new MovieFindDTO
                        {
                            Id = movieJson.GetValue<string>("id"),
                            Title = movieJson.GetValue<string>("title"),
                            Year = movieJson.GetValue<string>("year"),
                        };

                        movies.Add(movie);
                    }

                    return movies;
                }
                catch(Exception ex)
                {
                    return null;
                }
            }
        }
    }
}

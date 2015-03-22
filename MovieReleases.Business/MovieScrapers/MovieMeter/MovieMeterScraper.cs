using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using CookComputing.XmlRpc;
using MovieReleases.DTO;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers.MovieMeter
{
    public class MovieMeterScraper : IMovieScraper
    {
        private string _apikey = "85u0w0rdhnwxfvdyvw24657axpbmcfxa";

        public Dictionary<string, DTO.MovieDto[]> GetMoviesOutOnDvd()
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, DTO.MovieDto[]> GetMoviesInCinema()
        {
            throw new NotImplementedException();
        }

        public DTO.MovieDto GetMovieById(string id)
        {
            var url = string.Format("http://www.moviemeter.nl/api/film/{0}&api_key={1}", id, _apikey);
            using (var client = new WebClient())
            {
                try
                {
                    var jsonString = client.DownloadString(url).Trim();

                    var jObject = JObject.Parse(jsonString);
                    var movie = new MovieDetailsDto
                                         {
                                             Id = jObject.GetValue<int>("id"),
                                             Title = jObject.GetValue<string>("title"),
                                             Year = jObject.GetValue<string>("year"),
                                             Duration = jObject.GetValue<string>("duration"),
                                             Imdb = jObject.GetValue<string>("imdb"),
                                             Plot = jObject.GetValue<string>("plot"),
                                             AlternativeTitle = jObject.GetValue<string>("alternative_title"),
                                             VotesCount = jObject.GetValue<int>("votes_count"),
                                             AverageScore = jObject.GetValue<double>("average"),
                                             Countries = jObject.GetListValues("countries"),
                                             Genres = jObject.GetListValues("genres"),
                                             Actors = jObject.GetListValues("actors", "name"),
                                             Directors = jObject.GetListValues("directors"),
                                         };

                    return movie;
                }
                catch
                {
                    return null;
                }
            }
        }


        public Dictionary<string, MovieDto[]> GetMoviesSoonInCinema()
        {
            throw new NotImplementedException();
        }


        public Dictionary<string, MovieDto[]> GetMoviesInCinema(IPlotScraper plotScraper)
        {
            throw new NotImplementedException();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business.DownloadList;
using MovieReleases.Core.Movies;
using MovieReleases.DTO;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers.RottenTomatoes
{
    public class RottenTomatoesScraper : IMovieScraper, IOutOnDvdScraper
    {
        private string _apikey = "dr2w352c8agvake5x24cu4e7";

        public RottenTomatoesScraper()
        {
        }

        public Dictionary<DateTime, DTO.MovieDto[]> GetMoviesOutOnDvd()
        {
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json?apikey={0}&country=nl", _apikey);
            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["movies"];

                var rentals = (from r in jarray
                               let imdb = string.Format("tt{0}", r.GetValue<string>("alternate_ids", "imdb"))
                               select new MovieDto
                               {
                                   ProviderId = r.GetValue<string>("id"),
                                   Title = r.GetValue<string>("title"),
                                   Year = r.GetValue<string>("year"),
                                   Duration = r.GetValue<string>("runtime"),
                                   ReleaseDate = r.GetValue<DateTime>("release_dates", "dvd"),
                                   Imdb = imdb,
                                   Plot = r.GetValue<string>("synopsis"),
                                   MovieType = MovieType.Dvd
                               }).GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());

                return rentals;
            }
        }

        public Dictionary<DateTime, DTO.MovieDto[]> GetMoviesInCinema()
        {
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey={0}&country=nl", _apikey);
            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["movies"];

                var cinemaMovies = (from r in jarray
                                    let imdb = string.Format("tt{0}", r.GetValue<string>("alternate_ids", "imdb"))
                                    select new MovieDto
                                    {
                                        Id = r.GetValue<int>("id"),
                                        Title = r.GetValue<string>("title"),
                                        Year = r.GetValue<string>("year"),
                                        Duration = r.GetValue<string>("runtime"),
                                        ReleaseDate = DateTime.Parse(r.GetValue<string>("release_dates", "theater")),
                                        Imdb = imdb,
                                        Plot = r.GetValue<string>("synopsis"),
                                        MovieType = MovieType.InCinema
                                    }).GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());

                return cinemaMovies;
            }
        }

        public Dictionary<DateTime, MovieDto[]> GetMoviesSoonInCinema()
        {
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey={0}&country=nl", _apikey);
            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["movies"];

                var cinemaMovies = (from r in jarray
                                    let imdb = string.Format("tt{0}", r.GetValue<string>("alternate_ids", "imdb"))
                                    select new MovieDto
                                    {
                                        ProviderId = r.GetValue<string>("id"),
                                        Title = r.GetValue<string>("title"),
                                        Year = r.GetValue<string>("year"),
                                        Duration = r.GetValue<string>("runtime"),
                                        ReleaseDate = r.GetValue<DateTime>("release_dates", "theater"),
                                        Imdb = imdb,
                                        Plot = r.GetValue<string>("synopsis"),
                                        MovieType = MovieType.SoonInCinema
                                    }).GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());

                return cinemaMovies;
            }
        }

        public DTO.MovieDto GetMovieById(string id)
        {
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/movies/{0}.json?apikey={1}&country=nl", id,_apikey);
            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);

                var movie = new MovieDetailsDto
                                    {
                                        ProviderId = jObject.GetValue<string>("id"),
                                        Title = jObject.GetValue<string>("title"),
                                        Year = jObject.GetValue<string>("year"),
                                        Duration = jObject.GetValue<string>("runtime"),
                                        ReleaseDate = jObject.GetValue<DateTime>("release_dates", "theater"),
                                        Imdb = jObject.GetValue<string>("alternate_ids", "imdb"),
                                        Plot = jObject.GetValue<string>("synopsis"),
                                        Actors = jObject["abridged_cast"].Select(c => (string)c["name"]),
                                        Genres = jObject["genres"].Select(c => (string)c),
                                        Directors = jObject["abridged_directors"].Select(c => (string)c["name"]),
                                    };

                return movie;
            }
        }


        public Dictionary<string, MovieDto[]> GetMoviesInCinema(IPlotScraper plotScraper)
        {
            throw new NotImplementedException();
        }
    }
}

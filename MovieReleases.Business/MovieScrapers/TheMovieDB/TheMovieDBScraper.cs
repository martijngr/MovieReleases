using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business.MovieScrapers.MovieMeter;
using MovieReleases.Core.Movies;
using MovieReleases.DTO;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers.TheMovieDB
{
    public class TheMovieDBScraper : IMovieScraper
    {
        private IPlotScraper _plotScraper;
        private string _apikey = "980071c1008d3dd64ab4a0893fe5a727";

        public TheMovieDBScraper()
        {
            _plotScraper = new MovieMeterPlotScraper();
        }

        public Dictionary<string, DTO.MovieDto[]> GetMoviesOutOnDvd()
        {
            return new Dictionary<string, DTO.MovieDto[]>();
        }

        public Dictionary<string, DTO.MovieDto[]> GetMoviesInCinema()
        {
            // https://api.themoviedb.org/3/movie/550?api_key=###&append_to_response=similar_movies,alternative_titles,keywords,releases,trailers
            string[] tmdbIds = new string[0];

            using (var client = new WebClient())
            {
                var url = string.Format("http://api.themoviedb.org/3/movie/now_playing?api_key={0}&language=nl", _apikey);
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["results"];
                tmdbIds = jarray.Select(i => i.GetValue<string>("id")).ToArray();
            }

            using (var client = new WebClient())
            {
                var movies = new List<MovieDto>();
                foreach (var id in tmdbIds)
                {
                    var movie = GetMovieById(id);

                    movies.Add(movie);
                }

                var dictionary = movies.GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());
                return dictionary;
            }
        }

        public Dictionary<string, DTO.MovieDto[]> GetMoviesSoonInCinema()
        {
            
            string[] tmdbIds = new string[0];

            using (var client = new WebClient())
            {
                var url = string.Format("http://api.themoviedb.org/3/movie/upcoming?api_key={0}&language=nl", _apikey);
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["results"];
                tmdbIds = jarray.Select(i => i.GetValue<string>("id")).ToArray();
            }

            using (var client = new WebClient())
            {
                var movies = new List<MovieDto>();
                foreach (var id in tmdbIds)
                {
                    var movie = GetMovieById(id);

                    movies.Add(movie);
                }

                var dictionary = movies.GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());
                return dictionary;
            }
        }

        public DTO.MovieDto GetMovieById(string id)
        {
            using (var client = new WebClient())
            {
                // https://api.themoviedb.org/3/movie/550?api_key=###&append_to_response=similar_movies,alternative_titles,keywords,releases,trailers
                var url = string.Format("http://api.themoviedb.org/3/movie/{0}?api_key={1}&language=nl&append_to_response=credits,rating,reviews,similar,alternative_titles", id, _apikey);
                var jsonString = client.DownloadString(url).Trim();
                var jObject = JObject.Parse(jsonString);

                var movie = new MovieDetailsDto
                {
                    Id = jObject.GetValue<int>("id"),
                    Title = jObject.GetValue<string>("title"),
                    Year = "2015",
                    Duration = jObject.GetValue<string>("runtime"),
                    ReleaseDate = jObject.GetValue<string>("release_date"),
                    Imdb = jObject.GetValue<string>("imdb_id"),
                    Plot = _plotScraper.GetPlot(jObject.GetValue<string>("imdb_id")),
                    MovieType = MovieType.InCinema,
                    Actors = jObject["credits"]["cast"].Select(c => (string)c["name"]),
                    Directors = jObject["credits"]["crew"].Select(d => (string)d["name"]),
                    Genres = jObject["genres"].Select(g => (string)g["name"]),
                    AlternativeTitle = jObject["alternative_titles"]["titles"].Select(g => (string)g["title"]).FirstOrDefault(),
                };

                return movie;
            }
        }
    }
}

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
    public class TheMovieDBScraper : IMovieScraper, IMovieDetailsScraper
    {
        private IPlotScraper _plotScraper;
        private string _apikey = "980071c1008d3dd64ab4a0893fe5a727";

        public TheMovieDBScraper(IPlotScraper plotScraper)
        {
            _plotScraper = plotScraper;
        }

        public Dictionary<DateTime, DTO.MovieDto[]> GetMoviesInCinema()
        {
            // Image info and sizes: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400
            // https://api.themoviedb.org/3/movie/550?api_key=###&append_to_response=similar_movies,alternative_titles,keywords,releases,trailers
            var movies = new List<MovieDto>();

            using (var client = new WebClient())
            {
                var url = string.Format("http://api.themoviedb.org/3/movie/now_playing?api_key={0}&language=nl", _apikey);
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["results"];

                foreach (var item in jarray)
                {
                    var movie = new MovieDto();
                    movie.ProviderId = item.GetValue<string>("id");
                    movie.MovieType = MovieType.InCinema;
                    movie.ReleaseDate = item.GetValue<DateTime>("release_date");
                    movie.Title = item.GetValue<string>("original_title");
                    movie.Thumbnail = GetThumbnailUrl(item.GetValue<string>("poster_path"));

                    movies.Add(movie);
                }
            }

            var dictionary = movies.GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());
            return dictionary;
        }

        public Dictionary<DateTime, DTO.MovieDto[]> GetMoviesSoonInCinema()
        {
            using (var client = new WebClient())
            {
                var url = string.Format("http://api.themoviedb.org/3/movie/upcoming?api_key={0}&language=nl", _apikey);
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["results"];
                var movies = new List<MovieDto>();

                foreach (var item in jarray)
                {
                    var movie = new MovieDto();
                    movie.ProviderId = item.GetValue<string>("id");
                    movie.MovieType = MovieType.SoonInCinema;
                    movie.ReleaseDate = item.GetValue<DateTime>("release_date");
                    movie.Title = item.GetValue<string>("original_title");
                    movie.Thumbnail = GetThumbnailUrl(item.GetValue<string>("poster_path"));

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

                try
                {
                    var jsonString = client.DownloadString(url).Trim();
                    var jObject = JObject.Parse(jsonString);

                    var movie = new MovieDetailsDto
                    {
                        Id = jObject.GetValue<int>("id"),
                        Title = jObject.GetValue<string>("title"),
                        Year = jObject.GetValue<string>("release_date").Substring(0, 4),
                        Duration = jObject.GetValue<string>("runtime"),
                        ReleaseDate = jObject.GetValue<DateTime>("release_date"),
                        Imdb = jObject.GetValue<string>("imdb_id"),
                        //Plot = _plotScraper.GetPlot(jObject.GetValue<string>("imdb_id")),
                        Plot = jObject.GetValue<string>("overview"),
                        Thumbnail = GetThumbnailUrl(jObject.GetValue<string>("poster_path")),
                        Actors = jObject["credits"]["cast"].Select(c => (string)c["name"]),
                        Directors = jObject["credits"]["crew"].Select(d => (string)d["name"]).Distinct(),
                        Genres = jObject["genres"].Select(g => (string)g["name"]),
                        AlternativeTitle = jObject["alternative_titles"]["titles"].Select(g => (string)g["title"]).FirstOrDefault(),
                    };

                    if (string.IsNullOrEmpty(movie.Plot))
                    {
                        movie.Plot = _plotScraper.GetPlot(movie.Imdb);
                    }

                    return movie;
                }
                catch (WebException ex)
                {
                    return null;
                    //throw new MovieNotFoundException(string.Format("Er zijn geen details gevonden voor de film met IMDB {0}", id), ex);
                }
            }
        }

        private string GetThumbnailUrl(string pasterPath)
        {
            var url = string.Format("http://image.tmdb.org/t/p/w300{0}", pasterPath);

            return url;
        }
    }
}

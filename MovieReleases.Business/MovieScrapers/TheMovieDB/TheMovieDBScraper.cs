using MovieReleases.Core.Movies;
using MovieReleases.DTO;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace MovieReleases.Business.MovieScrapers.TheMovieDB
{
    public class TheMovieDBScraper : IMovieDetailsScraper, IGrabMoviesSoonInCinema, IGrabMoviesNowInCinema
    {
        private string _apikey = "980071c1008d3dd64ab4a0893fe5a727";
        private readonly IPlotScraper _plotScraper;
        private readonly IMovieTrailerScraper _trailerScraper;

        public TheMovieDBScraper(IPlotScraper plotScraper, IMovieTrailerScraper trailerScraper)
        {
            _plotScraper = plotScraper;
            _trailerScraper = trailerScraper;
        }

        public IEnumerable<MovieDto> GetMoviesInCinema()
        {
            // Image info and sizes: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400
            // https://api.themoviedb.org/3/movie/550?api_key=###&append_to_response=similar_movies,alternative_titles,keywords,releases,trailers
            var url = string.Format("http://api.themoviedb.org/3/movie/now_playing?api_key={0}&language=nl", _apikey);
            var movies = FetchMovies(url, MovieType.InCinema);

            return movies;
        }

        public IEnumerable<MovieDto> GetMoviesSoonInCinema()
        {
            var url = string.Format("http://api.themoviedb.org/3/movie/upcoming?api_key={0}&language=nl", _apikey);
            var movies = FetchMovies(url, MovieType.SoonInCinema);

            return movies;
        }

        public MovieDto GetMovieByProviderId(string id)
        {
            using (var client = new WebClient())
            {
                // Id can be both: imdb or the id of 'the movie db'
                var url = string.Format("http://api.themoviedb.org/3/movie/{0}?api_key={1}&language=nl&append_to_response=credits,rating,reviews,similar,alternative_titles", id, _apikey);

                try
                {
                    var jsonString = client.DownloadString(url).Trim();
                    var jObject = JObject.Parse(jsonString);

                    var imdb = jObject.GetValue<string>("imdb_id");
                    var title = jObject.GetValue<string>("title");

                    var movie = new MovieDetailsDto
                    {
                        ProviderId = jObject.GetValue<int>("id"),
                        Title = title,
                        Year = jObject.GetValue<string>("release_date").Substring(0, 4),
                        Duration = jObject.GetValue<string>("runtime"),
                        ReleaseDate = jObject.GetValue<DateTime>("release_date"),
                        Imdb = imdb,
                        Plot = jObject.GetValue<string>("overview"),
                        Thumbnail = GetThumbnailUrl(jObject.GetValue<string>("poster_path")),
                        Actors = jObject["credits"]["cast"].Select(c => (string)c["name"]),
                        Directors = jObject["credits"]["crew"].Select(d => (string)d["name"]).Distinct(),
                        Genres = jObject["genres"].Select(g => (string)g["name"]),
                        AlternativeTitle = jObject["alternative_titles"]["titles"].Select(g => (string)g["title"]).FirstOrDefault(),
                        TrailerUrl = _trailerScraper.GetTrailerUrl(imdb, title),
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

        public MovieDto GetMovieByImdb(string imdb)
        {
            return GetMovieByProviderId(imdb);
        }

        private string GetThumbnailUrl(string posterPath)
        {
            var url = string.Format("http://image.tmdb.org/t/p/w300{0}", posterPath);

            return url;
        }

        private IEnumerable<MovieDto> FetchMovies(string url, MovieType movieType)
        {
            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url).Trim();
                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["results"];
                var movies = new List<MovieDto>();

                foreach (var item in jarray)
                {
                    var providerId = item.GetValue<string>("id");
                    var movie = GetMovieByProviderId(providerId);

                    movie.MovieType = movieType;
                    movies.Add(movie);
                }

                return movies;
            }
        }
    }
}

﻿using System;
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
    public class RottenTomatoesScraper : IMovieScraper
    {
        private string _apikey = "dr2w352c8agvake5x24cu4e7";

        public RottenTomatoesScraper()
        {
        }

        private Lazy<MovieDto[]> DownloadList = new Lazy<MovieDto[]>(() =>
        {
            return new DownloadListService().GetMoviesToDownload();
        });

        public Dictionary<string, DTO.MovieDto[]> GetMoviesOutOnDvd()
        {
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json?apikey={0}", _apikey);
            using (var client = new WebClient())
            {
                var jsonString = client.DownloadString(url).Trim();

                var jObject = JObject.Parse(jsonString);
                var jarray = (JArray)jObject["movies"];

                var rentals = (from r in jarray
                               let imdb = string.Format("tt{0}", r.GetValue<string>("alternate_ids", "imdb"))
                               select new MovieDto
                               {
                                   Id = r.GetValue<int>("id"),
                                   Title = r.GetValue<string>("title"),
                                   Year = r.GetValue<string>("year"),
                                   Duration = r.GetValue<string>("runtime"),
                                   ReleaseDate = r.GetValue<string>("release_dates", "dvd"),
                                   Imdb = imdb,
                                   Plot = r.GetValue<string>("synopsis"),
                                   MovieType = MovieType.Dvd,
                                   InDownloadList = DownloadList.Value.Any(m => m.Imdb == imdb)
                               }).GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());

                return rentals;
            }
        }

        public Dictionary<string, DTO.MovieDto[]> GetMoviesInCinema()
        {
            var url = string.Format("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey={0}", _apikey);
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
                                        ReleaseDate = r.GetValue<string>("release_dates", "theater"),
                                        Imdb = imdb,
                                        Plot = r.GetValue<string>("synopsis"),
                                        MovieType = MovieType.InCinema,
                                        InDownloadList = DownloadList.Value.Any(m => m.Imdb == imdb)
                                    }).GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());

                return cinemaMovies;
            }
        }

        public Dictionary<string, MovieDto[]> GetMoviesSoonInCinema()
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
                                        Id = r.GetValue<int>("id"),
                                        Title = r.GetValue<string>("title"),
                                        Year = r.GetValue<string>("year"),
                                        Duration = r.GetValue<string>("runtime"),
                                        ReleaseDate = r.GetValue<string>("release_dates", "theater"),
                                        Imdb = imdb,
                                        Plot = r.GetValue<string>("synopsis"),
                                        MovieType = MovieType.SoonInCinema,
                                        InDownloadList = DownloadList.Value.Any(m => m.Imdb == imdb)
                                    }).GroupBy(r => r.ReleaseDate).ToDictionary(c => c.Key, c => c.ToArray());

                return cinemaMovies;
            }
        }

        public DTO.MovieDto GetMovieById(string id)
        {
            throw new NotImplementedException();
        }


        public Dictionary<string, MovieDto[]> GetMoviesInCinema(IPlotScraper plotScraper)
        {
            throw new NotImplementedException();
        }
    }
}

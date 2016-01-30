using MovieReleases.Core.Movies;
using MovieReleases.Domain.Watchlists;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Domain.Movies
{
    public class Movie
    {
        public int Id { get; set; }
        public string Imdb { get; set; }
        public string Plot { get; set; }
        public string Duration { get; set; }
        public string PosterUrl { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public MovieType MovieType { get; set; }
        public string TrailerUrl { get; set; }
    }
}

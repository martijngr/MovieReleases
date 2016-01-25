using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Core.Movies;

namespace MovieReleases.DTO
{
    [DebuggerDisplay("Title: {Title}")]
    public class MovieDto
    {
        public int Id;
        public string ProviderId { get; set; }
        public string Title;
        public string Year;
        public string Thumbnail { get; set; }
        public string Imdb { get; set; }
        public string Plot { get; set; }
        public string Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public MovieType MovieType { get; set; }
        public bool Downloaded { get; set; }
        public string TrailerUrl { get; set; }
    }
}

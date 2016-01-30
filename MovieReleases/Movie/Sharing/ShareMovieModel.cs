using MovieReleases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieReleases.Movie.Sharing
{
    public class ShareMovieModel
    {
        public string SendBy { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public MovieDto Movie { get; set; }
    }
}
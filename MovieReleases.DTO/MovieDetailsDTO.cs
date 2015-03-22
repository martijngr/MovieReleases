using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Core.Movies;

namespace MovieReleases.DTO
{
    public class MovieDetailsDto : MovieDto
    {
        public string AlternativeTitle { get; set; }
        public int VotesCount { get; set; }
        public double AverageScore { get; set; }
        public IEnumerable<string> Countries { get; set; }
        public IEnumerable<string> Genres { get; set; }
        public IEnumerable<string> Actors { get; set; }
        public IEnumerable<string> Directors { get; set; }
    }
}

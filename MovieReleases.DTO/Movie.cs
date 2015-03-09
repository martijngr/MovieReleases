using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.DTO
{
    public class MovieDto
    {
        public int Id;
        public string Title;
        public string Year;
        public string Thumbnail { get; set; }
        public string ImdbId { get; set; }
        public string Plot { get; set; }
        public string Duration { get; set; }
        public string ReleaseDate { get; set; }
    }
}

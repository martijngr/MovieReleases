using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.DTO
{
    public class MovieFindDTO
    {
        public string ProviderId { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
        public string Imdb { get; set; }
    }
}

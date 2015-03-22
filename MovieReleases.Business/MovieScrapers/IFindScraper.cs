using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.DTO;

namespace MovieReleases.Business.MovieScrapers
{
    public interface IFindScraper
    {
        IEnumerable<MovieFindDTO> Find(string movieName);
    }
}

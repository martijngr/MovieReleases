using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Business.MovieScrapers
{
    public interface IOutOnDvdScraper
    {
        Dictionary<DateTime, DTO.MovieDto[]> GetMoviesOutOnDvd();
    }
}

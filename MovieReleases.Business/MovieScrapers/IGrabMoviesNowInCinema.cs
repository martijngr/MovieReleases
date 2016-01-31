using MovieReleases.DTO;
using System.Collections.Generic;

namespace MovieReleases.Business.MovieScrapers
{
    public interface IGrabMoviesNowInCinema
    {
        IEnumerable<MovieDto> GetMoviesInCinema();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.DTO;

namespace MovieReleases.Business.MovieScrapers
{
    public interface IMovieScraper
    {
        Dictionary<DateTime, MovieDto[]> GetMoviesInCinema();

        Dictionary<DateTime, MovieDto[]> GetMoviesSoonInCinema();

        MovieDto GetMovieByImdb(string id);
    }
}

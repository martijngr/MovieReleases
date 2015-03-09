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
        Dictionary<string, MovieDto[]> GetMoviesOutOnDvd();

        Dictionary<string, MovieDto[]> GetMoviesInCinema();

        Dictionary<string, MovieDto[]> GetMoviesSoonInCinema();

        MovieDto GetMovieById(string id);
    }
}

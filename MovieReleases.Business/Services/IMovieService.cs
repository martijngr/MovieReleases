using System;
using System.Collections.Generic;
using MovieReleases.DTO;
namespace MovieReleases.Business
{
    public interface IMovieService
    {
        MovieDto GetMovieById(string id);
        MovieDto GetMovieByImdb(string imdb);
        Dictionary<DateTime, MovieDto[]> GetMoviesInCinema();
        Dictionary<DateTime, MovieDto[]> GetMoviesOutOnDvd();
        Dictionary<DateTime, MovieDto[]> GetMoviesSoonInCinema();
        IEnumerable<MovieFindDTO> SearchMovie(string name);
        void UpdateMovies(IEnumerable<MovieDto> movies);
    }
}

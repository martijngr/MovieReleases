using System;
using System.Linq;
using MovieReleases.Core.Movies;
using MovieReleases.Domain;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business.Repositories
{
    public interface IMovieRepository
    {
        void AddMovie(Movie movie);
        Movie GetById(int movieId);
        Movie GetByImdb(string imdb);
        IQueryable<Movie> GetByMovieType(MovieType movieType);
        IQueryable<Movie> Movies();
        void SaveChanges();
    }
}

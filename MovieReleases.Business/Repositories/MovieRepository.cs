using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Business.Repositories
{
    public class MovieRepository
    {
        private MovieContainer _movies;

        public MovieRepository(MovieContainer context)
        {
            _movies = context;
        }

        public void AddMovie(Movie movie)
        {
            _movies.Movies.Add(movie);
        }

        public IQueryable<Movie> Movies()
        {
            return _movies.Movies.AsQueryable();
        }
    }
}

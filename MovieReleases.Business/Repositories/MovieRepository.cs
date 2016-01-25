using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Core.Movies;
using MovieReleases.Domain;
using MovieReleases.Domain.Uow;

namespace MovieReleases.Business.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private IUnitOfWork _unitOfWork;

        public MovieRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void AddMovie(Movie movie)
        {
            _unitOfWork.Movies.Add(movie);
        }

        public IQueryable<Movie> Movies()
        {
            return _unitOfWork.Movies.AsQueryable();
        }

        public Movie GetById(int movieId)
        {
            return _unitOfWork.Movies.FirstOrDefault(m => m.Id == movieId);
        }
        
        public Movie GetByImdb(string imdb)
        {
            return _unitOfWork.Movies.FirstOrDefault(m => m.Imdb == imdb);
        }

        public IQueryable<Movie> GetByMovieType(MovieType movieType)
        {
            return _unitOfWork.Movies.Where(m => m.MovieType == movieType);
        }

        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }
    }
}

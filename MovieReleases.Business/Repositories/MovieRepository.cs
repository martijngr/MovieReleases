using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Domain;
using MovieReleases.Domain.Uow;

namespace MovieReleases.Business.Repositories
{
    public class MovieRepository
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

        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }
    }
}

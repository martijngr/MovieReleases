using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Domain;
using MovieReleases.Domain.Uow;

namespace MovieReleases.Business.DownloadList
{
    public class DownloadListRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public DownloadListRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Add(Movie movie)
        {
            _unitOfWork.Movies.Add(movie);
        }

        public void Delete(Movie movie)
        {
            _unitOfWork.Movies.Remove(movie);
        }

        public void Delete(string imdb)
        {
            var movie = GetByImdb(imdb);
            _unitOfWork.Movies.Remove(movie);
        }

        public Movie GetByImdb(string imdb)
        {
            var movie = _unitOfWork.Movies.FirstOrDefault(m => m.Imdb == imdb);
            return movie;
        }

        public IEnumerable<Movie> GetMoviesToDownload()
        {
            var movies = (from m in _unitOfWork.Movies
                          select m).ToArray();

            return movies;
        }

        public int SaveChanges()
        {
            return _unitOfWork.SaveChanges();
        }
    }
}

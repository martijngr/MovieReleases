using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business.Converters;
using MovieReleases.Business.Repositories;
using MovieReleases.Core.Movies;
using MovieReleases.DTO;
using MovieReleases.Business;
using MovieReleases.Domain.Uow;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business.Grabbing.GrabberDecorators
{
    public class GrabberSaveDecorator : IGrabber
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMovieService _movieService;
        private readonly MovieConverter _movieConverter;
        private readonly IMovieRepository _movieRepository;
        private readonly IGrabber _grabberDecorator;

        public GrabberSaveDecorator(
            IUnitOfWork unitOfWork,
            IMovieService movieService,
            MovieConverter movieConverter,
            IMovieRepository movieRepository,
            IGrabber grabberDecorator)
        {
            _unitOfWork = unitOfWork;
            _movieService = movieService;
            _movieConverter = movieConverter;
            _movieRepository = movieRepository;
            _grabberDecorator = grabberDecorator;
        }

        public void AddNewMovie(MovieType newMovieType, MovieDto movie)
        {
            var movieToStore = _movieConverter.ConvertToMovie(movie);
            _movieRepository.AddMovie(movieToStore);

            if (_grabberDecorator != null)
            {
                _grabberDecorator.AddNewMovie(newMovieType, movie);
            }
        }

        public void UpdateMovie(MovieType movieType, MovieDto movie, Movie movieFromDb)
        {
            movieFromDb.MovieType = movieType;
            movieFromDb.ReleaseDate =movie.ReleaseDate;

            if (_grabberDecorator != null)
            {
                _grabberDecorator.UpdateMovie(movieType, movie, movieFromDb);
            }
        }

        public void GrabbingFinished()
        {
            _unitOfWork.SaveChanges();

            if (_grabberDecorator != null)
            {
                _grabberDecorator.GrabbingFinished();
            }
        }

        public void MovieGrabFailed(MovieType movieType, MovieDto movie, Exception ex)
        {
            if (_grabberDecorator != null)
            {
                _grabberDecorator.MovieGrabFailed(movieType, movie, ex);
            }
        }
    }
}
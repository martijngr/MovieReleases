using MovieReleases.Core.Movies;
using MovieReleases.Domain.Movies;
using MovieReleases.DTO;
using System;

namespace MovieReleases.Business.Grabbers
{
    public interface IGrabber
    {
        void AddNewMovie(MovieType movieType, MovieDto movie);

        void UpdateMovie(MovieType movieType, MovieDto movie, Movie movieFromDb);

        void MovieGrabFailed(MovieType movieType, MovieDto movie, Exception ex);

        void GrabbingFinished();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Core.Movies;
using MovieReleases.Domain;
using MovieReleases.DTO;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business.Grabbers
{
    public class GrabbedMoviesHandler : IGrabber
    {
        public void AddNewMovie(MovieType movieType, MovieDto movie)
        {
        }

        public void UpdateMovie(MovieType movieType, MovieDto movie, Movie movieFromDb)
        {
        }

        public void MovieGrabFailed(MovieType movieType, MovieDto movie, Exception ex)
        {
        }

        public void GrabbingFinished()
        {
        }
    }
}

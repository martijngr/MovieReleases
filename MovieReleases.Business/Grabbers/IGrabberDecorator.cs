using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Core.Movies;
using MovieReleases.Domain;
using MovieReleases.DTO;

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

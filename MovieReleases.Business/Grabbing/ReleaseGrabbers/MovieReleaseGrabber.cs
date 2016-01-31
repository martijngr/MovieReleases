using MovieReleases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Business.Grabbing.ReleaseGrabbers
{
    public abstract class MovieReleaseGrabber
    {
        public MovieReleaseGrabber()
        {

        }

        public abstract void GrabAndSave();

        protected void ValidateMovie(MovieDto movie)
        {
            if (string.IsNullOrEmpty(movie.Imdb))
            {
                throw new Exception(string.Format("No IMDB set for movie {0} with provider id {1}", movie.Title, movie.ProviderId));
            }
        }
    }
}

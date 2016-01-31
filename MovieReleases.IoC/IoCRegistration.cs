using MovieReleases.Business;
using MovieReleases.Business.Grabbing.GrabberDecorators;
using MovieReleases.Business.Grabbing.ReleaseGrabbers;
using MovieReleases.Business.Mailing;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.MovieScrapers.MovieMeter;
using MovieReleases.Business.MovieScrapers.RottenTomatoes;
using MovieReleases.Business.MovieScrapers.TheMovieDB;
using MovieReleases.Business.Repositories;
using MovieReleases.Domain.Uow;
using SimpleInjector;
using SimpleInjector.Extensions;

namespace MovieReleases.IoC
{
    public static class IoCRegistration
    {
        public static void RegisterForWeb(Container container)
        {
            container.RegisterPerWebRequest<IUnitOfWork, UnitOfWork>();
        }

        public static void RegisterForNonWeb(Container container)
        {
            container.RegisterSingle<IUnitOfWork, UnitOfWork>();

        }
        public static void RegisterDefaults(Container container)
        {
            container.Register<IMovieTrailerScraper, YoutubeTrailerScraper>();
            container.Register<IPlotScraper, MovieMeterPlotScraper>();
            container.Register<IFindScraper, RottenTomatiesFindScraper>();
            container.Register<IGrabMoviesOutOnDvd, RottenTomatoesScraper>();
            container.Register<IGrabMoviesNowInCinema, TheMovieDBScraper>();
            container.Register<IGrabMoviesSoonInCinema, TheMovieDBScraper>();
            container.Register<IMovieDetailsScraper, TheMovieDBScraper>();

            container.Register<MoviesNowInCinemaGrabber, MoviesNowInCinemaGrabber>();
            container.Register<MovieSoonInCinemaGrabber, MovieSoonInCinemaGrabber>();
            container.Register<MoviesOutOnDvdGrabber, MoviesOutOnDvdGrabber>();

            container.Register<IMovieService, MovieService>();
            container.Register<IMovieRepository, MovieRepository>();

            container.Register<IMailClient, SmtpMailClient>();
            
            container.Register<IGrabber, GrabbedMoviesHandler>();
            container.RegisterSingleDecorator(typeof(IGrabber), typeof(GrabberNotifierDecorator));
            container.RegisterSingleDecorator(typeof(IGrabber), typeof(GrabberLogDecorator));
            container.RegisterSingleDecorator(typeof(IGrabber), typeof(GrabberSaveDecorator));
        }
    }
}

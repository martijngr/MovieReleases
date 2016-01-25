using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business;
using MovieReleases.Business.Grabbers;
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
            container.Register<IPlotScraper, MovieMeterPlotScraper>();
            container.Register<IFindScraper, RottenTomatiesFindScraper>();
            container.Register<IMovieScraper, TheMovieDBScraper>();
            container.Register<IMovieTrailerScraper, YoutubeTrailerScraper>();
            //container.Register<IMovieTrailerScraper, TrailerAddictTrailerScraper>();
            container.Register<IMovieDetailsScraper, TheMovieDBScraper>();
            container.Register<IOutOnDvdScraper, RottenTomatoesScraper>();
            container.Register<IMovieService, MovieService>();
            container.Register<IMovieRepository, MovieRepository>();
            
            container.Register<IGrabber, GrabbedMoviesHandler>();
            container.RegisterDecorator(typeof(IGrabber), typeof(GrabberNotifierDecorator));
            container.RegisterDecorator(typeof(IGrabber), typeof(GrabberLogDecorator));
            container.RegisterDecorator(typeof(IGrabber), typeof(GrabberSaveDecorator));
        }
    }
}

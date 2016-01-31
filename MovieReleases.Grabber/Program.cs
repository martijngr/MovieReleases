using MovieReleases.Business.Grabbing.ReleaseGrabbers;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Business.Repositories;
using MovieReleases.Domain.Uow;
using MovieReleases.Grabber.Grabbers;
using MovieReleases.IoC;
using SimpleInjector;
using System;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net.Mail;

namespace MovieReleases.Grabber
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Any())
            {
                HandleArgs(args);

                return;
            }

            Container container = CreateContainer();
            var grabber = container.GetInstance<MovieGrabber>();
            
            Console.WriteLine("Gegevens worden gedownload en opgeslagen...");

            try
            {
                grabber.AddReleaseGrabber(container.GetInstance<MoviesNowInCinemaGrabber>());
                grabber.AddReleaseGrabber(container.GetInstance<MovieSoonInCinemaGrabber>());
                grabber.AddReleaseGrabber(container.GetInstance<MoviesOutOnDvdGrabber>());

                grabber.GrabAndSaveNewReleases();
            }
            catch (DbEntityValidationException ex)
            {
                Console.WriteLine(string.Format("Er is een validatiefout opgetreden: {0}", ex.Message));
                using (var fileStream = File.Create("error.txt"))
                using (var writer = new StreamWriter(fileStream))
                {
                    writer.Write(ex);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(string.Format("Er is een onbekende fout opgetreden: {0}", ex.Message));
                using (var fileStream = File.Create("error.txt"))
                using (var writer = new StreamWriter(fileStream))
                {
                    writer.Write(ex);
                }
            }
            finally
            {
                Console.Write("Klaar met binnehalen van gegevens. Druk op een toets om af te sluiten.");
            }
        }

        private static Container CreateContainer()
        {
            var container = new Container();
            IoCRegistration.RegisterForNonWeb(container);
            IoCRegistration.RegisterDefaults(container);
            return container;
        }

        private static void HandleArgs(string[] args)
        {
            if (args.Contains("testmail"))
            {
                var c = new SmtpClient();
                c.Send(new MailMessage("van@mij.nl", "martijngr@gmail.com", "test", "body"));
            }
            else if (args.Contains("setTrailerUrl"))
            {
                Container container = CreateContainer();

                var uow = container.GetInstance<IUnitOfWork>();
                var trailerScraper = container.GetInstance<IMovieTrailerScraper>();

                foreach (var movie in uow.Movies.Where(m => m.TrailerUrl == null))
                {
                    movie.TrailerUrl = trailerScraper.GetTrailerUrl(movie.Imdb, movie.Title);
                }

                uow.SaveChanges();
            }
        }
    }
}
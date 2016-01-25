using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business.Grabbers;
using MovieReleases.Business.MovieScrapers;
using MovieReleases.Core.Movies;
using MovieReleases.DTO;
using MovieReleases.IoC;
using SimpleInjector;

namespace MovieReleases.Grabber
{
    class Program
    {
        static void Main(string[] args)
        {
            HandleArgs(args);
            var container = new Container();
            IoCRegistration.RegisterForNonWeb(container);
            IoCRegistration.RegisterDefaults(container);
            var grabber = container.GetInstance<MovieGrabber>();

            Console.WriteLine("Gegevens worden gedownload en opgeslagen...");

            try
            {
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

        private static void HandleArgs(string[] args)
        {
            if (args != null && args.Contains("testmail"))
            {
                var c = new SmtpClient();
                c.Send(new MailMessage("van@mij.nl", "martijngr@gmail.com", "test", "body"));
            }
        }
    }
}
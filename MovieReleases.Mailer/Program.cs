using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using MovieReleases.Business.MovieScrapers.MovieMeter;
using MovieReleases.IoC;
using MovieReleases.Mailer.MovieUpdateMailer;
using S22.Imap;
using SimpleInjector;

namespace MovieReleases.Mailer
{
    class Program
    {
        private static Timer _mailerTimer;
        private static Timer _mailListenerTimer;
        private static MovieMailer _movieMailer;
        private static MailListener _mailListener;
        private static Container _container;

        static void Main(string[] args)
        {
            _container = new Container();
            IoCRegistration.RegisterDefaults(_container);
            IoCRegistration.RegisterForNonWeb(_container);

            _movieMailer = new MovieMailer(_container);
            _mailListener = new MailListener(_container);
            InitilizeTimer();
            InitializeMailListenerTimer();
            Console.ReadLine();
        }

        private static void InitilizeTimer()
        {
            _mailerTimer = new Timer();
            _mailerTimer.Interval = 1000;
            _mailerTimer.Elapsed += timer_Elapsed;

            _mailerTimer.Start();
        }

        private static void InitializeMailListenerTimer()
        {
            _mailListenerTimer = new Timer();
            _mailListenerTimer.Interval = 1000;
            _mailListenerTimer.Elapsed += _mailerTimer_Elapsed;
            _mailListenerTimer.Start();
        }

        private static void _mailerTimer_Elapsed(object sender, ElapsedEventArgs e)
        {
            _mailListenerTimer.Stop();

            _mailListener.ProcessUnseenMails();

            _mailListenerTimer.Start();
        }

        static void timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            _mailerTimer.Stop();

            _movieMailer.Mail();

            _mailerTimer.Start();
        }
    }
}

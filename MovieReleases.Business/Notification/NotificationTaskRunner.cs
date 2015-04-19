using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using MovieReleases.Domain.Uow;

namespace MovieReleases.Business.Notification
{
    public class NotificationTaskRunner
    {
        private IUnitOfWork _unitOfWork;
        private Timer _timer;
        private INotificationService _notificationService;

        public NotificationTaskRunner(INotificationService notificationService, IUnitOfWork unitOfWork)
        {
            _notificationService = notificationService;
            _unitOfWork = unitOfWork;
            _timer = new Timer();
            _timer.Elapsed += _timer_Elapsed;
        }

        private void _timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            _timer.Stop();
            var movieIds = _unitOfWork.Movies.Where(m => m.ReleaseDate.Value <= DateTime.Today).Select(m => m.Id).ToArray();

            if (movieIds.Any())
            {
                _notificationService.Notify(movieIds);
            }

            _timer.Start();
        }

        public void StartNotificationServive(double intervalInMinutes = 1)
        {
            _timer.Interval = intervalInMinutes * 60 * 60;
            _timer.Start();
        }
    }
}
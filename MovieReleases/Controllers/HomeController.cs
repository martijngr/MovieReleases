using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MovieReleases.Business;
using MovieReleases.Business.Notification;
using MovieReleases.Notification;

namespace MovieReleases.Controllers
{
    public class HomeController : Controller
    {
        private readonly MoviesToNotifyDecorator _notifier;

        public HomeController(MoviesToNotifyDecorator notifier)
        {
            _notifier = notifier;
        }

        public ActionResult Index()
        {
            return View();
        }

        public void StartNotificationService()
        {
            var dec2 = new SendNotificationsDecorator(_notifier, new Notifier());
            var dec3 = new HandleNotificationSendDecorator(dec2);
            var timer = new TimerNotificationDecorator(dec3);
            //timer.Notify(1);
        }
    }
}

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
        public ActionResult Index()
        {
            return View();
        }

        public void StartNotificationService()
        {
            var dec1 = new MoviesToNotifyDecorator();
            var dec2 = new SendNotificationsDecorator(dec1, new Notifier());
            var dec3 = new HandleNotificationSendDecorator(dec2);
            var timer = new TimerNotificationDecorator(dec3);
            //timer.Notify(1);
        }
    }
}

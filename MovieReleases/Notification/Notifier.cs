using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using MovieReleases.Business.Notification;
using MovieReleases.Hubs;

namespace MovieReleases.Notification
{
    public class Notifier : INotificationService
    {
        public void Notify(int[] movieIds)
        {
            GlobalHost.ConnectionManager.GetHubContext<NotificationHub>().Clients.All.movieReleased(movieIds);
        }
    }
}
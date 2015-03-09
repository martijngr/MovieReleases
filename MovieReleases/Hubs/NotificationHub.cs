using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace MovieReleases.Hubs
{
    public class NotificationHub : Hub
    {
        public void Notify(int[] movieIds)
        {
            Clients.All.movieReleased(movieIds);
        }
    }
}
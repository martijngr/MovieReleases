using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Business.Notification
{
    public interface INotificationService
    {
        void Notify(int[] movieIds);
    }
}

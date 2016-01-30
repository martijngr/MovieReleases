using MovieReleases.Business.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MovieReleases.Properties.Settings;

namespace MovieReleases.Settings
{
    public class WebSettings : ISettings
    {
        public string SiteUrl
        {
            get
            {
                return Default.SiteUrl;
            }
        }
    }
}
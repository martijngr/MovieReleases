using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Business.MovieScrapers.MovieMeter
{
    public class MovieMeterPlotScraper : IPlotScraper
    {
        public string GetPlot(string imdb)
        {
            var scraper = new MovieMeterScraper();
            var movie = scraper.GetMovieByProviderId(imdb);
            var plot = movie == null ? "" : movie.Plot;

            return plot;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.DTO
{
    public class WatchListItemDTO
    {
        public int Id { get; set; }

        public MovieDto Movie { get; set; }
    }
}

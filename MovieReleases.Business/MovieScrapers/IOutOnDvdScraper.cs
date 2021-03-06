﻿using MovieReleases.DTO;
using System.Collections.Generic;

namespace MovieReleases.Business.MovieScrapers
{
    public interface IGrabMoviesOutOnDvd
    {
        IEnumerable<MovieDto> GetMoviesOutOnDvd();
    }
}

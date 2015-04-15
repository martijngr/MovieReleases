using System;
using System.Linq;
using MovieReleases.DTO;

namespace MovieReleases.Business.DownloadList
{
    public class DownloadListService
    {
        private MovieContainer _context;

        public DownloadListService()
        {
            _context = new MovieContainer();
        }

        public void AddMovieToDownloadList(MovieDto movieDto)
        {
            var movie = FromDto(movieDto);

            _context.Movies.Add(movie);
            _context.SaveChanges();
        }

        public void DeleteMovieFromDownloadList(string imdbId)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.Imdb == imdbId);
            _context.Movies.Remove(movie);

            _context.SaveChanges();
        }

        public MovieDto[] GetMoviesToDownload()
        {
            var movies = (from m in _context.Movies
                         select new MovieDto
                         {
                             Title = m.Title,
                             Imdb = m.Imdb,
                             Downloaded = m.Downloaded,
                             MovieType = m.MovieType,
                             //ReleaseDate= m.ReleaseDate.ToString(),
                         }).ToArray();

            return movies;
        }

        private Movie FromDto(MovieDto movie)
        {
            return new Movie
            {
                Downloaded = false,
                Duration = movie.Duration,
                Imdb = movie.Imdb,
                Plot = movie.Plot,
                PosterUrl = movie.Thumbnail,
                Title = movie.Title,
                Year = movie.Year,
                MovieType = movie.MovieType,
                ReleaseDate = DateTime.Parse(movie.ReleaseDate),
            };
        }
    }
}
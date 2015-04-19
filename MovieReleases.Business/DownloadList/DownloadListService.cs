using System;
using System.Linq;
using MovieReleases.Domain;
using MovieReleases.DTO;

namespace MovieReleases.Business.DownloadList
{
    public class DownloadListService
    {
        private DownloadListRepository _downloadListRepository;

        public DownloadListService(DownloadListRepository downloadListRepository)
        {
            _downloadListRepository = downloadListRepository;
        }

        public void AddMovieToDownloadList(MovieDto movieDto)
        {
            var movie = FromDto(movieDto);

            _downloadListRepository.Add(movie);
            _downloadListRepository.SaveChanges();
        }

        public void DeleteMovieFromDownloadList(string imdb)
        {
            _downloadListRepository.Delete(imdb);

            _downloadListRepository.SaveChanges();
        }

        public MovieDto[] GetMoviesToDownload()
        {
            var movies = (from m in _downloadListRepository.GetMoviesToDownload()
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
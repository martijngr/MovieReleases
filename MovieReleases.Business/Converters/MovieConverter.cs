using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Domain;
using MovieReleases.DTO;

namespace MovieReleases.Business.Converters
{
    public class MovieConverter
    {
        public Movie ConvertToMovie(MovieDto movieDto)
        {
            var movie = new Movie
            {
                Duration = movieDto.Duration,
                Imdb = movieDto.Imdb,
                MovieType = movieDto.MovieType,
                Plot = movieDto.Plot,
                PosterUrl = movieDto.Thumbnail,
                ReleaseDate = movieDto.ReleaseDate,
                Title = movieDto.Title,
                Year = movieDto.Year,
            };

            if (string.IsNullOrEmpty(movie.Duration)) movie.Duration = "";
            if (string.IsNullOrEmpty(movie.Year)) movie.Year = "";

            return movie;
        }

        public IEnumerable<MovieDto> ConvertToMovieDto(IEnumerable<Movie> movies)
        {
            var convertedMovies = new List<MovieDto>();

            foreach (var movie in movies)
            {
                var convertedMovie = ConvertToMovieDto(movie);
                convertedMovies.Add(convertedMovie);
            }
            
            return convertedMovies;
        }

        public MovieDto ConvertToMovieDto(Movie movie)
        {
            var convertedMovie = new MovieDto
            {
                Id = movie.Id,
                Duration = movie.Duration,
                Imdb = movie.Imdb,
                MovieType = movie.MovieType,
                Plot = movie.Plot,
                ReleaseDate = movie.ReleaseDate.Value,
                Thumbnail = movie.PosterUrl,
                Title = movie.Title,
                Year = movie.Year,
            };

            return convertedMovie;
        }

        internal MovieDto ConvertToMovieDto(Movie movie, bool p)
        {
            var movieDto = ConvertToMovieDto(movie);
            movieDto.Downloaded = p;

            return movieDto;
        }
    }
}

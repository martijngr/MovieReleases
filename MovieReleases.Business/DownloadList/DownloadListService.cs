using System;
using System.Collections.Generic;
using System.Linq;
using MovieReleases.Business.Converters;
using MovieReleases.Business.Repositories;
using MovieReleases.Business.Users;
using MovieReleases.Domain;
using MovieReleases.DTO;
using MovieReleases.Domain.Watchlists;

namespace MovieReleases.Business.DownloadList
{
    public class DownloadListService
    {
        private DownloadListRepository _downloadListRepository;
        private UserRepository _userRepository;
        private MovieRepository _movieRepository;
        private MovieConverter _movieConverter;
        private WatchlistItemConverter _watchlistItemConverter;

        public DownloadListService(
            DownloadListRepository downloadListRepository,
            UserRepository userRepository,
            MovieRepository movieRepository,
            MovieConverter movieConverter,
            WatchlistItemConverter watchlistItemConverter)
        {
            _downloadListRepository = downloadListRepository;
            _userRepository = userRepository;
            _movieRepository = movieRepository;
            _movieConverter = movieConverter;
            _watchlistItemConverter = watchlistItemConverter;
        }

        public WatchListItemDTO AddMovieToDownloadList(MovieDto movieDto)
        {
            var watchlist = FromDto(movieDto);

            _downloadListRepository.Add(watchlist);
            _downloadListRepository.SaveChanges();

            var watchlistDto = _watchlistItemConverter.ConvertToWatchListItemDTO(watchlist);

            return watchlistDto;
        }

        public void DeleteMovieFromDownloadList(int id)
        {
            _downloadListRepository.Delete(id);

            _downloadListRepository.SaveChanges();
        }

        public IEnumerable<WatchListItemDTO> GetMoviesInWatchlist()
        {
            var watchlistItems = (from m in _downloadListRepository.GetMoviesToDownload()
                                  select new WatchListItemDTO
                                  {
                                      Id = m.Id,
                                      Movie = _movieConverter.ConvertToMovieDto(m.Movie, m.InPosession),
                                  });

            return watchlistItems;
        }

        public void Update(WatchListItemDTO watchlistItemDto)
        {
            var watchList = _downloadListRepository.GetById(watchlistItemDto.Id);

            watchList.InPosession = watchlistItemDto.Movie.Downloaded;

            _downloadListRepository.SaveChanges();
        }

        private WatchlistItem FromDto(MovieDto movie)
        {
            return new WatchlistItem
            {
                InPosession = movie.Downloaded,
                MovieId = movie.Id,
                Watched = false,
            };
        }
    }
}
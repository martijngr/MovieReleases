using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business.Users;
using MovieReleases.Domain;
using MovieReleases.Domain.Uow;
using MovieReleases.Domain.Watchlists;
using MovieReleases.Domain.Movies;

namespace MovieReleases.Business.DownloadList
{
    public class DownloadListRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserRepository _userRepository;
        private int userId = 1;

        public DownloadListRepository(IUnitOfWork unitOfWork, UserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
        }
        public void Add(WatchlistItem watchListItem)
        {
            _unitOfWork.WatchlistItems.Add(watchListItem);
        }

        public void Delete(int watchlistItemId)
        {
            var watchLIstItem = _unitOfWork.WatchlistItems.First(w => w.Id == watchlistItemId);

            _unitOfWork.WatchlistItems.Remove(watchLIstItem);
        }

        public Movie GetByImdb(string imdb)
        {
            var movie = _unitOfWork.Movies.FirstOrDefault(m => m.Imdb == imdb);
            return movie;
        }

        public WatchlistItem GetById(int id)
        {
            var watchlistItem = _unitOfWork.WatchlistItems.FirstOrDefault(m => m.Id == id);
            return watchlistItem;
        }

        public IEnumerable<WatchlistItem> GetMoviesToDownload()
        {
            var watchlistItems = (from w in _unitOfWork.WatchlistItems
                                  where w.UserId == userId
                                  select w).ToArray();

            return watchlistItems;
        }

        public int SaveChanges()
        {
            return _unitOfWork.SaveChanges();
        }
    }
}

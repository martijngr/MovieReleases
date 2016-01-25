using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Business.Users;
using MovieReleases.Domain;
using MovieReleases.Domain.Uow;

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

        public void Add(Watchlist watchList)
        {
            _unitOfWork.Watchlists.Add(watchList);
        }

        public void Add(WatchListItem watchListItem)
        {
            _unitOfWork.WatchListItems.Add(watchListItem);
        }

        public void Delete(int watchlistItemId)
        {
            var watchLIstItem = _unitOfWork.WatchListItems.First(w => w.Id == watchlistItemId);

            _unitOfWork.WatchListItems.Remove(watchLIstItem);
        }

        public Movie GetByImdb(string imdb)
        {
            var movie = _unitOfWork.Movies.FirstOrDefault(m => m.Imdb == imdb);
            return movie;
        }

        public WatchListItem GetById(int id)
        {
            var watchlistItem = _unitOfWork.WatchListItems.FirstOrDefault(m => m.Id == id);
            return watchlistItem;
        }

        public IEnumerable<WatchListItem> GetMoviesToDownload()
        {
            var movies = (from m in _unitOfWork.WatchListItems
                          where m.Watchlist.User.Id == userId
                          select m).ToArray();

            return movies;
        }

        public int SaveChanges()
        {
            return _unitOfWork.SaveChanges();
        }
    }
}

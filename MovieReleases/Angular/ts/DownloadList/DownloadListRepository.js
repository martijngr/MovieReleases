var MovieApp;
(function (MovieApp) {
    var DownloadListRepository = (function () {
        function DownloadListRepository($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.MarkMovieAsWatched = function (watchListItem) {
                this.$http.put('/api/DownloadList/MarkMovieAsWatched/', watchListItem);
            };
            this.GetMoviesToDownload = function () {
                var _this = this;
                return this.$http.get("/api/DownloadList/").then(function (response) {
                    _this.watchlist = response.data;
                    return _this.watchlist;
                });
            };
            this.watchlist = new Array();
        }
        DownloadListRepository.prototype.AddMovieToDownloadList = function (movie) {
            var _this = this;
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                _this.watchlist.push(response.data);
            });
        };
        DownloadListRepository.prototype.deleteFromDownloadListByMovie = function (movie) {
            var watchlistItem = this.GetWatchlistItemByMovieId(movie.Id);
            this.deleteFromDownloadListByWatchlist(watchlistItem);
        };
        DownloadListRepository.prototype.deleteFromDownloadListByWatchlist = function (watchlistItem) {
            var _this = this;
            return this.$http.delete("/api/DownloadList/" + watchlistItem.Id).then(function (response) {
                angular.copy(_.without(_this.watchlist, watchlistItem), _this.watchlist);
            });
        };
        DownloadListRepository.prototype.IsMovieInDownloadList = function (movie) {
            var enlistedMovie = _.filter(this.watchlist, function (item) {
                return item.Movie.Imdb == movie.Imdb;
            });
            return enlistedMovie.length > 0;
        };
        DownloadListRepository.prototype.GetWatchlistItemByMovieId = function (movieId) {
            var enlistedMovie = _.filter(this.watchlist, function (item) {
                return item.Movie.Id == movieId;
            });
            return enlistedMovie && enlistedMovie.length > 0 ? _.first(enlistedMovie) : null;
        };
        DownloadListRepository.$inject = ['$http', '$q', '$window'];
        return DownloadListRepository;
    })();
    MovieApp.DownloadListRepository = DownloadListRepository;
})(MovieApp || (MovieApp = {}));
app.service("DownloadListRepository", MovieApp.DownloadListRepository);
//# sourceMappingURL=DownloadListRepository.js.map
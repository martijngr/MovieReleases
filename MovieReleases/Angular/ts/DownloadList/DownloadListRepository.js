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
            this.DeleteMovieFromDownloadList = function (watchlistItem) {
                var _this = this;
                return this.$http.delete("/api/DownloadList/" + watchlistItem.Id).then(function (response) {
                    angular.copy(_.without(_this.watchlist, watchlistItem), _this.watchlist);
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
        DownloadListRepository.prototype.IsMovieInDownloadList = function (movie) {
            var enlistedMovie = _.findWhere(this.watchlist, { Imdb: movie.Imdb });
            return angular.isDefined(enlistedMovie);
        };
        DownloadListRepository.$inject = ['$http', '$q', '$window'];
        return DownloadListRepository;
    })();
    MovieApp.DownloadListRepository = DownloadListRepository;
})(MovieApp || (MovieApp = {}));
app.service("DownloadListRepository", MovieApp.DownloadListRepository);
//# sourceMappingURL=DownloadListRepository.js.map
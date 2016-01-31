var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, downloadListRepository) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.downloadListRepository = downloadListRepository;
            this.search = {
                movieName: "",
            };
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });
            $scope.movieTypeFilter = 3;
            downloadListRepository.GetMoviesToDownload().then(function (response) {
                _this.$scope.moviesToDownload = response;
            });
            $scope.$on("onDragStart", function (event, data) {
                _this.dragPending = true;
            });
            $scope.$on("onDragDrop", function (event, data) {
                var movie = angular.fromJson(data);
                if (!_this.downloadListRepository.IsMovieInDownloadList(movie)) {
                    _this.downloadListRepository.AddMovieToDownloadList(movie);
                    _this.$scope.moviesToDownload.push(movie);
                }
                _this.dragPending = false;
            });
            $scope.filter = function (watchListItem) {
                return watchListItem.Movie.MovieType == $scope.movieTypeFilter;
            };
            $scope.countMovieType = function (movieType) {
                var count = 0;
                angular.forEach($scope.moviesToDownload, function (watchlistItem) {
                    if (watchlistItem.Movie.MovieType == movieType) {
                        count++;
                    }
                });
                return count;
            };
            $scope.isWatchlistVisible = function () {
                return $("#download-list").is(":visible");
            };
        }
        HomeController.prototype.setActiveUrlPart = function () {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
        };
        HomeController.prototype.deleteMovieFromDownloadList = function (watchlistItem) {
            var _this = this;
            this.downloadListRepository.deleteFromDownloadListByWatchlist(watchlistItem).then(function () {
                angular.copy(_.without(_this.$scope.moviesToDownload, watchlistItem), _this.$scope.moviesToDownload);
            });
        };
        Object.defineProperty(HomeController.prototype, "moviesToDownload", {
            get: function () {
                return this.$scope.moviesToDownload;
            },
            enumerable: true,
            configurable: true
        });
        HomeController.prototype.markMovieAsDownloaded = function (watchlistItem) {
            this.downloadListRepository.MarkMovieAsWatched(watchlistItem);
            watchlistItem.Movie.Downloaded = true;
        };
        HomeController.prototype.searchMovie = function () {
            this.$location.path('/Movie/Search/' + this.search.movieName);
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            'DownloadListRepository',
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));
app.controller("HomeController", MovieApp.HomeController);
//# sourceMappingURL=HomeController.js.map
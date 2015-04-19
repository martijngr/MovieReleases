var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, downloadListRepository) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.downloadListRepository = downloadListRepository;
            this.search = {
                movieName: ""
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
        }
        HomeController.prototype.setActiveUrlPart = function () {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
        };

        HomeController.prototype.deleteMovieFromDownloadList = function (movie) {
            var _this = this;
            this.downloadListRepository.DeleteMovieFromDownloadList(movie).then(function () {
                angular.copy(_.without(_this.$scope.moviesToDownload, movie), _this.$scope.moviesToDownload);
            });
        };

        Object.defineProperty(HomeController.prototype, "moviesToDownload", {
            get: function () {
                return this.$scope.moviesToDownload;
            },
            enumerable: true,
            configurable: true
        });

        HomeController.prototype.markMovieAsDownloaded = function (movie) {
            movie.Downloaded = true;
        };

        HomeController.prototype.searchMovie = function () {
            this.$location.path('/Movie/Search/' + this.search.movieName);
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            'DownloadListRepository'
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));

app.controller("HomeController", MovieApp.HomeController);
//# sourceMappingURL=HomeController.js.map

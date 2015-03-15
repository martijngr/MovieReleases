var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, downloadListRepository) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.downloadListRepository = downloadListRepository;
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });

            $scope.movieTypeFilter = 3;

            downloadListRepository.GetMoviesToDownload().then(function (response) {
                _this.$scope.moviesToDownload = response;
            });
        }
        HomeController.prototype.setActiveUrlPart = function () {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
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

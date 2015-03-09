var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, MovieService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.MovieService = MovieService;
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });

            MovieService.GetMoviesToDownload().then(function (response) {
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

        HomeController.prototype.deleteMovieFromDownloadList = function (movie) {
            var _this = this;
            this.MovieService.DeleteMovieFromDownloadList(movie).then(function () {
                _this.$scope.moviesToDownload = _.without(_this.$scope.moviesToDownload, movie);
            });
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            'MovieService'
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));

app.controller("HomeController", MovieApp.HomeController);
//# sourceMappingURL=HomeController.js.map

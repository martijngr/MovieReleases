var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, downloadListService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.downloadListService = downloadListService;
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });

            downloadListService.GetMoviesToDownload().then(function (response) {
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
            this.downloadListService.DeleteMovieFromDownloadList(movie).then(function () {
                _this.$scope.moviesToDownload = _.without(_this.$scope.moviesToDownload, movie);
            });
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            'DownloadListService'
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));

app.controller("HomeController", MovieApp.HomeController);

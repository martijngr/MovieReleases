var MovieApp;
(function (MovieApp) {
    var MovieOverviewController = (function () {
        function MovieOverviewController($scope, movies, downloadListRepository) {
            this.$scope = $scope;
            this.movies = movies;
            this.downloadListRepository = downloadListRepository;
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }
        MovieOverviewController.prototype.addMovieToDownloadList = function (movie) {
            movie.InDownloadList = true;
            this.downloadListRepository.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        };

        MovieOverviewController.prototype.deleteMovieFromDownloadList = function (movie) {
            var _this = this;
            this.downloadListRepository.DeleteMovieFromDownloadList(movie).then(function () {
                movie.InDownloadList = false;
                angular.copy(_.without(_this.$scope.moviesToDownload, movie), _this.$scope.moviesToDownload);
            });
        };
        MovieOverviewController.$inject = ['$scope', 'movies', 'DownloadListRepository'];
        return MovieOverviewController;
    })();
    MovieApp.MovieOverviewController = MovieOverviewController;

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
})(MovieApp || (MovieApp = {}));

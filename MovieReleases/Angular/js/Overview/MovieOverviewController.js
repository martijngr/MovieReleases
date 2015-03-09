var MovieApp;
(function (MovieApp) {
    var MovieOverviewController = (function () {
        function MovieOverviewController($scope, movies, DownloadListService) {
            this.$scope = $scope;
            this.movies = movies;
            this.DownloadListService = DownloadListService;
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }
        MovieOverviewController.prototype.addMovieToDownloadList = function (movie) {
            this.DownloadListService.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        };
        MovieOverviewController.$inject = ['$scope', 'movies', 'DownloadListService'];
        return MovieOverviewController;
    })();
    MovieApp.MovieOverviewController = MovieOverviewController;

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
})(MovieApp || (MovieApp = {}));

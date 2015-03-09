var MovieApp;
(function (MovieApp) {
    var MovieController = (function () {
        function MovieController($scope, movies, MovieService) {
            this.$scope = $scope;
            this.movies = movies;
            this.MovieService = MovieService;
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }
        MovieController.prototype.addMovieToDownloadList = function (movie) {
            this.MovieService.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        };
        MovieController.$inject = ['$scope', 'movies', 'MovieService'];
        return MovieController;
    })();
    MovieApp.MovieController = MovieController;

    app.controller("MovieController", MovieApp.MovieController);
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=MovieController.js.map

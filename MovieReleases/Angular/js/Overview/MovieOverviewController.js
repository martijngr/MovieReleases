var MovieApp;
(function (MovieApp) {
    var MovieOverviewController = (function () {
        function MovieOverviewController($scope, movies, downloadListRepository, moviePosterFactory) {
            this.$scope = $scope;
            this.movies = movies;
            this.downloadListRepository = downloadListRepository;
            this.moviePosterFactory = moviePosterFactory;
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }

            var index = Math.floor((Math.random() * this.$scope.movies.length));
            var movieIndex = Math.floor((Math.random() * this.$scope.movies[index].movies.length));
            var backgroundImdb = this.$scope.movies[index].movies[movieIndex].Imdb;
            this.moviePosterFactory.GetLargeMoviePoster(backgroundImdb).then(function (response) {
                var style = "<style>#overview-background:before{background-image:url(" + response + ")}</style>";
                $("#overview-background").append(style);
            });
        }
        MovieOverviewController.prototype.addMovieToDownloadList = function (movie) {
            this.downloadListRepository.AddMovieToDownloadList(movie);
        };

        MovieOverviewController.prototype.deleteMovieFromDownloadList = function (movie) {
            this.downloadListRepository.DeleteMovieFromDownloadList(movie).then(function () {
                //angular.copy(_.without(this.$scope.moviesToDownload, movie), this.$scope.moviesToDownload);
            });
        };

        MovieOverviewController.prototype.IsMoviePresentInDownloadlist = function (movie) {
            return this.downloadListRepository.IsMovieInDownloadList(movie);
        };
        MovieOverviewController.$inject = ['$scope', 'movies', 'DownloadListRepository', 'moviePosterFactory'];
        return MovieOverviewController;
    })();
    MovieApp.MovieOverviewController = MovieOverviewController;

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
})(MovieApp || (MovieApp = {}));

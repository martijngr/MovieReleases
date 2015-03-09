var MovieApp;
(function (MovieApp) {
    var MovieController = (function () {
        function MovieController($scope, $routeParams, MovieService, movie) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.MovieService = MovieService;
            this.movie = movie;
            //var imdb = $routeParams.imdb;
            //MovieService.GetMovieByImdb(imdb).then(response => {
            this.movieDetails = this.movie;
            //});
        }
        MovieController.$inject = ['$scope', '$routeParams', 'MovieService', 'movie'];
        return MovieController;
    })();
    MovieApp.MovieController = MovieController;

    app.controller("MovieController", MovieApp.MovieController);
})(MovieApp || (MovieApp = {}));

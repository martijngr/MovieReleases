var MovieApp;
(function (MovieApp) {
    var MovieController = (function () {
        function MovieController($scope, $routeParams, MovieService, movie) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.MovieService = MovieService;
            this.movie = movie;
            this.vm = {
                viewtype: {
                    carousel: true,
                    mobile: false,
                }
            };
            if (!_.isString(movie)) {
                this.movieDetails = this.movie;
            }
            else {
                this.vm.viewtype.carousel = false;
                this.vm.viewtype.mobile = false;
                this.showError = true;
            }
        }
        MovieController.$inject = ['$scope', '$routeParams', 'MovieService', 'movie'];
        return MovieController;
    })();
    MovieApp.MovieController = MovieController;
    app.controller("MovieController", MovieApp.MovieController);
})(MovieApp || (MovieApp = {}));
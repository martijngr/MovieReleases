var MovieApp;
(function (MovieApp) {
    function MovieOverview() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                movies: '=',
            },
            templateUrl: "/Partials/Movie/MovieOverview.html",
            link: function (scope, element, attributes) {
            }
        };
    }
    MovieApp.MovieOverview = MovieOverview;
})(MovieApp || (MovieApp = {}));
app.directive("movieOverview", MovieApp.MovieOverview);

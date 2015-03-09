var MovieApp;
(function (MovieApp) {
    function MoviePoster() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@'
            },
            link: function (scope, element, attributes) {
                var x = scope.imdb;
                var img = new Image();

                $.get("https://api.themoviedb.org/3/movie/tt" + scope.imdb + "?api_key=980071c1008d3dd64ab4a0893fe5a727", function (response) {
                    img.src = "http://image.tmdb.org/t/p/w154" + response.poster_path;

                    element.parent().append(img);
                    element.remove();
                });
            }
        };
    }
    MovieApp.MoviePoster = MoviePoster;
})(MovieApp || (MovieApp = {}));

app.directive("moviePoster", MovieApp.MoviePoster);
//angular.module('movieApp').directive("moviePoster", ['MovieService', function (MovieService) {
//    return {
//        restrict: 'E',
//        replace: true,
//        scope: {
//            imdb: '@',
//        },
//        link: function (scope, element, attributes) {
//            var x = scope.imdb;
//            var img = new Image();
//            $.get("https://api.themoviedb.org/3/movie/tt" + scope.imdb + "?api_key=980071c1008d3dd64ab4a0893fe5a727", function (response) {
//                img.src = "http://image.tmdb.org/t/p/w154" + response.poster_path;
//                element.parent().append(img);
//                element.remove();
//            });
//        }
//    }
//}])
//# sourceMappingURL=MoviePoster.js.map

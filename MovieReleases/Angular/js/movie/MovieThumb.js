var MovieApp;
(function (MovieApp) {
    function MovieThumb(moviePosterFactory) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@'
            },
            link: function (scope, element, attributes) {
                var img = new Image();
                moviePosterFactory.GetMovieThumb(scope.imdb).then(function (imageUrl) {
                    img.src = imageUrl;
                    element.parent().append(img);
                    element.remove();
                });
            }
        };
    }
    MovieApp.MovieThumb = MovieThumb;
})(MovieApp || (MovieApp = {}));

MovieApp.MovieThumb.$inject = ['moviePosterFactory'];

app.directive("movieThumb", MovieApp.MovieThumb);

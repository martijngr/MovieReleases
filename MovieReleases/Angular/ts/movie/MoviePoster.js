var MovieApp;
(function (MovieApp) {
    function MoviePoster(moviePosterFactory) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@',
            },
            link: function (scope, element, attributes) {
                if (!scope.imdb)
                    return;
                var img = new Image();
                moviePosterFactory.GetMoviePoster(scope.imdb).then(function (imageUrl) {
                    img.src = imageUrl;
                    img.style.height = "530px";
                    element.parent().append(img);
                    element.remove();
                });
            }
        };
    }
    MovieApp.MoviePoster = MoviePoster;
})(MovieApp || (MovieApp = {}));
MovieApp.MoviePoster.$inject = ['moviePosterFactory'];
app.directive("moviePoster", MovieApp.MoviePoster);
//# sourceMappingURL=MoviePoster.js.map
var MovieApp;
(function (MovieApp) {
    var MoviePosterFactory = (function () {
        function MoviePosterFactory($q) {
            this.$q = $q;
            this.baseUrlMovie = "https://api.themoviedb.org/3/movie/";
            this.baseUrlImage = "http://image.tmdb.org/t/p/w";
            this.apikey = "980071c1008d3dd64ab4a0893fe5a727";
        }
        MoviePosterFactory.prototype.GetMoviePoster = function (imdb) {
            var movieDetailsUrl = this.baseUrlMovie + imdb + "?api_key=" + this.apikey;
            var defer = this.$q.defer();

            $.get(movieDetailsUrl, function (response) {
                var imageUrl = "http://image.tmdb.org/t/p/w500" + response.poster_path;

                defer.resolve(imageUrl);
            });

            return defer.promise;
        };

        MoviePosterFactory.prototype.GetMovieThumb = function (imdb) {
            var movieDetailsUrl = this.baseUrlMovie + imdb + "?api_key=" + this.apikey;
            var defer = this.$q.defer();

            $.get(movieDetailsUrl, function (response) {
                var imageUrl = "http://image.tmdb.org/t/p/w154" + response.poster_path;

                defer.resolve(imageUrl);
            });

            return defer.promise;
        };

        MoviePosterFactory.MoviePosterFactoryCreator = function ($q) {
            return new MoviePosterFactory($q);
        };
        return MoviePosterFactory;
    })();
    MovieApp.MoviePosterFactory = MoviePosterFactory;
})(MovieApp || (MovieApp = {}));
MovieApp.MoviePosterFactory.MoviePosterFactoryCreator.$inject = ['$q'];

app.factory('moviePosterFactory', MovieApp.MoviePosterFactory.MoviePosterFactoryCreator);

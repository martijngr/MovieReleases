module MovieApp {
    export class MoviePosterFactory {
        private baseUrlMovie = "https://api.themoviedb.org/3/movie/";
        private baseUrlImage = "http://image.tmdb.org/t/p/w";
        private apikey = "980071c1008d3dd64ab4a0893fe5a727";

        constructor(private $q : ng.IQService) {

        }

        public GetMoviePoster(imdb: string): ng.IPromise<string> {
            var movieDetailsUrl = this.baseUrlMovie + imdb + "?api_key=" + this.apikey;
            var defer = this.$q.defer();

            $.get(movieDetailsUrl, function (response) {
                var imageUrl = "http://image.tmdb.org/t/p/w500" + response.poster_path;

                defer.resolve(imageUrl);
            });

            return defer.promise;
        }

        //public GetMovieTrailer(imdb: string): ng.IPromise<string> {
        //    var 
        //}

        public GetMovieThumb(imdb: string): ng.IPromise<string> {
            var movieDetailsUrl = this.baseUrlMovie + imdb + "?api_key=" + this.apikey;
            var defer = this.$q.defer();

            $.get(movieDetailsUrl, function (response) {
                var imageUrl = "http://image.tmdb.org/t/p/w154" + response.poster_path;

                defer.resolve(imageUrl);
            });

            return defer.promise;
        }

        public static MoviePosterFactoryCreator($q : ng.IQService) {
            return new MoviePosterFactory($q);
        }
    }
} 
MovieApp.MoviePosterFactory.MoviePosterFactoryCreator.$inject = ['$q'];

app.factory('moviePosterFactory', MovieApp.MoviePosterFactory.MoviePosterFactoryCreator);
module MovieApp {
    export class MovieService {
        public static $inject = ['$http', '$q', '$window', '$location'];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $window: ng.IWindowService, private $location : ng.ILocationService) {

        }

        public ClearSessionStorage() {
            sessionStorage.clear();
        }

        public GetMovieByImdb = function (imdb: string) {
            return this.HandleGetRequest("api/Movie/GetByImdb?imdb=" + imdb).then(function (response) {
                return response;
            }, function (rejection) {
                return rejection.data; // this will contain the error message.  
            });
        }

        public SearchMovie = function (movieName: string) {
            return this.HandleGetRequest("api/Movie/search?movieName=" + movieName).then(function (response) {
                return response;
            });
        }

        public GetMoviesForRent = function () {
            var defer = this.$q.defer();
            var movies = this.$window.sessionStorage.getItem('movies');

            if (movies) {
                var data = angular.fromJson(movies);
                defer.resolve(data);
            }
            else {
                this.HandleGetRequest("/api/Rent").then(function (response) {
                    var data = angular.toJson(response);
                    sessionStorage.setItem('movies', data);

                    defer.resolve(response);
                })
            }

            return defer.promise;
        }

        public GetMoviesInCinema = function () {
            var defer = this.$q.defer();
            var movies = sessionStorage.getItem('cinemaMovies');

            if (movies) {
                var data = angular.fromJson(movies);
                defer.resolve(data);
            }
            else {
                this.HandleGetRequest("api/Cinema").then(function (response) {
                    var data = angular.toJson(response);
                    sessionStorage.setItem('cinemaMovies', data);

                    defer.resolve(response);
                })
            }

            return defer.promise;
        }

        public GetMoviesSoonInCinema = function () {
            var defer = this.$q.defer();
            var movies;// = sessionStorage.getItem('soonInCinemaMovies');

            if (movies) {
                var data = angular.fromJson(movies);
                defer.resolve(data);
            }
            else {
                this.HandleGetRequest("api/SoonInCinema").then(function (response) {
                    var data = angular.toJson(response);
                    sessionStorage.setItem('soonInCinemaMovies', data);

                    defer.resolve(response);
                })
            }

            return defer.promise;
        }

        public GetMoviePoster = function (imdbId) {
            return this.$http.get("https://api.themoviedb.org/3/movie/tt" + imdbId + "?api_key=980071c1008d3dd64ab4a0893fe5a727").then(function (response) {
                return response.data;
            });
        }

        public getMovieById = function (providerId: string) {
            return this.$http.get("api/Movie/GetById?id="+providerId).then(function (response) {
                return response.data;
            });
        }

        public shareMovieWithFriend = function (email: string, message: string) {
            var data = {
                Email: email,
                Message: message
            };
            return this.$http.post("api/Movie/ShareMovieWithFriend", data);
        };

        private HandleGetRequest(path: string): any {
            return this.$http.get(path).then(function (response) {
                return response.data;
            });
        }
    }
}

app.service("MovieService", MovieApp.MovieService);
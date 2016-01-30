var MovieApp;
(function (MovieApp) {
    var MovieService = (function () {
        function MovieService($http, $q, $window, $location) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.$location = $location;
            this.GetMovieByImdb = function (imdb) {
                return this.HandleGetRequest("api/Movie/GetByImdb?imdb=" + imdb).then(function (response) {
                    return response;
                }, function (rejection) {
                    return rejection.data; // this will contain the error message
                });
            };
            this.SearchMovie = function (movieName) {
                return this.HandleGetRequest("api/Movie/search?movieName=" + movieName).then(function (response) {
                    return response;
                });
            };
            this.GetMoviesForRent = function () {
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
                    });
                }
                return defer.promise;
            };
            this.GetMoviesInCinema = function () {
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
                    });
                }
                return defer.promise;
            };
            this.GetMoviesSoonInCinema = function () {
                var defer = this.$q.defer();
                var movies; // = sessionStorage.getItem('soonInCinemaMovies');
                if (movies) {
                    var data = angular.fromJson(movies);
                    defer.resolve(data);
                }
                else {
                    this.HandleGetRequest("api/SoonInCinema").then(function (response) {
                        var data = angular.toJson(response);
                        sessionStorage.setItem('soonInCinemaMovies', data);
                        defer.resolve(response);
                    });
                }
                return defer.promise;
            };
            this.GetMoviePoster = function (imdbId) {
                return this.$http.get("https://api.themoviedb.org/3/movie/tt" + imdbId + "?api_key=980071c1008d3dd64ab4a0893fe5a727").then(function (response) {
                    return response.data;
                });
            };
            this.getMovieById = function (providerId) {
                return this.$http.get("api/Movie/GetById?id=" + providerId).then(function (response) {
                    return response.data;
                });
            };
            this.shareMovieWithFriend = function (email, message, sendby, movie) {
                var data = {
                    Email: email,
                    Message: message,
                    Movie: movie,
                    SendBy: sendby
                };
                return this.$http.post("api/Movie/ShareMovieWithFriend", data);
            };
        }
        MovieService.prototype.ClearSessionStorage = function () {
            sessionStorage.clear();
        };
        MovieService.prototype.HandleGetRequest = function (path) {
            return this.$http.get(path).then(function (response) {
                return response.data;
            });
        };
        MovieService.$inject = ['$http', '$q', '$window', '$location'];
        return MovieService;
    })();
    MovieApp.MovieService = MovieService;
})(MovieApp || (MovieApp = {}));
app.service("MovieService", MovieApp.MovieService);

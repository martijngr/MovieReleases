var MovieApp;
(function (MovieApp) {
    var MovieService = (function () {
        function MovieService($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.DeleteMovieFromDownloadList = function (movie) {
                return this.$http.delete("/api/MoviesApi/DeleteMovieFromDownloadList?imdbId=" + movie.ImdbId).then(function (response) {
                    return response;
                });
            };
            this.GetMoviesForRent = function () {
                //var item = {'2014-04-27': [{MovieMeterId: 83495,
                //    Title: 'Samsara',
                //    Thumbnail: "",
                //    ImdbId: "0770802"}]};
                //var items = [item];
                //return item;
                var defer = this.$q.defer();
                var movies = this.$window.sessionStorage.getItem('movies');

                if (movies) {
                    var data = angular.fromJson(movies);
                    defer.resolve(data);
                } else {
                    this.HandleGetRequest("GetMoviesOutOnDvd").then(function (response) {
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
                } else {
                    this.HandleGetRequest("GetMoviesInCinema").then(function (response) {
                        var data = angular.toJson(response);
                        sessionStorage.setItem('cinemaMovies', data);

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
            this.GetMoviesToDownload = function () {
                return this.HandleGetRequest("GetMoviesToDownload");
            };
        }
        MovieService.prototype.AddMovieToDownloadList = function (movie) {
            return this.HandlePostRequest("AddMovieToDownloadList", movie);
        };

        MovieService.prototype.ClearSessionStorage = function () {
            sessionStorage.clear();
        };

        MovieService.prototype.HandleGetRequest = function (action, data) {
            return this.$http.get("/api/MoviesApi/" + action, data).then(function (response) {
                return response.data;
            });
        };

        MovieService.prototype.HandlePostRequest = function (action, data) {
            return this.$http.post("/api/MoviesApi/" + action, data).then(function (response) {
                return response.data;
            });
        };
        MovieService.$inject = ['$http', '$q', '$window'];
        return MovieService;
    })();
    MovieApp.MovieService = MovieService;
})(MovieApp || (MovieApp = {}));

app.service("MovieService", MovieApp.MovieService);
//angular.module('movieapp').service("movieservice", ['$http', '$q', function ($http, $q) {
//    this.addmovietodownloadlist = function (movie) {
//        return handlepostrequest("addmovietodownloadlist", movie);
//    }
//    this.clearsessionstorage = function () {
//        sessionstorage.clear();
//    }
//    this.deletemoviefromdownloadlist = function (movie) {
//        return $http.delete("/api/moviesapi/deletemoviefromdownloadlist?imdbid=" + movie.imdbid).then(function (response) {
//            return response;
//        });
//    }
//    this.getmoviesforrent = function () {
//        //var item = {'2014-04-27': [{moviemeterid: 83495,
//        //    title: 'samsara',
//        //    thumbnail: "",
//        //    imdbid: "0770802"}]};
//        //var items = [item];
//        //return item;
//        var defer = $q.defer();
//        var movies = sessionstorage.getitem('movies');
//        if (movies) {
//            var data = angular.fromjson(movies);
//            defer.resolve(data);
//        }
//        else {
//            handlegetrequest("getmoviesoutondvd").then(function (response) {
//                var data = angular.tojson(response);
//                sessionstorage.setitem('movies', data);
//                defer.resolve(response);
//            })
//        }
//        return defer.promise;
//    }
//    this.getmoviesincinema = function () {
//        var defer = $q.defer();
//        var movies = sessionstorage.getitem('cinemamovies');
//        if (movies) {
//            var data = angular.fromjson(movies);
//            defer.resolve(data);
//        }
//        else {
//            handlegetrequest("getmoviesincinema").then(function (response) {
//                var data = angular.tojson(response);
//                sessionstorage.setitem('cinemamovies', data);
//                defer.resolve(response);
//            })
//        }
//        return defer.promise;
//    }
//    this.getmovieposter = function (imdbid) {
//        return $http.get("https://api.themoviedb.org/3/movie/tt" + imdbid + "?api_key=980071c1008d3dd64ab4a0893fe5a727").then(function (response) {
//            return response.data;
//        });
//    }
//    this.getmoviestodownload = function () {
//        return handlegetrequest("getmoviestodownload");
//    }
//    function handlegetrequest(action, data) {
//        return $http.get("/api/moviesapi/" + action, data).then(function (response) {
//            return response.data;
//        });
//    }
//    function handlepostrequest(action, data) {
//        return $http.post("/api/moviesapi/" + action, data).then(function (response) {
//            return response.data;
//        });
//    }
//}]);
//# sourceMappingURL=MovieService.js.map

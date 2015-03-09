var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, MovieService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.MovieService = MovieService;
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });

            MovieService.GetMoviesToDownload().then(function (response) {
                _this.$scope.moviesToDownload = response;
            });
        }
        HomeController.prototype.setActiveUrlPart = function () {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
        };

        Object.defineProperty(HomeController.prototype, "moviesToDownload", {
            get: function () {
                return this.$scope.moviesToDownload;
            },
            enumerable: true,
            configurable: true
        });

        HomeController.prototype.markMovieAsDownloaded = function (movie) {
            movie.Downloaded = true;
        };

        HomeController.prototype.deleteMovieFromDownloadList = function (movie) {
            var _this = this;
            this.MovieService.DeleteMovieFromDownloadList(movie).then(function () {
                _this.$scope.moviesToDownload = _.without(_this.$scope.moviesToDownload, movie);
            });
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            'MovieService'
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));

app.controller("HomeController", MovieApp.HomeController);
//# sourceMappingURL=HomeController.js.map

/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts"/>
/// <reference path="../../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var app = angular.module('movieApp', ['ngRoute']);
//# sourceMappingURL=app.js.map

app.config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider.when('/Cinema', {
            templateUrl: '/Home/Cinema',
            controller: 'MovieController',
            resolve: {
                movies: [
                    'MovieService', function (MovieService) {
                        return MovieService.GetMoviesInCinema();
                    }]
            }
        }).when('/Rent', {
            templateUrl: '/Home/Rent',
            controller: 'MovieController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: [
                    'MovieService', function (MovieService) {
                        return MovieService.GetMoviesForRent();
                    }]
            }
        }).when('/Tv', {
            templateUrl: '/Home/TV',
            controller: 'MovieController'
        }).otherwise({
            redirectTo: '/Rent'
        });
    }]);
//# sourceMappingURL=routings.js.map

var MovieApp;
(function (MovieApp) {
    var Movie = (function () {
        function Movie() {
        }
        Object.defineProperty(Movie.prototype, "MovieMeterId", {
            get: function () {
                return this._movieMeterId;
            },
            set: function (movieMeterId) {
                this._movieMeterId = movieMeterId;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "Url", {
            get: function () {
                return this._url;
            },
            set: function (url) {
                this._url = url;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "Title", {
            get: function () {
                return this._title;
            },
            set: function (title) {
                this._title = title;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "Year", {
            get: function () {
                return this._year;
            },
            set: function (year) {
                this._year = year;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "Thumbnail", {
            get: function () {
                return this._thumbnail;
            },
            set: function (thumbnail) {
                this._thumbnail = thumbnail;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "ImdbId", {
            get: function () {
                return this._imdbId;
            },
            set: function (imdbId) {
                this._imdbId = imdbId;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "Plot", {
            get: function () {
                return this._plot;
            },
            set: function (plot) {
                this._plot = plot;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "Duration", {
            get: function () {
                return this._duration;
            },
            set: function (duration) {
                this._duration = duration;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Movie.prototype, "Downloaded", {
            get: function () {
                return this._downloaded;
            },
            set: function (downloaded) {
                this._downloaded = downloaded;
            },
            enumerable: true,
            configurable: true
        });

        return Movie;
    })();
    MovieApp.Movie = Movie;
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=Movie.js.map

var MovieApp;
(function (MovieApp) {
    var MovieController = (function () {
        function MovieController($scope, movies, MovieService) {
            this.$scope = $scope;
            this.movies = movies;
            this.MovieService = MovieService;
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }
        MovieController.prototype.addMovieToDownloadList = function (movie) {
            this.MovieService.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        };
        MovieController.$inject = ['$scope', 'movies', 'MovieService'];
        return MovieController;
    })();
    MovieApp.MovieController = MovieController;

    app.controller("MovieController", MovieApp.MovieController);
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=MovieController.js.map

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

var MovieApp;
(function (MovieApp) {
    function MovieTooltip($compile) {
        return {
            restrict: 'A',
            compile: function (element, attributes) {
                element.attr('ng-mouseover', 'showHover($event, y)');
                element.attr('ng-mouseleave', 'hideHover()');
                element.removeAttr("movie-tooltip");
                return {
                    post: function (scope, iElement, attributes) {
                        $compile(iElement)(scope);

                        scope.showHover = function ($event, movie) {
                            scope.movie = movie;
                            showTooltip($event.pageY, $event.pageX);
                        };

                        scope.hideHover = function () {
                            angular.element("#movieTooltip").remove();
                        };

                        function showTooltip(top, left) {
                            angular.element("#movieTooltip").remove();
                            var xPos = 400 + left;

                            if (xPos >= window.innerWidth) {
                                left = left - 400;
                            }

                            var template = '<div class="movie-tooltip" id="movieTooltip" style="top:' + top + 'px; left:' + left + 'px;">' + '<div style="font-size:0.8em;float:right;">Duur: {{movie.Duration}}min.</div>' + '<b>{{movie.Title}}</b><br/>{{movie.Plot}}' + '</div>';

                            var htmlCompiled = $compile(template)(scope);
                            angular.element('body').append($(htmlCompiled));
                        }
                    }
                };
            }
        };
    }
    MovieApp.MovieTooltip = MovieTooltip;

    MovieTooltip.$inject = ['$compile'];
})(MovieApp || (MovieApp = {}));

app.directive("movieTooltip", MovieApp.MovieTooltip);
//angular.module('movieApp').directive("movieTooltip", ['$compile', function ($compile) {
//    return {
//        restrict: 'A',
//        compile: function (element, attributes) {
//            element.attr('ng-mouseover', 'showHover($event, y)');
//            element.attr('ng-mouseleave', 'hideHover()');
//            element.removeAttr("movie-tooltip");
//            return {
//                post: function (scope, iElement, attributes) {
//                    $compile(iElement)(scope);
//                    scope.showHover = function ($event, movie) {
//                        scope.movie = movie;
//                        showTooltip($event.pageY, $event.pageX);
//                    }
//                    scope.hideHover = function () {
//                        angular.element("#movieTooltip").remove();
//                    }
//                    function showTooltip(top, left) {
//                        angular.element("#movieTooltip").remove();
//                        var xPos = 400 + left;
//                        if (xPos >= window.innerWidth) {
//                            left = left - 400;
//                        }
//                        var template =
//                            '<div class="movie-tooltip" id="movieTooltip" style="top:' + top + 'px; left:' + left + 'px;">' +
//                            '<div style="font-size:0.8em;float:right;">Duur: {{movie.Duration}}min.</div>' +
//                            '<b>{{movie.Title}}</b><br/>{{movie.Plot}}' +
//                            '</div>';
//                        var htmlCompiled = $compile(template)(scope);
//                        angular.element('body').append($(htmlCompiled));
//                    }
//                }
//            }
//        }
//    }
//}]);
//# sourceMappingURL=MovieToolTip.js.map

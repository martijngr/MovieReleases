/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts"/>
/// <reference path="../../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var app = angular.module('movieApp', ['ngRoute']);

var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, downloadListService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.downloadListService = downloadListService;
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });

            downloadListService.GetMoviesToDownload().then(function (response) {
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
            this.downloadListService.DeleteMovieFromDownloadList(movie).then(function () {
                _this.$scope.moviesToDownload = _.without(_this.$scope.moviesToDownload, movie);
            });
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            'DownloadListService'
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));

app.controller("HomeController", MovieApp.HomeController);

app.config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider.when('/Cinema', {
            templateUrl: '/Home/Cinema',
            controller: 'MovieOverviewController',
            resolve: {
                movies: [
                    'MovieService', function (MovieService) {
                        return MovieService.GetMoviesInCinema();
                    }]
            }
        }).when('/SoonInCinema', {
            templateUrl: '/Home/Cinema',
            controller: 'MovieOverviewController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: [
                    'MovieService', function (MovieService) {
                        return MovieService.GetMoviesSoonInCinema();
                    }]
            }
        }).when('/Rent', {
            templateUrl: '/Home/Rent',
            controller: 'MovieOverviewController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: [
                    'MovieService', function (MovieService) {
                        return MovieService.GetMoviesForRent();
                    }]
            }
        }).when('/Movie/:imdb', {
            templateUrl: '/Partials/Movie/Details.html',
            controller: 'MovieController',
            controllerAs: 'movieCtrl',
            resolve: {
                movie: [
                    '$route', 'MovieService', function ($route, MovieService) {
                        return MovieService.GetMovieByImdb($route.current.params.imdb);
                    }]
            }
        }).otherwise({
            redirectTo: '/Rent'
        });
    }]);

var MovieApp;
(function (MovieApp) {
    var DownloadListService = (function () {
        function DownloadListService($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.GetMoviesToDownload = function () {
                return this.$http.get("/api/DownloadList/").then(function (response) {
                    return response.data;
                });
            };
            this.DeleteMovieFromDownloadList = function (movie) {
                return this.$http.delete("/api/DownloadList/" + movie.ImdbId).then(function (response) {
                    return response;
                });
            };
        }
        DownloadListService.prototype.AddMovieToDownloadList = function (movie) {
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                return response.data;
            });
        };
        DownloadListService.$inject = ['$http', '$q', '$window'];
        return DownloadListService;
    })();
    MovieApp.DownloadListService = DownloadListService;
})(MovieApp || (MovieApp = {}));

app.service("DownloadListService", MovieApp.DownloadListService);

var MovieApp;
(function (MovieApp) {
    var SignalRInterceptor = (function () {
        function SignalRInterceptor() {
        }
        return SignalRInterceptor;
    })();
    MovieApp.SignalRInterceptor = SignalRInterceptor;
})(MovieApp || (MovieApp = {}));

var MovieApp;
(function (MovieApp) {
    var MovieOverviewController = (function () {
        function MovieOverviewController($scope, movies, DownloadListService) {
            this.$scope = $scope;
            this.movies = movies;
            this.DownloadListService = DownloadListService;
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }
        MovieOverviewController.prototype.addMovieToDownloadList = function (movie) {
            this.DownloadListService.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        };
        MovieOverviewController.$inject = ['$scope', 'movies', 'DownloadListService'];
        return MovieOverviewController;
    })();
    MovieApp.MovieOverviewController = MovieOverviewController;

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
})(MovieApp || (MovieApp = {}));

var MovieApp;
(function (MovieApp) {
    var Movie = (function () {
        function Movie() {
        }
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

var MovieApp;
(function (MovieApp) {
    var MovieController = (function () {
        function MovieController($scope, $routeParams, MovieService, movie) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.MovieService = MovieService;
            this.movie = movie;
            //var imdb = $routeParams.imdb;
            //MovieService.GetMovieByImdb(imdb).then(response => {
            this.movieDetails = this.movie;
            //});
        }
        MovieController.$inject = ['$scope', '$routeParams', 'MovieService', 'movie'];
        return MovieController;
    })();
    MovieApp.MovieController = MovieController;

    app.controller("MovieController", MovieApp.MovieController);
})(MovieApp || (MovieApp = {}));

var MovieApp;
(function (MovieApp) {
    function MoviePoster(moviePosterFactory) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@'
            },
            link: function (scope, element, attributes) {
                var img = new Image();

                moviePosterFactory.GetMoviePoster(scope.imdb).then(function (imageUrl) {
                    img.src = imageUrl;
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

var MovieApp;
(function (MovieApp) {
    var MovieService = (function () {
        function MovieService($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.GetMovieByImdb = function (imdb) {
                return this.HandleGetRequest("api/Movie?movieMeterId=" + imdb).then(function (response) {
                    return response;
                });
            };
            this.GetMoviesForRent = function () {
                var defer = this.$q.defer();
                var movies = this.$window.sessionStorage.getItem('movies');

                if (movies) {
                    var data = angular.fromJson(movies);
                    defer.resolve(data);
                } else {
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
                } else {
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
                var movies;

                if (movies) {
                    var data = angular.fromJson(movies);
                    defer.resolve(data);
                } else {
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
        }
        MovieService.prototype.ClearSessionStorage = function () {
            sessionStorage.clear();
        };

        MovieService.prototype.HandleGetRequest = function (path) {
            return this.$http.get(path).then(function (response) {
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
                console.log("thumb...");
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

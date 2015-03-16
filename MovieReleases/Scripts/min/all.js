/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts"/>
/// <reference path="../../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/toastr/toastr.d.ts" />
var app = angular.module('movieApp', ['ngRoute']);

app.run([
    '$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
        $http.get("/Home/StartNotificationService");

        $rootScope.$on('$routeChangeStart', function () {
            $("#page-loader").show();
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $("#page-loader").hide();
            });
        });
    }]);

var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, downloadListRepository) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.downloadListRepository = downloadListRepository;
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });

            $scope.movieTypeFilter = 3;

            downloadListRepository.GetMoviesToDownload().then(function (response) {
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
        HomeController.$inject = [
            '$scope',
            '$location',
            'DownloadListRepository'
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));

app.controller("HomeController", MovieApp.HomeController);

app.config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider.when('/Cinema', {
            templateUrl: '/Partials/Movie/MovieOverview.html',
            controller: 'MovieOverviewController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: [
                    'MovieService', function (MovieService) {
                        return MovieService.GetMoviesInCinema();
                    }]
            }
        }).when('/SoonInCinema', {
            templateUrl: '/Partials/Movie/MovieOverview.html',
            controller: 'MovieOverviewController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: [
                    'MovieService', function (MovieService) {
                        return MovieService.GetMoviesSoonInCinema();
                    }]
            }
        }).when('/Rent', {
            templateUrl: '/Partials/Movie/MovieOverview.html',
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
    var DownloadListRepository = (function () {
        function DownloadListRepository($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.GetMoviesToDownload = function () {
                return this.$http.get("/api/DownloadList/").then(function (response) {
                    return response.data;
                });
            };
            this.DeleteMovieFromDownloadList = function (movie) {
                return this.$http.delete("/api/DownloadList/" + movie.Imdb).then(function (response) {
                    return response;
                });
            };
        }
        DownloadListRepository.prototype.AddMovieToDownloadList = function (movie) {
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                return response.data;
            });
        };
        DownloadListRepository.$inject = ['$http', '$q', '$window'];
        return DownloadListRepository;
    })();
    MovieApp.DownloadListRepository = DownloadListRepository;
})(MovieApp || (MovieApp = {}));

app.service("DownloadListRepository", MovieApp.DownloadListRepository);

var MovieApp;
(function (MovieApp) {
    var DownloadListService = (function () {
        function DownloadListService() {
        }
        DownloadListService.prototype.AddMovieToDownloadList = function (movie) {
        };
        return DownloadListService;
    })();
    MovieApp.DownloadListService = DownloadListService;
})(MovieApp || (MovieApp = {}));

app.service("DownloadListService", MovieApp.DownloadListService);

var MovieApp;
(function (MovieApp) {
    var MovieBase = (function () {
        function MovieBase() {
        }
        Object.defineProperty(MovieBase.prototype, "Title", {
            get: function () {
                return this._title;
            },
            set: function (title) {
                this._title = title;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(MovieBase.prototype, "MovieType", {
            get: function () {
                return this._movieType;
            },
            set: function (movieType) {
                this._movieType = movieType;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(MovieBase.prototype, "Imdb", {
            get: function () {
                return this._imdb;
            },
            set: function (imdb) {
                this._imdb = imdb;
            },
            enumerable: true,
            configurable: true
        });
        return MovieBase;
    })();
    MovieApp.MovieBase = MovieBase;
})(MovieApp || (MovieApp = {}));

var MovieApp;
(function (MovieApp) {
    var MovieToFollow = (function () {
        function MovieToFollow() {
        }
        Object.defineProperty(MovieToFollow.prototype, "Title", {
            get: function () {
                return this._title;
            },
            set: function (title) {
                this._title = title;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(MovieToFollow.prototype, "MovieType", {
            get: function () {
                return this._movieType;
            },
            set: function (movieType) {
                this._movieType = movieType;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(MovieToFollow.prototype, "Imdb", {
            get: function () {
                return this._imdb;
            },
            set: function (imdb) {
                this._imdb = imdb;
            },
            enumerable: true,
            configurable: true
        });
        return MovieToFollow;
    })();
    MovieApp.MovieToFollow = MovieToFollow;
})(MovieApp || (MovieApp = {}));

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
    function MovieOverview() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                movies: '='
            },
            templateUrl: "/Partials/Movie/MovieOverview.html",
            link: function (scope, element, attributes) {
            }
        };
    }
    MovieApp.MovieOverview = MovieOverview;
})(MovieApp || (MovieApp = {}));

app.directive("movieOverview", MovieApp.MovieOverview);

var MovieApp;
(function (MovieApp) {
    var MovieOverviewController = (function () {
        function MovieOverviewController($scope, movies, downloadListRepository) {
            this.$scope = $scope;
            this.movies = movies;
            this.downloadListRepository = downloadListRepository;
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }
        MovieOverviewController.prototype.addMovieToDownloadList = function (movie) {
            movie.InDownloadList = true;
            this.downloadListRepository.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        };

        MovieOverviewController.prototype.deleteMovieFromDownloadList = function (movie) {
            var _this = this;
            this.downloadListRepository.DeleteMovieFromDownloadList(movie).then(function () {
                movie.InDownloadList = false;
                angular.copy(_.without(_this.$scope.moviesToDownload, movie), _this.$scope.moviesToDownload);
            });
        };
        MovieOverviewController.$inject = ['$scope', 'movies', 'DownloadListRepository'];
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

        Object.defineProperty(Movie.prototype, "MovieType", {
            get: function () {
                return this._movieType;
            },
            set: function (movieType) {
                this._movieType = movieType;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Movie.prototype, "Imdb", {
            get: function () {
                return this._imdb;
            },
            set: function (imdb) {
                this._imdb = imdb;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Movie.prototype, "InDownloadList", {
            get: function () {
                return this._inDownloadList;
            },
            set: function (inDownloadList) {
                this._inDownloadList = inDownloadList;
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
            this.movieDetails = this.movie;
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

        //public GetMovieTrailer(imdb: string): ng.IPromise<string> {
        //    var
        //}
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

var MovieApp;
(function (MovieApp) {
    function MovieTrailer() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                url: '@'
            },
            link: function (scope, element, attributes) {
                var iframe = document.createElement("IFRAME");

                iframe.src = scope.url;
                iframe.width = "680px";
                iframe.height = "383px";
                iframe.frameBorder = "0";
                iframe.scrolling = "false";

                element.parent().append(iframe);
                element.remove();
            }
        };
    }
    MovieApp.MovieTrailer = MovieTrailer;
})(MovieApp || (MovieApp = {}));

app.directive("movieTrailer", MovieApp.MovieTrailer);

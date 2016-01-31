/// <reference path="../../../scripts/typings/angular/angularjs-1.2-d.ts" />
/// <reference path="../../../scripts/typings/angular/angularjs-route-1.2-d.ts" />
/// <reference path="../../../scripts/typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../../scripts/typings/jqueryui/jqueryui.d.ts" />
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
var app = angular.module('movieApp', ['ngRoute']);
app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);
app.run(['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
        $.ajax({
            async: false,
            url: '/Home/GetStartupData',
            success: function (response) {
                $rootScope.userId = response.userId;
                $rootScope.username = response.username;
                $rootScope.friends = response.friends;
            },
        });
        $rootScope.$on('$routeChangeStart', function () {
            $("#page-loader").show();
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $("#page-loader").hide();
            });
            hideMobileMenu();
        });
    }]);
function hideMobileMenu() {
    // check if window is small enough so dropdown is created
    jQuery(".navbar-collapse").removeClass("in").addClass("collapse");
}
//# sourceMappingURL=app.js.map
app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.
            when('/Cinema', {
            templateUrl: '/Partials/Movie/MovieOverview.html',
            controller: 'MovieOverviewController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: ['MovieService', function (MovieService) {
                        return MovieService.GetMoviesInCinema();
                    }]
            }
        }).
            when('/SoonInCinema', {
            templateUrl: '/Partials/Movie/MovieOverview.html',
            controller: 'MovieOverviewController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: ['MovieService', function (MovieService) {
                        return MovieService.GetMoviesSoonInCinema();
                    }]
            }
        }).
            when('/Rent', {
            templateUrl: '/Partials/Movie/MovieOverview.html',
            controller: 'MovieOverviewController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: ['MovieService', function (MovieService) {
                        return MovieService.GetMoviesForRent();
                    }]
            }
        }).
            when('/Movie/:imdb', {
            templateUrl: '/Partials/Movie/Movie-Details.html',
            controller: 'MovieController',
            controllerAs: 'movieCtrl',
            resolve: {
                movie: ['$route', 'MovieService', function ($route, MovieService) {
                        return MovieService.GetMovieByImdb($route.current.params.imdb);
                    }]
            },
        }).
            when('/Movie/Search/:movieName', {
            templateUrl: '/Partials/Movie/SearchResults.html',
            controller: 'MovieSearchController',
            controllerAs: 'movieCtrl',
            resolve: {
                movies: ['$route', 'MovieService', function ($route, MovieService) {
                        return MovieService.SearchMovie($route.current.params.movieName);
                    }]
            },
        }).
            when('/Friends', {
            templateUrl: '/Partials/Friends/Index.html',
            controller: 'FriendsController',
            controllerAs: 'friendsCtrl',
        }).
            otherwise({
            redirectTo: '/Rent'
        });
    }]);
//# sourceMappingURL=routings.js.map
var MovieApp;
(function (MovieApp) {
    var DownloadListRepository = (function () {
        function DownloadListRepository($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.MarkMovieAsWatched = function (watchListItem) {
                this.$http.put('/api/DownloadList/MarkMovieAsWatched/', watchListItem);
            };
            this.GetMoviesToDownload = function () {
                var _this = this;
                return this.$http.get("/api/DownloadList/").then(function (response) {
                    _this.watchlist = response.data;
                    return _this.watchlist;
                });
            };
            this.watchlist = new Array();
        }
        DownloadListRepository.prototype.AddMovieToDownloadList = function (movie) {
            var _this = this;
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                _this.watchlist.push(response.data);
            });
        };
        DownloadListRepository.prototype.deleteFromDownloadListByMovie = function (movie) {
            var watchlistItem = this.GetWatchlistItemByMovieId(movie.Id);
            this.deleteFromDownloadListByWatchlist(watchlistItem);
        };
        DownloadListRepository.prototype.deleteFromDownloadListByWatchlist = function (watchlistItem) {
            var _this = this;
            return this.$http.delete("/api/DownloadList/" + watchlistItem.Id).then(function (response) {
                angular.copy(_.without(_this.watchlist, watchlistItem), _this.watchlist);
            });
        };
        DownloadListRepository.prototype.IsMovieInDownloadList = function (movie) {
            var enlistedMovie = _.filter(this.watchlist, function (item) {
                return item.Movie.Imdb == movie.Imdb;
            });
            return enlistedMovie.length > 0;
        };
        DownloadListRepository.prototype.GetWatchlistItemByMovieId = function (movieId) {
            var enlistedMovie = _.filter(this.watchlist, function (item) {
                return item.Movie.Id == movieId;
            });
            return enlistedMovie && enlistedMovie.length > 0 ? _.first(enlistedMovie) : null;
        };
        DownloadListRepository.$inject = ['$http', '$q', '$window'];
        return DownloadListRepository;
    })();
    MovieApp.DownloadListRepository = DownloadListRepository;
})(MovieApp || (MovieApp = {}));
app.service("DownloadListRepository", MovieApp.DownloadListRepository);
//# sourceMappingURL=DownloadListRepository.js.map
var MovieApp;
(function (MovieApp) {
    function Draggable($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                // this gives us the native JS object
                var el = element[0];
                el.draggable = true;
                el.addEventListener('dragstart', function (e) {
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('Text', attributes.draggable);
                    this.classList.add('drag');
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast("onDragStart", "");
                    });
                    return false;
                }, false);
                el.addEventListener('dragend', function (e) {
                    this.classList.remove('drag');
                    return false;
                }, false);
            }
        };
    }
    MovieApp.Draggable = Draggable;
})(MovieApp || (MovieApp = {}));
app.directive("draggable", MovieApp.Draggable);
//# sourceMappingURL=draggable.js.map
var MovieApp;
(function (MovieApp) {
    function Droppable($rootScope) {
        return {
            scope: {},
            link: function (scope, element) {
                // again we need the native object
                var el = element[0];
                el.addEventListener('dragover', function (e) {
                    e.dataTransfer.dropEffect = 'copy';
                    // allows us to drop
                    if (e.preventDefault)
                        e.preventDefault();
                    this.classList.add('over');
                    return false;
                }, false);
                el.addEventListener('dragenter', function (e) {
                    this.classList.add('over');
                    return false;
                }, false);
                el.addEventListener('dragleave', function (e) {
                    this.classList.remove('over');
                    return false;
                }, false);
                el.addEventListener('drop', function (e) {
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation)
                        e.stopPropagation();
                    this.classList.remove('over');
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('onDragDrop', e.dataTransfer.getData('Text'));
                    });
                    //var item = document.getElementById(e.dataTransfer.getData('Text'));
                    //this.appendChild(item);
                    return false;
                }, false);
            }
        };
    }
    MovieApp.Droppable = Droppable;
})(MovieApp || (MovieApp = {}));
app.directive("droppable", MovieApp.Droppable);
//# sourceMappingURL=droppable.js.map
var MovieApp;
(function (MovieApp) {
    var FriendsController = (function () {
        function FriendsController($scope, $routeParams, FriendsService, movie) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.FriendsService = FriendsService;
            this.movie = movie;
            this.friends = $scope.friends;
            //var x = $scope.friends;
        }
        FriendsController.prototype.showFriendDetails = function (friend) {
            var _this = this;
            this.selectedFriend = friend;
            this.FriendsService.GetFriendById(friend.UserId).then(function (response) {
                _this.selectedFriend = response;
            });
        };
        FriendsController.$inject = ['$scope', '$routeParams', 'FriendsService'];
        return FriendsController;
    })();
    MovieApp.FriendsController = FriendsController;
    app.controller("FriendsController", MovieApp.FriendsController);
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=FriendsController.js.map
var MovieApp;
(function (MovieApp) {
    var FriendsService = (function () {
        function FriendsService($http, $q, $location) {
            this.$http = $http;
            this.$q = $q;
            this.$location = $location;
            this.GetFriendById = function (id) {
                return this.$http.get("/api/Friends/" + id).then(this.requestSucceeded);
            };
        }
        FriendsService.prototype.requestSucceeded = function (response) {
            return response.data;
        };
        FriendsService.$inject = ['$http', '$q', '$location'];
        return FriendsService;
    })();
    MovieApp.FriendsService = FriendsService;
})(MovieApp || (MovieApp = {}));
app.service("FriendsService", MovieApp.FriendsService);
//# sourceMappingURL=FriendsService.js.map
var MovieApp;
(function (MovieApp) {
    var Friend = (function () {
        function Friend() {
        }
        Object.defineProperty(Friend.prototype, "UserId", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Friend.prototype, "Username", {
            get: function () {
                return this._username;
            },
            set: function (username) {
                this._username = username;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Friend.prototype, "List", {
            get: function () {
                return this._list;
            },
            set: function (list) {
                this._list = list;
            },
            enumerable: true,
            configurable: true
        });
        return Friend;
    })();
    MovieApp.Friend = Friend;
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=User.js.map
var MovieApp;
(function (MovieApp) {
    var HomeController = (function () {
        function HomeController($scope, $location, downloadListRepository) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.downloadListRepository = downloadListRepository;
            this.search = {
                movieName: "",
            };
            this.$scope.$on('$locationChangeSuccess', function (event) {
                _this.setActiveUrlPart();
            });
            $scope.movieTypeFilter = 3;
            downloadListRepository.GetMoviesToDownload().then(function (response) {
                _this.$scope.moviesToDownload = response;
            });
            $scope.$on("onDragStart", function (event, data) {
                _this.dragPending = true;
            });
            $scope.$on("onDragDrop", function (event, data) {
                var movie = angular.fromJson(data);
                if (!_this.downloadListRepository.IsMovieInDownloadList(movie)) {
                    _this.downloadListRepository.AddMovieToDownloadList(movie);
                    _this.$scope.moviesToDownload.push(movie);
                }
                _this.dragPending = false;
            });
            $scope.filter = function (watchListItem) {
                return watchListItem.Movie.MovieType == $scope.movieTypeFilter;
            };
            $scope.countMovieType = function (movieType) {
                var count = 0;
                angular.forEach($scope.moviesToDownload, function (watchlistItem) {
                    if (watchlistItem.Movie.MovieType == movieType) {
                        count++;
                    }
                });
                return count;
            };
            $scope.isWatchlistVisible = function () {
                return $("#download-list").is(":visible");
            };
        }
        HomeController.prototype.setActiveUrlPart = function () {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
        };
        HomeController.prototype.deleteMovieFromDownloadList = function (watchlistItem) {
            var _this = this;
            this.downloadListRepository.deleteFromDownloadListByWatchlist(watchlistItem).then(function () {
                angular.copy(_.without(_this.$scope.moviesToDownload, watchlistItem), _this.$scope.moviesToDownload);
            });
        };
        Object.defineProperty(HomeController.prototype, "moviesToDownload", {
            get: function () {
                return this.$scope.moviesToDownload;
            },
            enumerable: true,
            configurable: true
        });
        HomeController.prototype.markMovieAsDownloaded = function (watchlistItem) {
            this.downloadListRepository.MarkMovieAsWatched(watchlistItem);
            watchlistItem.Movie.Downloaded = true;
        };
        HomeController.prototype.searchMovie = function () {
            this.$location.path('/Movie/Search/' + this.search.movieName);
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            'DownloadListRepository',
        ];
        return HomeController;
    })();
    MovieApp.HomeController = HomeController;
})(MovieApp || (MovieApp = {}));
app.controller("HomeController", MovieApp.HomeController);
//# sourceMappingURL=HomeController.js.map
//module MovieApp {
//    export class ServerErrorInterceptor {
//        public static Factory($q: ng.IQService) {
//            return new ServerErrorInterceptor();
//        }
//        public requestError = (rejection) => {
//            console.warn(rejection);
//        };
//        //public responseError(rejection) {
//        //    console.log(rejection.status);
//        //    // Otherwise, default behavior
//        //    //return this.$q.reject(rejection);
//        //}
//    }
//} 
//app.service('serverErrorInterceptor', 
//app.config(['$httpProvider', ($httpProvider: ng.IHttpProvider) => {
//    $httpProvider.interceptors.push(function ($location) {
//        return {
//            'requestError': function (rejection) {
//                console.warn(rejection);
//            },
//            'responseError': function (rejection) {
//                console.warn(rejection);
//                return rejection;
//            }
//        }
//    });
//}]); 
//# sourceMappingURL=ServerErrorInterceptor.js.map
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
        Object.defineProperty(Movie.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._imdb = id;
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
        function MovieController($scope, $routeParams, MovieService, movie) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.MovieService = MovieService;
            this.movie = movie;
            this.vm = {
                viewtype: {
                    carousel: false,
                    mobile: true,
                }
            };
            if (!_.isString(movie)) {
                this.movieDetails = this.movie;
            }
            else {
                this.vm.viewtype.carousel = false;
                this.vm.viewtype.mobile = false;
                this.showError = true;
            }
        }
        MovieController.$inject = ['$scope', '$routeParams', 'MovieService', 'movie'];
        return MovieController;
    })();
    MovieApp.MovieController = MovieController;
    app.controller("MovieController", MovieApp.MovieController);
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=MovieController.js.map
var MovieApp;
(function (MovieApp) {
    function MovieDetailsCarousel() {
        return {
            restrict: 'E',
            templateUrl: '/Partials/Movie/Movie-Details-Carousel.html',
            link: function (scope, element, attributes) {
            }
        };
    }
    MovieApp.MovieDetailsCarousel = MovieDetailsCarousel;
})(MovieApp || (MovieApp = {}));
app.directive("movieDetailsCarousel", MovieApp.MovieDetailsCarousel);
//# sourceMappingURL=MovieDetailsCarousel.js.map
var MovieApp;
(function (MovieApp) {
    function MovieDetailsMobile() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Partials/Movie/Movie-Details-Mobile.html',
            link: function (scope, element, attributes) {
            },
        };
    }
    MovieApp.MovieDetailsMobile = MovieDetailsMobile;
})(MovieApp || (MovieApp = {}));
app.directive("movieDetailsMobile", MovieApp.MovieDetailsMobile);
//# sourceMappingURL=MovieDetailsMobile.js.map
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
                    //img.style.height = "530px";
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
        MoviePosterFactory.prototype.GetLargeMoviePoster = function (imdb) {
            var movieDetailsUrl = this.baseUrlMovie + imdb + "?api_key=" + this.apikey;
            var defer = this.$q.defer();
            $.get(movieDetailsUrl, function (response) {
                var imageUrl = "http://image.tmdb.org/t/p/w500" + response.poster_path;
                defer.resolve(imageUrl);
            });
            return defer.promise;
            //https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400
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
//# sourceMappingURL=MoviePosterRepository.js.map
var MovieApp;
(function (MovieApp) {
    var MovieSearchController = (function () {
        function MovieSearchController($scope, movies) {
            this.$scope = $scope;
            this.movies = movies;
            this.$scope.movies = movies;
        }
        MovieSearchController.$inject = ['$scope', 'movies'];
        return MovieSearchController;
    })();
    MovieApp.MovieSearchController = MovieSearchController;
    app.controller("MovieSearchController", MovieApp.MovieSearchController);
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=MovieSearchController.js.map
var MovieApp;
(function (MovieApp) {
    function MovieThumb(moviePosterFactory) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@',
                thumbnail: '@',
            },
            link: function (scope, element, attributes) {
                var img = new Image();
                if (scope.thumbnail) {
                    img.src = scope.thumbnail;
                    element.parent().append(img);
                    element.remove();
                }
                else {
                    moviePosterFactory.GetMovieThumb(scope.imdb).then(function (imageUrl) {
                        img.src = imageUrl;
                        element.parent().append(img);
                        element.remove();
                    });
                }
            }
        };
    }
    MovieApp.MovieThumb = MovieThumb;
})(MovieApp || (MovieApp = {}));
MovieApp.MovieThumb.$inject = ['moviePosterFactory'];
app.directive("movieThumb", MovieApp.MovieThumb);
//# sourceMappingURL=MovieThumb.js.map
var MovieApp;
(function (MovieApp) {
    function MovieTooltip($compile) {
        return {
            scope: true,
            restrict: 'A',
            compile: function (element, attributes) {
                element.attr('ng-mouseover', 'showHover($event, y)');
                element.attr('ng-mouseleave', 'hideHover()');
                element.removeAttr("movie-tooltip");
                return {
                    post: function (scope, iElement, attributes) {
                        $compile(iElement)(scope);
                    }
                };
            },
            controller: ['$scope', '$compile', 'MovieService', function ($scope, $compile, movieService) {
                    $scope.showHover = function ($event, movie) {
                        $scope.loading = false;
                        if ((!movie.Plot || movie.Plot.length < 1) && !$scope.loading) {
                            $scope.loading = true;
                            movieService.getMovieById(movie.ProviderId).then(function (response) {
                                movie.Plot = response.Plot;
                                $scope.loading = false;
                            });
                        }
                        $scope.movie = movie;
                        showTooltip($event.pageY, $event.pageX);
                    };
                    $scope.hideHover = function () {
                        angular.element("#movieTooltip").remove();
                    };
                    function showTooltip(top, left) {
                        angular.element("#movieTooltip").remove();
                        var xPos = 400 + left;
                        if (xPos >= window.innerWidth) {
                            left = left - 400;
                        }
                        var template = '<div class="movie-tooltip" id="movieTooltip" style="top:' + top + 'px; left:' + left + 'px;">' +
                            '<div style="font-size:0.8em;float:right;">Duur: {{movie.Duration}}min.</div>' +
                            '<b>{{movie.Title}}</b><br/>{{movie.Plot}}' +
                            '<div data-ng-show="loading"><img src="/Content/ajax-loader.gif" /></div>' +
                            '</div>';
                        var htmlCompiled = $compile(template)($scope);
                        angular.element('body').append($(htmlCompiled));
                    }
                }],
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
var MovieApp;
(function (MovieApp) {
    function MovieTrailer() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                url: '@',
                width: '@',
                height: '@',
            },
            link: function (scope, element, attributes) {
                if (!scope.url)
                    return;
                var iframe = document.createElement("IFRAME");
                iframe.src = scope.url;
                if (scope.width)
                    iframe.width = scope.width;
                if (scope.height)
                    iframe.height = scope.height;
                iframe.frameBorder = "0";
                iframe.scrolling = "false";
                iframe.setAttribute("allowfullscreen", "");
                element.parent().append(iframe);
                element.remove();
            }
        };
    }
    MovieApp.MovieTrailer = MovieTrailer;
})(MovieApp || (MovieApp = {}));
app.directive("movieTrailer", MovieApp.MovieTrailer);
//# sourceMappingURL=MovieTrailer.js.map
var MovieApp;
(function (MovieApp) {
    function MovieOverview() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                movies: '=',
            },
            templateUrl: "/Partials/Movie/MovieOverview.html",
            link: function (scope, element, attributes) {
            }
        };
    }
    MovieApp.MovieOverview = MovieOverview;
})(MovieApp || (MovieApp = {}));
app.directive("movieOverview", MovieApp.MovieOverview);
//# sourceMappingURL=MovieOverview.js.map
var MovieApp;
(function (MovieApp) {
    var MovieOverviewController = (function () {
        function MovieOverviewController($scope, movies, downloadListRepository, moviePosterFactory, movieService) {
            this.$scope = $scope;
            this.movies = movies;
            this.downloadListRepository = downloadListRepository;
            this.moviePosterFactory = moviePosterFactory;
            this.movieService = movieService;
            this.currentImdb = "-1";
            this.$scope.movies = [];
            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };
                this.$scope.movies.push(obj);
            }
        }
        MovieOverviewController.prototype.toggleExtraInfo = function (movie) {
            var moviebox = $("#" + movie.Imdb);
            var movieboxParent = $(moviebox).parent();
            var nextMovieParent = $(movieboxParent).next();
            var plot = moviebox.next();
            // collapse previous opened movie box
            if (this.currentImdb != "-1") {
                var currentMoviebox = $("#" + this.currentImdb);
                this.collapseDiv(currentMoviebox.parent(), 215);
                currentMoviebox.parent().removeClass('expanded');
                currentMoviebox.next().hide();
            }
            // collapse current opened moviebox
            if (movie.Imdb == this.currentImdb) {
                movieboxParent.removeClass('expanded');
                this.collapseDiv(movieboxParent, 215);
                plot.hide();
                this.currentImdb = "-1";
            }
            else {
                //expend new moviebox
                movieboxParent.addClass('expanded');
                this.expandDiv(movieboxParent, 600);
                plot.show();
                this.currentImdb = movie.Imdb;
            }
        };
        MovieOverviewController.prototype.expandDiv = function (element, endSize) {
            var totalWidth = element.width();
            var stepSize = 10;
            var handle = setInterval(function () {
                element.css('width', totalWidth + stepSize + 'px');
                totalWidth += stepSize;
                if (totalWidth >= endSize) {
                    clearInterval(handle);
                }
            }, 5);
        };
        MovieOverviewController.prototype.collapseDiv = function (element, endSize) {
            var totalWidth = element.width();
            var stepSize = 10;
            var handle = setInterval(function () {
                element.css('width', totalWidth - stepSize + 'px');
                totalWidth -= stepSize;
                if (totalWidth <= endSize) {
                    clearInterval(handle);
                }
            }, 5);
        };
        MovieOverviewController.prototype.addMovieToDownloadList = function (movie) {
            this.downloadListRepository.AddMovieToDownloadList(movie);
        };
        MovieOverviewController.prototype.deleteMovieFromDownloadList = function (movie) {
            this.downloadListRepository.deleteFromDownloadListByMovie(movie);
        };
        MovieOverviewController.prototype.showMovieDetails = function (providerId) {
            this.movieService.getMovieById(providerId);
        };
        MovieOverviewController.prototype.IsMoviePresentInDownloadlist = function (movie) {
            return this.downloadListRepository.IsMovieInDownloadList(movie);
        };
        MovieOverviewController.$inject = ['$scope', 'movies', 'DownloadListRepository', 'moviePosterFactory', 'MovieService'];
        return MovieOverviewController;
    })();
    MovieApp.MovieOverviewController = MovieOverviewController;
    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=MovieOverviewController.js.map
var MovieApp;
(function (MovieApp) {
    function EmailValidation() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) {
                    return false;
                }
                function isValidEmail(value) {
                    if (!value) {
                        return false;
                    }
                    // Email Regex used by ASP.Net MVC
                    var regex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;
                    return regex.exec(value) != null;
                }
                scope.$watch(ctrl, function () {
                    ctrl.$validate();
                });
                ctrl.$validators.email = function (modelValue, viewValue) {
                    return isValidEmail(viewValue);
                };
            }
        };
    }
    MovieApp.EmailValidation = EmailValidation;
})(MovieApp || (MovieApp = {}));
MovieApp.EmailValidation.$inject = [];
app.directive("email", MovieApp.EmailValidation);
//# sourceMappingURL=email.js.map
var MovieApp;
(function (MovieApp) {
    var WatchlistItem = (function () {
        function WatchlistItem() {
        }
        Object.defineProperty(WatchlistItem.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WatchlistItem.prototype, "Movie", {
            get: function () {
                return this._movie;
            },
            set: function (movie) {
                this._movie = movie;
            },
            enumerable: true,
            configurable: true
        });
        return WatchlistItem;
    })();
    MovieApp.WatchlistItem = WatchlistItem;
})(MovieApp || (MovieApp = {}));
//# sourceMappingURL=WatchlistItem.js.map
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
//# sourceMappingURL=MovieService.js.map
var MovieApp;
(function (MovieApp) {
    var ShareForm = (function () {
        function ShareForm() {
            this.emailAddress = "";
            this.message = "";
            this.sendby = "";
        }
        return ShareForm;
    })();
    function ShareButton(MovieService) {
        return {
            restrict: 'E',
            templateUrl: '/Movie/Sharing/movie-share-button.html',
            scope: {
                movie: '=',
            },
            link: function (scope, element, attributes) {
                scope.vm = {
                    form: new ShareForm(),
                    modelId: "share-movie-modal" + scope.movie.Imdb,
                    showSharePopup: showSharePopup,
                    sendMail: sendMail,
                    isFormValid: isFormValid
                };
                function showSharePopup(movie) {
                    scope.vm.form = new ShareForm();
                    getPopup().modal('toggle');
                }
                function sendMail() {
                    MovieService.shareMovieWithFriend(scope.vm.form.emailAddress, scope.vm.form.message, scope.vm.form.sendby, scope.movie).then(mailSendSuccess, mailSendFailed);
                }
                function isFormValid() {
                    return scope.shareForm.$valid;
                }
                function mailSendSuccess() {
                    getPopup().modal('hide');
                    toastr.success("Mail verzonden", "Je e-mail is verzondenaan je vriend(in)!");
                }
                function mailSendFailed() {
                    getPopup().modal('hide');
                    toastr.success("Hmm...", "Er is een fout opgetreden bij het verzenden van de mail... Kak");
                }
                function getPopup() {
                    return angular.element("#" + scope.vm.modelId);
                }
            }
        };
    }
    MovieApp.ShareButton = ShareButton;
})(MovieApp || (MovieApp = {}));
MovieApp.ShareButton.$inject = ['MovieService'];
app.directive("movieShareButton", MovieApp.ShareButton);
//# sourceMappingURL=movie-share-button.js.map
var MovieApp;
(function (MovieApp) {
    function MovieTrailerButton($timeout) {
        return {
            restrict: 'E',
            templateUrl: '/Movie/Trailer/view-trailer-button.html',
            scope: {
                movie: '=',
            },
            link: function (scope, element, attributes) {
                scope.vm = {
                    showTrailerPopup: showTrailerPopup,
                    popupId: "popup-trailer-model-" + scope.movie.Imdb,
                    modalVisible: false,
                };
                function showTrailerPopup() {
                    scope.vm.modalVisible = true;
                    $timeout(function () {
                        $("#" + scope.vm.popupId).modal('toggle');
                    });
                    $("#" + scope.vm.popupId).on('hidden.bs.modal', function () {
                        scope.$apply(function () {
                            scope.vm.modalVisible = false;
                        });
                    });
                }
            }
        };
    }
    MovieApp.MovieTrailerButton = MovieTrailerButton;
})(MovieApp || (MovieApp = {}));
MovieApp.MovieTrailerButton.$inject = ['$timeout'];
app.directive("movieTrailerButton", MovieApp.MovieTrailerButton);
//# sourceMappingURL=view-trailer-button.js.map
var MovieApp;
(function (MovieApp) {
    function WatchlistButton(DownloadListRepository) {
        return {
            restrict: 'E',
            templateUrl: '/Watchlist/watchlist-button.html',
            scope: {
                movie: '=',
            },
            link: function (scope, element, attributes) {
                scope.vm = {
                    addMovieToDownloadList: addMovieToDownloadList,
                    deleteMovieFromDownloadList: deleteMovieFromDownloadList,
                    isMoviePresentInDownloadlist: isMoviePresentInDownloadlist
                };
                function addMovieToDownloadList() {
                    DownloadListRepository.AddMovieToDownloadList(scope.movie);
                }
                function deleteMovieFromDownloadList() {
                    DownloadListRepository.deleteFromDownloadListByMovie(scope.movie);
                }
                function isMoviePresentInDownloadlist() {
                    return DownloadListRepository.IsMovieInDownloadList(scope.movie);
                }
            }
        };
    }
    MovieApp.WatchlistButton = WatchlistButton;
})(MovieApp || (MovieApp = {}));
MovieApp.WatchlistButton.$inject = ['DownloadListRepository'];
app.directive("watchlistButton", MovieApp.WatchlistButton);
//# sourceMappingURL=watchlist-button.js.map
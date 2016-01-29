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

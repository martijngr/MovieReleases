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

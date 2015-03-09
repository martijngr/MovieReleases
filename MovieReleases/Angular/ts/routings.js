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

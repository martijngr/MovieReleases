module MovieApp {
    export interface IMovieControllerScope extends ng.IScope {
        movie: Movie;
    }

    export interface RouteParams extends ng.route.IRouteParamsService {
        userId: number;
    }

    export class MovieController {
        public static $inject = ['$scope', '$routeParams', 'MovieService', 'movie'];

        showError: boolean;
        movieDetails: Movie;
        vm = {
            viewtype: {
                carousel: true,
                mobile: false,
            }
        }

        constructor(
            private $scope: IMovieControllerScope,
            private $routeParams: RouteParams,
            private MovieService: MovieService,
            private movie: MovieApp.Movie) {

            if (!_.isString(movie)) {
                this.movieDetails = this.movie;
            }
            else {
                this.vm.viewtype.carousel = false;
                this.vm.viewtype.mobile = false;
                this.showError = true;
            }
        }
    }

    app.controller("MovieController", MovieApp.MovieController);
} 
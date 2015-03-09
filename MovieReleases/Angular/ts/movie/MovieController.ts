    module MovieApp {
        export interface IMovieControllerScope extends ng.IScope {
            movie: Movie;
        }

        export interface RouteParams extends ng.route.IRouteParamsService {
            imdb: string;
        }

        export class MovieController {
            public static $inject = ['$scope', '$routeParams', 'MovieService', 'movie'];

            movieDetails: Movie;

            constructor(
                private $scope: IMovieControllerScope,
                private $routeParams: RouteParams,
                private MovieService: MovieService,
                private movie : MovieApp.Movie) {

                //var imdb = $routeParams.imdb;
                //MovieService.GetMovieByImdb(imdb).then(response => {
                this.movieDetails = this.movie;
                //});
            
            }

            //private movie: Movie;

        }

        app.controller("MovieController", MovieApp.MovieController);
    } 
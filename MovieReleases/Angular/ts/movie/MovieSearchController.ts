module MovieApp {
    export interface ISearchMovieControllerScope extends ng.IScope {
        movies: any[];
    }

    export class MovieSearchController {
        public static $inject = ['$scope', 'movies'];

        constructor(private $scope: ISearchMovieControllerScope, private movies: any) {
            this.$scope.movies = movies
        }
    }

    app.controller("MovieSearchController", MovieApp.MovieSearchController);
} 
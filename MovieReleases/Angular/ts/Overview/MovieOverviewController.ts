module MovieApp {
    export interface IMovieOverviewControllerScope extends ng.IScope {
        movies: any[];
        moviesToDownload: any[];
    }

    export class MovieOverviewController {
        public static $inject = ['$scope', 'movies', 'DownloadListService'];

        constructor(private $scope: IMovieOverviewControllerScope, private movies: any, private DownloadListService: DownloadListService) {
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }

        public addMovieToDownloadList(movie : Movie) {
            this.DownloadListService.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        }
    }

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
} 
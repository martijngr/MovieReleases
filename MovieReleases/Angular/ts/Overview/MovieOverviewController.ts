module MovieApp {
    export interface IMovieOverviewControllerScope extends ng.IScope {
        movies: any[];
        moviesToDownload: any[];
    }

    export class MovieOverviewController {
        public static $inject = ['$scope', 'movies', 'DownloadListRepository'];

        constructor(private $scope: IMovieOverviewControllerScope, private movies: any, private downloadListRepository: DownloadListRepository) {
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }

        public addMovieToDownloadList(movie: Movie) {
            movie.InDownloadList = true;
            this.downloadListRepository.AddMovieToDownloadList(movie);
            this.$scope.moviesToDownload.push(movie);
        }

        public deleteMovieFromDownloadList(movie: Movie) {
            this.downloadListRepository.DeleteMovieFromDownloadList(movie).then(() => {
                movie.InDownloadList = false;
                angular.copy(_.without(this.$scope.moviesToDownload, movie), this.$scope.moviesToDownload);
            });
        }
    }

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
} 
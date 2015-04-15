module MovieApp {
    export interface IMovieOverviewControllerScope extends ng.IScope {
        movies: any[];
        moviesToDownload: any[];
        backgroundUrl: string;
    }

    export class MovieOverviewController {
        public static $inject = ['$scope', 'movies', 'DownloadListRepository', 'moviePosterFactory'];

        constructor(private $scope: IMovieOverviewControllerScope, private movies: any, private downloadListRepository: DownloadListRepository, private moviePosterFactory: MoviePosterFactory) {
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }

            var index = Math.floor((Math.random() * this.$scope.movies.length));
            var movieIndex = Math.floor((Math.random() * this.$scope.movies[index].movies.length));
            var backgroundImdb = this.$scope.movies[index].movies[movieIndex].Imdb;
            this.moviePosterFactory.GetLargeMoviePoster(backgroundImdb).then(function (response) {
                var style = "<style>#overview-background:before{background-image:url(" + response + ")}</style>";
                $("#overview-background").append(style);
            });
            
        }

        public addMovieToDownloadList(movie: Movie) {
            this.downloadListRepository.AddMovieToDownloadList(movie);
        }

        public deleteMovieFromDownloadList(movie: Movie) {
            this.downloadListRepository.DeleteMovieFromDownloadList(movie).then(() => {
                //angular.copy(_.without(this.$scope.moviesToDownload, movie), this.$scope.moviesToDownload);
            });
        }

        public IsMoviePresentInDownloadlist(movie: Movie) {
            return this.downloadListRepository.IsMovieInDownloadList(movie);
        }
    }

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
} 
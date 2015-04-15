module MovieApp {
    export interface IHomeControllerScope extends ng.IScope {
        moviesToDownload: Movie[];
        active: string;
        movieTypeFilter: number;

        deleteMovieFromDownloadList(movie: Movie);

        markMovieAsDownloaded(movie: Movie);
    }

    export class HomeController {
        public static $inject = [
            '$scope',
            '$location',
            'DownloadListRepository',
        ];

        public dragPending: boolean;
        private search = {
            movieName: "",
        };

        constructor(private $scope: IHomeControllerScope,
            private $location: ng.ILocationService,
            private downloadListRepository: DownloadListRepository) {

            this.$scope.$on('$locationChangeSuccess', (event) => {
                this.setActiveUrlPart();
            });

            $scope.movieTypeFilter = 3;

            downloadListRepository.GetMoviesToDownload().then(response => {
                this.$scope.moviesToDownload = response;
            });

            $scope.$on("onDragStart", (event, data) => {
                this.dragPending = true;
            });

            $scope.$on("onDragDrop", (event, data) => {
                var movie = angular.fromJson(data);

                if (!this.downloadListRepository.IsMovieInDownloadList(movie)) {
                    this.downloadListRepository.AddMovieToDownloadList(movie);
                    this.$scope.moviesToDownload.push(movie);
                }

                this.dragPending = false;
            });
        }

        private setActiveUrlPart() {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
        }

        public deleteMovieFromDownloadList(movie: Movie) {
            this.downloadListRepository.DeleteMovieFromDownloadList(movie).then(() => {
                angular.copy(_.without(this.$scope.moviesToDownload, movie), this.$scope.moviesToDownload);
            });
        }

        public get moviesToDownload() {
            return this.$scope.moviesToDownload;
        }

        public markMovieAsDownloaded(movie: Movie) {
            movie.Downloaded = true;
        }

        public searchMovie() {
            this.$location.path('/Movie/Search/' + this.search.movieName);
        }
    }
}

app.controller("HomeController", MovieApp.HomeController);
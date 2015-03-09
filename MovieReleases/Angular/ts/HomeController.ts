module MovieApp {
    export interface IHomeControllerScope extends ng.IScope {
        moviesToDownload: Movie[];
        active: string;

        deleteMovieFromDownloadList(movie: Movie);

        markMovieAsDownloaded(movie: Movie);
    }

    export class HomeController {
        public static $inject = [
            '$scope',
            '$location',
            'DownloadListService'
        ];

        constructor(private $scope: IHomeControllerScope, private $location: ng.ILocationService, private downloadListService: DownloadListService) {
            this.$scope.$on('$locationChangeSuccess', (event) => {
                this.setActiveUrlPart();
            });

            downloadListService.GetMoviesToDownload().then(response => {
                this.$scope.moviesToDownload = response;
            });
        }

        private setActiveUrlPart() {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
        }

        public get moviesToDownload() {
            return this.$scope.moviesToDownload;
        }

        public markMovieAsDownloaded(movie: Movie) {
            movie.Downloaded = true;
        }

        public deleteMovieFromDownloadList(movie: Movie) {
            this.downloadListService.DeleteMovieFromDownloadList(movie).then(() => {
                this.$scope.moviesToDownload = _.without(this.$scope.moviesToDownload, movie);
            });
        }
    }
}

app.controller("HomeController", MovieApp.HomeController);
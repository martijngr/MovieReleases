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
            'DownloadListRepository'
        ];

        constructor(private $scope: IHomeControllerScope, private $location: ng.ILocationService, private downloadListRepository: DownloadListRepository) {
            this.$scope.$on('$locationChangeSuccess', (event) => {
                this.setActiveUrlPart();
            });

            $scope.movieTypeFilter = 3;

            downloadListRepository.GetMoviesToDownload().then(response => {
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

        
    }
}

app.controller("HomeController", MovieApp.HomeController);
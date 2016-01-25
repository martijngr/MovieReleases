module MovieApp {
    export interface IHomeControllerScope extends ng.IScope {
        moviesToDownload: WatchlistItem[];
        active: string;
        movieTypeFilter: number;

        deleteMovieFromDownloadList(movie: Movie);

        markMovieAsDownloaded(movie: Movie);

        filter(watchListItem: WatchlistItem): boolean;

        countMovieType(movieType: number): number;
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

            $scope.filter = function (watchListItem : WatchlistItem) {
                return watchListItem.Movie.MovieType == $scope.movieTypeFilter;
            }

            $scope.countMovieType = function (movieType: number) {
                var count = 0;
                angular.forEach($scope.moviesToDownload, function (watchlistItem: WatchlistItem) {
                    if (watchlistItem.Movie.MovieType == movieType) {
                        count++;
                    }
                });

                return count;
            }
        }

        private setActiveUrlPart() {
            var parts = this.$location.path().split('/');
            this.$scope.active = parts[1];
        }

        public deleteMovieFromDownloadList(watchlistItem: WatchlistItem) {
            this.downloadListRepository.deleteFromDownloadListByWatchlist(watchlistItem).then(() => {
                angular.copy(_.without(this.$scope.moviesToDownload, watchlistItem), this.$scope.moviesToDownload);
            });
        }

        public get moviesToDownload() {
            return this.$scope.moviesToDownload;
        }

        public markMovieAsDownloaded(watchlistItem: WatchlistItem) {
            this.downloadListRepository.MarkMovieAsWatched(watchlistItem);
            watchlistItem.Movie.Downloaded = true;
        }

        public searchMovie() {
            this.$location.path('/Movie/Search/' + this.search.movieName);
        }
    }
}

app.controller("HomeController", MovieApp.HomeController);
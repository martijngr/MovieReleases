module MovieApp {
    export class DownloadListRepository {
        public static $inject = ['$http', '$q', '$window'];

        private watchlist: WatchlistItem[];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $window: ng.IWindowService) {
            this.watchlist = new Array<WatchlistItem>();
        }

        public AddMovieToDownloadList(movie: Movie) {
            return this.$http.post("/api/DownloadList/", movie).then(response  => {
                
                this.watchlist.push(<WatchlistItem>response.data);
            });
        }

        public MarkMovieAsWatched = function (watchListItem: WatchlistItem){
            this.$http.put('/api/DownloadList/MarkMovieAsWatched/', watchListItem);
        }

        public GetMoviesToDownload = function () {
            return this.$http.get("/api/DownloadList/").then(response => {
                this.watchlist = response.data;

                return this.watchlist;
            });
        }

        public deleteFromDownloadListByMovie(movie: Movie) {
            var watchlistItem = this.GetWatchlistItemByMovieId(movie.Id);

            this.deleteFromDownloadListByWatchlist(watchlistItem);
        }

        public deleteFromDownloadListByWatchlist(watchlistItem: WatchlistItem) {
            return this.$http.delete("/api/DownloadList/" + watchlistItem.Id).then(response => {
                angular.copy(_.without(this.watchlist, watchlistItem), this.watchlist);
            });
        }

        public IsMovieInDownloadList(movie: Movie): boolean {
            var enlistedMovie = _.filter(this.watchlist, function (item) {
                return item.Movie.Imdb == movie.Imdb;
            });

            return enlistedMovie.length > 0;
        }

        private GetWatchlistItemByMovieId (movieId: string): WatchlistItem {
            var enlistedMovie = _.filter(this.watchlist, function (item) {
                return item.Movie.Id == movieId;
            });

            return enlistedMovie && enlistedMovie.length > 0 ? _.first(enlistedMovie) : null;
        }
    }
}

app.service("DownloadListRepository", MovieApp.DownloadListRepository);
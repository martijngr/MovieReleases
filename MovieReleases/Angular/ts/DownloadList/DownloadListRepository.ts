module MovieApp {
    export class DownloadListRepository {
        public static $inject = ['$http', '$q', '$window'];

        private downloadList: Movie[];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $window: ng.IWindowService) {
            this.downloadList = new Array<Movie>();
        }

        public AddMovieToDownloadList(movie: Movie) {
            return this.$http.post("/api/DownloadList/", movie).then(response => {

                this.downloadList.push(movie);

                //return response.data;
            });
        }

        public GetMoviesToDownload = function () {
            return this.$http.get("/api/DownloadList/").then(response => {
                this.downloadList = response.data;

                return this.downloadList;
            });
        }

        public DeleteMovieFromDownloadList = function (movie: Movie) {
            return this.$http.delete("/api/DownloadList/" + movie.Imdb).then(response => {
                angular.copy(_.without(this.downloadList, movie), this.downloadList);

                return response;
            });
        }

        public IsMovieInDownloadList(movie: Movie) : boolean {
            var enlistedMovie = _.findWhere(this.downloadList, { Imdb: movie.Imdb });

            return angular.isDefined(enlistedMovie);
        }
    }
}

app.service("DownloadListRepository", MovieApp.DownloadListRepository);
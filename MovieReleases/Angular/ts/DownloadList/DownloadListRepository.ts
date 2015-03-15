module MovieApp {
    export class DownloadListRepository {
        public static $inject = ['$http', '$q', '$window'];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $window: ng.IWindowService) {

        }

        public AddMovieToDownloadList(movie: Movie) {
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                return response.data;
            });
        }

        public GetMoviesToDownload = function () {
            return this.$http.get("/api/DownloadList/").then(function (response) {
                return response.data;
            });
        }

        public DeleteMovieFromDownloadList = function (movie: Movie) {
            return this.$http.delete("/api/DownloadList/" + movie.Imdb).then(function (response) {
                return response;
            });
        }
    }
} 

app.service("DownloadListRepository", MovieApp.DownloadListRepository);
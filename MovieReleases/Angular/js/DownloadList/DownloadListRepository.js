var MovieApp;
(function (MovieApp) {
    var DownloadListRepository = (function () {
        function DownloadListRepository($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.GetMoviesToDownload = function () {
                return this.$http.get("/api/DownloadList/").then(function (response) {
                    return response.data;
                });
            };
            this.DeleteMovieFromDownloadList = function (movie) {
                return this.$http.delete("/api/DownloadList/" + movie.Imdb).then(function (response) {
                    return response;
                });
            };
        }
        DownloadListRepository.prototype.AddMovieToDownloadList = function (movie) {
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                return response.data;
            });
        };
        DownloadListRepository.$inject = ['$http', '$q', '$window'];
        return DownloadListRepository;
    })();
    MovieApp.DownloadListRepository = DownloadListRepository;
})(MovieApp || (MovieApp = {}));

app.service("DownloadListRepository", MovieApp.DownloadListRepository);

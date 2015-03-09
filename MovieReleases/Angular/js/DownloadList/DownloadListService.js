var MovieApp;
(function (MovieApp) {
    var DownloadListService = (function () {
        function DownloadListService($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.GetMoviesToDownload = function () {
                return this.$http.get("/api/DownloadList/").then(function (response) {
                    return response.data;
                });
            };
            this.DeleteMovieFromDownloadList = function (movie) {
                return this.$http.delete("/api/DownloadList/" + movie.ImdbId).then(function (response) {
                    return response;
                });
            };
        }
        DownloadListService.prototype.AddMovieToDownloadList = function (movie) {
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                return response.data;
            });
        };
        DownloadListService.$inject = ['$http', '$q', '$window'];
        return DownloadListService;
    })();
    MovieApp.DownloadListService = DownloadListService;
})(MovieApp || (MovieApp = {}));

app.service("DownloadListService", MovieApp.DownloadListService);

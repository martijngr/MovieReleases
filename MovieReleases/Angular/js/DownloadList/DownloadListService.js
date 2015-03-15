var MovieApp;
(function (MovieApp) {
    var DownloadListService = (function () {
        function DownloadListService() {
        }
        DownloadListService.prototype.AddMovieToDownloadList = function (movie) {
        };
        return DownloadListService;
    })();
    MovieApp.DownloadListService = DownloadListService;
})(MovieApp || (MovieApp = {}));

app.service("DownloadListService", MovieApp.DownloadListService);

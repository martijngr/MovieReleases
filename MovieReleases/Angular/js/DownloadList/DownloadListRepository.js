var MovieApp;
(function (MovieApp) {
    var DownloadListRepository = (function () {
        function DownloadListRepository($http, $q, $window) {
            this.$http = $http;
            this.$q = $q;
            this.$window = $window;
            this.GetMoviesToDownload = function () {
                var _this = this;
                return this.$http.get("/api/DownloadList/").then(function (response) {
                    _this.downloadList = response.data;

                    return _this.downloadList;
                });
            };
            this.DeleteMovieFromDownloadList = function (movie) {
                var _this = this;
                return this.$http.delete("/api/DownloadList/" + movie.Imdb).then(function (response) {
                    angular.copy(_.without(_this.downloadList, movie), _this.downloadList);

                    return response;
                });
            };
            this.downloadList = new Array();
        }
        DownloadListRepository.prototype.AddMovieToDownloadList = function (movie) {
            var _this = this;
            return this.$http.post("/api/DownloadList/", movie).then(function (response) {
                _this.downloadList.push(movie);
                //return response.data;
            });
        };

        DownloadListRepository.prototype.IsMovieInDownloadList = function (movie) {
            var enlistedMovie = _.findWhere(this.downloadList, { Imdb: movie.Imdb });

            return angular.isDefined(enlistedMovie);
        };
        DownloadListRepository.$inject = ['$http', '$q', '$window'];
        return DownloadListRepository;
    })();
    MovieApp.DownloadListRepository = DownloadListRepository;
})(MovieApp || (MovieApp = {}));

app.service("DownloadListRepository", MovieApp.DownloadListRepository);

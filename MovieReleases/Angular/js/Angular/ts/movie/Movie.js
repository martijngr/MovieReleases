var MovieApp;
(function (MovieApp) {
    var Movie = (function () {
        function Movie() {
        }
        Object.defineProperty(Movie.prototype, "Url", {
            get: function () {
                return this._url;
            },
            set: function (url) {
                this._url = url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Year", {
            get: function () {
                return this._year;
            },
            set: function (year) {
                this._year = year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Thumbnail", {
            get: function () {
                return this._thumbnail;
            },
            set: function (thumbnail) {
                this._thumbnail = thumbnail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Plot", {
            get: function () {
                return this._plot;
            },
            set: function (plot) {
                this._plot = plot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Duration", {
            get: function () {
                return this._duration;
            },
            set: function (duration) {
                this._duration = duration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Downloaded", {
            get: function () {
                return this._downloaded;
            },
            set: function (downloaded) {
                this._downloaded = downloaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Title", {
            get: function () {
                return this._title;
            },
            set: function (title) {
                this._title = title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "MovieType", {
            get: function () {
                return this._movieType;
            },
            set: function (movieType) {
                this._movieType = movieType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Imdb", {
            get: function () {
                return this._imdb;
            },
            set: function (imdb) {
                this._imdb = imdb;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Movie.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._imdb = id;
            },
            enumerable: true,
            configurable: true
        });
        return Movie;
    })();
    MovieApp.Movie = Movie;
})(MovieApp || (MovieApp = {}));

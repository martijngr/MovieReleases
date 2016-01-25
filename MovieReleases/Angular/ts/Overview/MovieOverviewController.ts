module MovieApp {
    export interface IMovieOverviewControllerScope extends ng.IScope {
        movies: any[];
        moviesToDownload: any[];
        backgroundUrl: string;
        toggleExtraInfo: any;
    }

    export class MovieOverviewController {
        public static $inject = ['$scope', 'movies', 'DownloadListRepository', 'moviePosterFactory', 'MovieService'];

        constructor(private $scope: IMovieOverviewControllerScope,
                    private movies: any,
                    private downloadListRepository: DownloadListRepository,
                    private moviePosterFactory: MoviePosterFactory,
                    private movieService: MovieService) {
            this.$scope.movies = [];

            for (var date in this.movies) {
                var list = this.movies[date];
                var obj = { date: date, movies: list };

                this.$scope.movies.push(obj);
            }
        }

        public currentImdb = "-1";

        public toggleExtraInfo(movie: Movie) {
            var moviebox = $("#" + movie.Imdb);
            var movieboxParent = $(moviebox).parent();
            var nextMovieParent = $(movieboxParent).next();
            var plot = moviebox.next();

            // collapse previous opened movie box
            if (this.currentImdb != "-1") {
                var currentMoviebox = $("#" + this.currentImdb);
                this.collapseDiv(currentMoviebox.parent(), 215);
                currentMoviebox.parent().removeClass('expanded');
                currentMoviebox.next().hide();
            }

            // collapse current opened moviebox
            if (movie.Imdb == this.currentImdb) {
                movieboxParent.removeClass('expanded');
                this.collapseDiv(movieboxParent, 215);
                plot.hide();

                this.currentImdb = "-1";
            }
            else {
                //expend new moviebox
                movieboxParent.addClass('expanded');
                this.expandDiv(movieboxParent, 600);
                plot.show();

                this.currentImdb = movie.Imdb;
            }
        }

        private expandDiv(element, endSize) {
            var totalWidth = element.width();
            var stepSize = 10;

            var handle = setInterval(function () {
                element.css('width', totalWidth + stepSize + 'px');
                totalWidth += stepSize;

                if (totalWidth >= endSize) {
                    clearInterval(handle);
                }
            }, 5);
        }

        private collapseDiv(element, endSize) {
            var totalWidth = element.width();
            var stepSize = 10;

            var handle = setInterval(function () {
                element.css('width', totalWidth - stepSize + 'px');
                totalWidth -= stepSize;

                if (totalWidth <= endSize) {
                    clearInterval(handle);
                }
            }, 5);
        }

        public addMovieToDownloadList(movie: Movie) {
            this.downloadListRepository.AddMovieToDownloadList(movie);
        }

        public deleteMovieFromDownloadList(movie: Movie) {
            this.downloadListRepository.deleteFromDownloadListByMovie(movie);
        }

        public showMovieDetails(providerId: string) {
            this.movieService.getMovieById(providerId);
        }

        public IsMoviePresentInDownloadlist(movie: Movie) {
            return this.downloadListRepository.IsMovieInDownloadList(movie);
        }
    }

    app.controller("MovieOverviewController", MovieApp.MovieOverviewController);
} 
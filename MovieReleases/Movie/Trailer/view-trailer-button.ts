module MovieApp {
    export interface IMovieTrailerButtonScope extends ng.IScope {
        movie: Movie;
        vm: {
            showTrailerPopup(),
            popupId: string
        };
    }

    export function MovieTrailerButton(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: '/Movie/Trailer/view-trailer-button.html',
            scope: {
                movie: '=',
            },
            link: function (scope: IMovieTrailerButtonScope, element: JQuery, attributes: any) {
                scope.vm = {
                    showTrailerPopup: showTrailerPopup,
                    popupId: "popup-trailer-model-" + scope.movie.Imdb,
                };

                function showTrailerPopup() {
                    $("#" + scope.vm.popupId).modal('toggle');
                }
            }
        }
    }
}

//MovieApp.MovieTrailerButton.$inject = [''];

app.directive("movieTrailerButton", MovieApp.MovieTrailerButton);
module MovieApp {
    export interface IMovieTrailerButtonScope extends ng.IScope {
        movie: Movie;
        vm: {
            showTrailerPopup(),
            popupId: string,
            modalVisible: boolean
        };
    }

    export function MovieTrailerButton($timeout: ng.ITimeoutService): ng.IDirective {
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
                    modalVisible: false,
                };

                function showTrailerPopup() {
                    scope.vm.modalVisible = true;

                    $timeout(function () {
                        $("#" + scope.vm.popupId).modal('toggle');
                    });

                    $("#" + scope.vm.popupId).on('hidden.bs.modal', function () {
                        scope.$apply(function () {
                            scope.vm.modalVisible = false;
                        });
                    })
                }
            }
        }
    }
}

MovieApp.MovieTrailerButton.$inject = ['$timeout'];

app.directive("movieTrailerButton", MovieApp.MovieTrailerButton);
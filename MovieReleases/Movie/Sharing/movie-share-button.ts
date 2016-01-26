module MovieApp {
    export interface IMovieShareButtonScope extends ng.IScope {
        movie: Movie;
        shareForm: ng.IFormController;
        vm: {
            showSharePopup(movie: Movie),
            form: ShareForm,
            modelId: string,
            sendMail(),
            isFormValid(),
        };
    }

    class ShareForm {
        emailAddress: string;
        message: string;

        constructor() {
            this.emailAddress = "";
            this.message = "";
        }
    }

    export function ShareButton(MovieService: MovieApp.MovieService): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: '/Movie/Sharing/movie-share-button.html',
            scope: {
                movie: '=',
            },
            link: function (scope: IMovieShareButtonScope, element: JQuery, attributes: any) {
                scope.vm = {
                    form: new ShareForm(),
                    modelId: "share-movie-modal" + scope.movie.Imdb,
                    showSharePopup: showSharePopup,
                    sendMail: sendMail,
                    isFormValid: isFormValid
                };
                
                function showSharePopup(movie: Movie) {
                    scope.vm.form = new ShareForm();
                    $("#" + scope.vm.modelId).modal('toggle');
                }

                function sendMail() {
                    MovieService.shareMovieWithFriend(scope.vm.form.emailAddress, scope.vm.form.message);
                }

                function isFormValid() {
                    return scope.shareForm.$valid;
                }
            }
        }
    }
}

MovieApp.ShareButton.$inject = ['MovieService'];

app.directive("movieShareButton", MovieApp.ShareButton);
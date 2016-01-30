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
        sendby: string;

        constructor() {
            this.emailAddress = "";
            this.message = "";
            this.sendby = "";
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
                    getPopup().modal('toggle');
                }

                function sendMail() {
                    MovieService.shareMovieWithFriend(
                                    scope.vm.form.emailAddress,
                                    scope.vm.form.message,
                                    scope.vm.form.sendby,
                                    scope.movie).then(mailSendSuccess, mailSendFailed);
                }

                function isFormValid() {
                    return scope.shareForm.$valid;
                }

                function mailSendSuccess() {
                    getPopup().modal('hide');
                    toastr.success("Mail verzonden", "Je e-mail is verzondenaan je vriend(in)!");
                }

                function mailSendFailed() {
                    getPopup().modal('hide');
                    toastr.success("Hmm...", "Er is een fout opgetreden bij het verzenden van de mail... Kak");
                }

                function getPopup() {
                    return angular.element("#" + scope.vm.modelId);
                }
            }
        }
    }
}

MovieApp.ShareButton.$inject = ['MovieService'];

app.directive("movieShareButton", MovieApp.ShareButton);
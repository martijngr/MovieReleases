module MovieApp {
    export interface IMovieThumbScope extends ng.IScope {
        imdb: string;
    }

    export function MovieThumb(moviePosterFactory: MovieApp.MoviePosterFactory): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@',
            },
            link: function (scope: IMovieThumbScope, element: JQuery, attributes: any) {
                var img = new Image();
                moviePosterFactory.GetMovieThumb(scope.imdb).then(function (imageUrl) {
                    img.src = imageUrl;
                    element.parent().append(img);
                    element.remove();
                });
            }
        }
    }
}

MovieApp.MovieThumb.$inject = ['moviePosterFactory'];

app.directive("movieThumb", MovieApp.MovieThumb);
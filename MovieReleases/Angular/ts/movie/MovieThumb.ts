module MovieApp {
    export interface IMovieThumbScope extends ng.IScope {
        imdb: string;
        thumbnail: string;
    }

    export function MovieThumb(moviePosterFactory: MovieApp.MoviePosterFactory): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@',
                thumbnail: '@',
            },
            link: function (scope: IMovieThumbScope, element: JQuery, attributes: any) {
                var img = new Image();

                if (scope.thumbnail) {
                    img.src = scope.thumbnail;
                    element.parent().append(img);
                    element.remove();
                }
                else {
                    moviePosterFactory.GetMovieThumb(scope.imdb).then(function (imageUrl) {
                        img.src = imageUrl;
                        element.parent().append(img);
                        element.remove();
                    });
                }
            }
        }
    }
}

MovieApp.MovieThumb.$inject = ['moviePosterFactory'];

app.directive("movieThumb", MovieApp.MovieThumb);
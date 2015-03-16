module MovieApp {
    export interface IMoviePosterScope extends ng.IScope {
        imdb: string;
    }

    export function MoviePoster(moviePosterFactory : MovieApp.MoviePosterFactory) : ng.IDirective{
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@',
            },
            link: function (scope: IMoviePosterScope, element : JQuery, attributes : any) {
                var img = new Image();

                moviePosterFactory.GetMoviePoster(scope.imdb).then(function (imageUrl) {
                    img.src = imageUrl;
                    img.style.height = "530px";
                    element.parent().append(img);
                    element.remove();
                });
            }
        }
    }
}

MovieApp.MoviePoster.$inject = ['moviePosterFactory'];

app.directive("moviePoster", MovieApp.MoviePoster);
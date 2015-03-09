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
                    element.parent().append(img);
                    element.remove();
                });
            }
        }
    }
}

MovieApp.MoviePoster.$inject = ['moviePosterFactory'];

app.directive("moviePoster", MovieApp.MoviePoster);

//angular.module('movieApp').directive("moviePoster", ['MovieService', function (MovieService) {
//    return {
//        restrict: 'E',
//        replace: true,
//        scope: {
//            imdb: '@',
//        },
//        link: function (scope, element, attributes) {
//            var x = scope.imdb;
//            var img = new Image();

//            $.get("https://api.themoviedb.org/3/movie/tt" + scope.imdb + "?api_key=980071c1008d3dd64ab4a0893fe5a727", function (response) {
//                img.src = "http://image.tmdb.org/t/p/w154" + response.poster_path;

//                element.parent().append(img);
//                element.remove();
//            });
//        }
//    }
//}])
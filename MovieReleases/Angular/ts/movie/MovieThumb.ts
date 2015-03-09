module MovieApp {
    export interface IMovieThumbScope extends ng.IScope {
        imdb: string;
    }

    export function MovieThumb(moviePosterFactory : MovieApp.MoviePosterFactory) : ng.IDirective{
        return {
            restrict: 'E',
            replace: true,
            scope: {
                imdb: '@',
            },
            link: function (scope: IMovieThumbScope, element : JQuery, attributes : any) {
                var img = new Image();
                console.log("thumb...");
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
module MovieApp {

    export function MovieDetailsCarousel(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: '/Partials/Movie/Movie-Details-Carousel.html',
            link: function (scope, element, attributes) {
                
            }
        }
    }
}

app.directive("movieDetailsCarousel", MovieApp.MovieDetailsCarousel); 
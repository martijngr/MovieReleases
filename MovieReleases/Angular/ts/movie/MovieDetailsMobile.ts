module MovieApp {

    export function MovieDetailsMobile(): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Partials/Movie/Movie-Details-Mobile.html',
            link: function (scope, element, attributes) {

            },
        }
    }
}

app.directive("movieDetailsMobile", MovieApp.MovieDetailsMobile); 
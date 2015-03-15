module MovieApp {
    export interface IMovieOverviewScope extends ng.IScope {
        movies: Movie[];
    }

    export function MovieOverview(): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                movies: '=',
            },
            templateUrl: "/Partials/Movie/MovieOverview.html",
            link: function (scope: IMovieOverviewScope, element: JQuery, attributes: any) {
            }
        }
    }
}

app.directive("movieOverview", MovieApp.MovieOverview); 
module MovieApp {
    export interface IMovieTooltipScope extends ng.IScope {

    }

    export function MovieTooltip($compile : ng.ICompileService): ng.IDirective {
        return {
            restrict: 'A',
            compile: function (element : JQuery, attributes : any) {
                element.attr('ng-mouseover', 'showHover($event, y)');
                element.attr('ng-mouseleave', 'hideHover()');
                element.removeAttr("movie-tooltip");
            return {
                    post: function (scope, iElement : JQuery, attributes : any) {
                        $compile(iElement)(scope);

                        scope.showHover = function ($event, movie) {
                            scope.movie = movie;
                            showTooltip($event.pageY, $event.pageX);
                        }

                        scope.hideHover = function () {
                            angular.element("#movieTooltip").remove();
                        }

                    function showTooltip(top, left) {
                            angular.element("#movieTooltip").remove();
                            var xPos = 400 + left;

                            if (xPos >= window.innerWidth) {
                                left = left - 400;
                            }

                            var template =
                                '<div class="movie-tooltip" id="movieTooltip" style="top:' + top + 'px; left:' + left + 'px;">' +
                                '<div style="font-size:0.8em;float:right;">Duur: {{movie.Duration}}min.</div>' +
                                '<b>{{movie.Title}}</b><br/>{{movie.Plot}}' +
                                '</div>';

                            var htmlCompiled = $compile(template)(scope);
                            angular.element('body').append($(htmlCompiled));
                        }
                    }
                }
        }
        }
    }

    MovieTooltip.$inject = ['$compile'];
}

app.directive("movieTooltip", MovieApp.MovieTooltip);

//angular.module('movieApp').directive("movieTooltip", ['$compile', function ($compile) {
//    return {
//        restrict: 'A',
//        compile: function (element, attributes) {
//            element.attr('ng-mouseover', 'showHover($event, y)');
//            element.attr('ng-mouseleave', 'hideHover()');
//            element.removeAttr("movie-tooltip");
//            return {
//                post: function (scope, iElement, attributes) {
//                    $compile(iElement)(scope);

//                    scope.showHover = function ($event, movie) {
//                        scope.movie = movie;
//                        showTooltip($event.pageY, $event.pageX);
//                    }

//                    scope.hideHover = function () {
//                        angular.element("#movieTooltip").remove();
//                    }

//                    function showTooltip(top, left) {
//                        angular.element("#movieTooltip").remove();
//                        var xPos = 400 + left;

//                        if (xPos >= window.innerWidth) {
//                            left = left - 400;
//                        }

//                        var template =
//                            '<div class="movie-tooltip" id="movieTooltip" style="top:' + top + 'px; left:' + left + 'px;">' +
//                            '<div style="font-size:0.8em;float:right;">Duur: {{movie.Duration}}min.</div>' +
//                            '<b>{{movie.Title}}</b><br/>{{movie.Plot}}' +
//                            '</div>';

//                        var htmlCompiled = $compile(template)(scope);
//                        angular.element('body').append($(htmlCompiled));
//                    }
//                }
//            }
//        }
//    }
//}]); 
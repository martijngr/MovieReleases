﻿module MovieApp {
    export interface IMovieTrailerScope extends ng.IScope {
        url: string;
        height: string;
        width: string;
    }

    export function MovieTrailer(): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                url: '@',
                width: '@',
                height: '@',
            },
            link: function (scope: IMovieTrailerScope, element: JQuery, attributes: any) {
                if (!scope.url) return;

                var iframe = <HTMLIFrameElement>document.createElement("IFRAME");

                iframe.src = scope.url;
                if (scope.width)
                    iframe.width = scope.width;
                if (scope.height)
                    iframe.height = scope.height;

                iframe.frameBorder = "0";
                iframe.scrolling = "false";
                iframe.setAttribute("allowfullscreen", "");

                element.parent().append(iframe);
                element.remove();
            }
        }
    }
}

app.directive("movieTrailer", MovieApp.MovieTrailer); 
module MovieApp {
    export interface IMovieTrailerScope extends ng.IScope {
        url: string;
    }

    export function MovieTrailer(): ng.IDirective {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                url: '@',
            },
            link: function (scope: IMovieTrailerScope, element: JQuery, attributes: any) {
                if (!scope.url) return;

                var iframe = <HTMLIFrameElement>document.createElement("IFRAME");

                iframe.src = scope.url;
                iframe.width = "680px";
                iframe.height = "383px";
                iframe.frameBorder = "0";
                iframe.scrolling = "false";
                
                element.parent().append(iframe);
                element.remove();
            }
        }
    }
}

app.directive("movieTrailer", MovieApp.MovieTrailer); 
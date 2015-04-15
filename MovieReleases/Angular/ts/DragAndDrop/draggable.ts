module MovieApp {

    export function Draggable($rootScope: ng.IRootScopeService): ng.IDirective {
        return {
            restrict: 'A',
            link: function (scope: IMoviePosterScope, element: JQuery, attributes: any) {
                // this gives us the native JS object
                var el = element[0];

                el.draggable = true;

                el.addEventListener(
                    'dragstart',
                    function (e) {
                        e.dataTransfer.effectAllowed = 'copy';
                        e.dataTransfer.setData('Text', attributes.draggable);

                        this.classList.add('drag');

                        $rootScope.$apply(function () {
                            $rootScope.$broadcast("onDragStart", "");
                        });

                        return false;
                    },
                    false);

                el.addEventListener(
                    'dragend',
                    function (e) {
                        this.classList.remove('drag');
                        return false;
                    },
                    false);
            }
        }
    }
}

app.directive("draggable", MovieApp.Draggable); 
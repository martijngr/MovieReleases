module MovieApp {

    export function Droppable($rootScope: ng.IRootScopeService): ng.IDirective {
        return {
            scope: {},
            link: function (scope, element) {
                // again we need the native object
                var el = element[0];

                el.addEventListener(
                    'dragover',
                    function (e) {
                        e.dataTransfer.dropEffect = 'copy';
                        // allows us to drop
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('over');
                        return false;
                    },
                    false);

                el.addEventListener(
                    'dragenter',
                    function (e) {
                        this.classList.add('over');
                        return false;
                    },
                    false);

                el.addEventListener(
                    'dragleave',
                    function (e) {
                        this.classList.remove('over');
                        return false;
                    },
                    false);

                el.addEventListener(
                    'drop',
                    function (e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();

                        this.classList.remove('over');

                        $rootScope.$apply(function () {
                            $rootScope.$broadcast('onDragDrop', e.dataTransfer.getData('Text'));
                        });

                        //var item = document.getElementById(e.dataTransfer.getData('Text'));
                        //this.appendChild(item);

                        return false;
                    },
                    false);
            }
        }
    }
}

app.directive("droppable", MovieApp.Droppable);  
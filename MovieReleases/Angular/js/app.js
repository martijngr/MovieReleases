/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts"/>
/// <reference path="../../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/toastr/toastr.d.ts" />
var app = angular.module('movieApp', ['ngRoute']);

app.config([
    '$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);

app.run([
    '$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
        $http.get("/Home/StartNotificationService");

        $rootScope.$on('$routeChangeStart', function () {
            $("#page-loader").show();
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $("#page-loader").hide();
            });

            hideMobileMenu();
        });
    }]);

function hideMobileMenu() {
    // check if window is small enough so dropdown is created
    jQuery(".navbar-collapse").removeClass("in").addClass("collapse");
}

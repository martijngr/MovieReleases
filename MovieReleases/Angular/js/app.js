/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts"/>
/// <reference path="../../Scripts/typings/underscore/underscore.d.ts"/>
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/toastr/toastr.d.ts" />
var app = angular.module('movieApp', ['ngRoute']);

app.run([
    '$http', function ($http) {
        $http.get("/Home/StartNotificationService");
    }]);

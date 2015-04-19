//module MovieApp {
//    export class ServerErrorInterceptor {

//        public static Factory($q: ng.IQService) {
//            return new ServerErrorInterceptor();
//        }

//        public requestError = (rejection) => {
//            console.warn(rejection);
//        };

//        //public responseError(rejection) {
//        //    console.log(rejection.status);
//        //    // Otherwise, default behavior
//        //    //return this.$q.reject(rejection);
//        //}
//    }
//} 

//app.service('serverErrorInterceptor', 
//app.config(['$httpProvider', ($httpProvider: ng.IHttpProvider) => {
//    $httpProvider.interceptors.push(function ($location) {
//        return {
//            'requestError': function (rejection) {
//                console.warn(rejection);
//            },

//            'responseError': function (rejection) {
//                console.warn(rejection);

//                return rejection;
//            }
//        }
//    });
//}]);
module MovieApp {
    export class FriendsService {
        public static $inject = ['$http', '$q', '$location'];

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $location : ng.ILocationService) {
        }

        public GetFriendById = function (id: number) {
            
            return this.$http.get("/api/Friends/" + id).then(this.requestSucceeded);
        }

        private requestSucceeded(response: any) {
            return response.data;
        }
    }
}

app.service("FriendsService", MovieApp.FriendsService);
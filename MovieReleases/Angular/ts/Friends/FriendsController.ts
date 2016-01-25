module MovieApp {
    export interface IFriendsControllerScope extends ng.IScope {
        friends: string[];
    }

    export interface RouteParams extends ng.route.IRouteParamsService {
        imdb: string;
    }

    export class FriendsController {
        public static $inject = ['$scope', '$routeParams', 'FriendsService'];

        private selectedFriend: Friend;
        private friends: string[];

        constructor(
            private $scope: IFriendsControllerScope,
            private $routeParams: RouteParams,
            private FriendsService: FriendsService,
            private movie: MovieApp.Movie) {

            this.friends = $scope.friends;
            //var x = $scope.friends;
        }

        public showFriendDetails(friend : Friend) {
            this.selectedFriend = friend;

            this.FriendsService.GetFriendById(friend.UserId).then((response) => {
                this.selectedFriend = response;
            });
        }
    }

    app.controller("FriendsController", MovieApp.FriendsController);
} 
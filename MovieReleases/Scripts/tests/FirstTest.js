/// <reference path="../jasmine.js" />
/// <reference path="../angular.js" />
/// <reference path="../angular-route.js" />
/// <reference path="../angular-mocks.js" />
/// <reference path="../min/all.min.js" />

describe("My first jasmine test", function () {
    it('should be working, at least i hop so...', function () {
        expect(true).toBe(true);
    });

    it('should be test 2', function () {
        var x1 = 1;
        var y2 = 2;
        var result = x1 + y2;

        expect(result).toBe(3);
    })
})

describe("Movie overview controller", function () {

    // ['$scope', 'movies', 'DownloadListService'];
    var $rootScope, $scope, movies, service, http;

    beforeEach(module("movieApp"));

    beforeEach(inject(function (_$rootScope_, _$controller_, DownloadListService, $httpBackend) {
        //debugger;
        service = DownloadListService;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        movies = [];
        http = $httpBackend;

        $controller('MovieOverviewController', { '$scope': $scope, 'movies': movies, 'DownloadListService': service });
    }));

    it('should have created a movies array on the scope', function () {
        //debugger;
        expect($scope.movies).not.toBeNull();
        expect(service).not.toBeNull();
    })

    it('should make a call to retrieve the movies to download', function () {
        //debugger;
        var mockedMovies = [{ id: 1, name: 'That time already?' }];

        http.expectGET('/api/DownloadList/').respond(200, mockedMovies);

        service.GetMoviesToDownload().then(function (response) {
            //debugger;
            expect(response.length > 0);
        });

        http.flush();
    })
})
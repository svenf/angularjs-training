/// <reference path="angular.js" />
/// <reference path="angular-route.js" />

var app = angular.module('motownFestival', ['ngRoute', 'motownFestival.tickets', 'motownFestival.lineup']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/home', { templateUrl: '/partials/home.html' });
    $routeProvider.when('/lineup', { templateUrl: '/partials/lineup.html', controller: 'LineUpCtrl', resolve: { schedule: LineUpCtrl.loadSchedule } });
    $routeProvider.when('/tickets', { templateUrl: '/partials/tickets.html', controller: 'TicketOrderCtrl' });
    $routeProvider.when('/practical', { templateUrl: '/partials/practical.html' });
    $routeProvider.when('/admin', { templateUrl: '/partials/admin.html' });
    $routeProvider.otherwise({ redirectTo: '/home' });

    $locationProvider.html5Mode(true);
}]);

app.controller('IndexCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

    $scope.isCurrentLocation = function (path) {
        return $location.path().substr(0, path.length) === path;
    }

    $rootScope.$on('$routeChangeError', function (e, current, previous, rejection) {
        console.log('Route Change Error');
        console.log(rejection);
    });

}]);


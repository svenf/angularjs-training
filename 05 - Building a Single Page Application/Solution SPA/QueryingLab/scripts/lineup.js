/// <reference path="angular.js" />
/// <reference path="data.js" />

var LineUpCtrl = angular.module('motownFestival.lineup', []).
  controller('LineUpCtrl', ['$scope','$route', function ($scope, $route) {
    $scope.model = {};

    $scope.model.schedule = $route.current.locals.schedule.data;
  }]);

LineUpCtrl.loadSchedule = function ($http) {
  return $http.get('http://u2uwapi.azurewebsites.net/api/schedule');
}
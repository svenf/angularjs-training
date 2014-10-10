var app = angular.module("app", []);

app.controller("appCtrl", function ($scope, $timeout) {
  $scope.data = {};
  $scope.data.location = { lat: 50.88, lon: 4.3 };
  $scope.data.search = "";

  $scope.geoCode = function () {
    if ($scope.data.search && $scope.data.search.length > 0) {
      if (!$scope.geocoder) $scope.geocoder = new google.maps.Geocoder();

      $scope.geocoder.geocode({ 'address': $scope.data.search }, function (results, status) {
        $timeout(function () {
          if (status == google.maps.GeocoderStatus.OK) {
            var loc = results[0].geometry.location;
            $scope.data.search = results[0].formatted_address;
            $scope.data.location = { lat: loc.lat(), lon: loc.lng() };
          } else {
            alert("Sorry, this search produced no results.");
          }
        });
      });

    }
  };
});

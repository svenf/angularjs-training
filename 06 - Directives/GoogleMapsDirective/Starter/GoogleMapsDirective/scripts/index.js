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

app.directive("appMap", function ($timeout) {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        scope: {
            center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            zoom: "=",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
        },
        link: function (scope, element, attrs) {
            var map, centerPromise;

            createMap();

            scope.$watch("center", function () {
                if (map && scope.center)
                    map.setCenter(getLocation(scope.center));
            });

            // create the map
            function createMap() {

                // get map options
                var options =
                {
                    center: new google.maps.LatLng(50.88, 4.3),
                    zoom: 6,
                    mapTypeId: "roadmap"
                };
                if (scope.center) options.center = getLocation(scope.center);
                if (scope.zoom) options.zoom = scope.zoom * 1;

                // create the map
                map = new google.maps.Map(element[0], options);

                // listen to changes in the center property and update the scope
                google.maps.event.addListener(map, 'center_changed', function () {

                    if (centerPromise) $timeout.cancel(centerPromise);
                    centerPromise = $timeout(function () {
                        scope.center = { lat: map.center.lat(), lon: map.center.lng() };
                    }, 500);
                });
            }

            // convert current location to Google maps location
            function getLocation(loc) {
                return new google.maps.LatLng(loc.lat, loc.lon);
            }

        }
    };
});

app.filter('formatLocation', function () {
    return function (input) {
        var graden = input.substring(',') + '°';
        return graden;
    }
});

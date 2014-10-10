/// <reference path="angular.js" />
/// <reference path="data.js" />

angular.module('motownFestival.tickets', []).
  controller('TicketOrderCtrl', ['$scope', function ($scope) {
    $scope.model = {};

    //ticketlines
    $scope.model.ticketLines = data.ticketLines;

    $scope.getLinePrice = function (ticketLine) {
      return ticketLine.pricePerTicket * ticketLine.quantity;
    }

    $scope.getTotalPrice = function () {
      var total = 0;

      angular.forEach($scope.model.ticketLines, function (ticketLine) {
        total += $scope.getLinePrice(ticketLine);
      });

      return total;
    }

    $scope.resetLine = function (ticketLine) {
      if (ticketLine.isChecked) {
        ticketLine.quantity = 1;
      } else {
        ticketLine.quantity = 0;
      }
    }

    //shirts
    $scope.model.shirtIndex = 0;
    $scope.model.shirt = data.shirts[$scope.model.shirtIndex];

    $scope.rotateShirt = function () {
      $scope.model.shirtIndex = ($scope.model.shirtIndex + 1) % data.shirts.length;
      $scope.model.shirt = data.shirts[$scope.model.shirtIndex];
    }
  }]);

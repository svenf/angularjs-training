/// <reference path="angular.min.js" />
function TicketOrderCtrl($scope) {
    $scope.model = {};

    //ticketslines
    $scope.model.ticketLines = data.ticketLines;

    $scope.resetLine = function (ticketLine) {
        if (ticketLine.isChecked) {
            ticketLine.quantity = 1;
        }
        else {
            ticketLine.quantity = 0;
        }
    };

    $scope.getLinePrice = function (ticketLine) {
        return ticketLine.pricePerTicket * ticketLine.quantity;
    };

    $scope.getTotalPrice = function () {
        var total = 0;

        angular.forEach($scope.model.ticketLines, function (ticketLine) {
            total += $scope.getLinePrice(ticketLine);
        });

        return total;
    };

    $scope.model.shirtIndex = 0;
    $scope.model.shirt = data.shirts[$scope.model.shirtIndex];

    $scope.changeTshirt = function () {
        if ($scope.model.shirtIndex < 2) {
            $scope.model.shirtIndex++;
        }
        else $scope.model.shirtIndex = 0;
        $scope.model.shirt = data.shirts[$scope.model.shirtIndex];
    };
}
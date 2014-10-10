angular.module('app', ['app.products']).
controller('appCtrl', ['$scope', 'Products', function ($scope, Products) {
  $scope.data = {};
  $scope.data.id = 1;

  $scope.fetch = function () {
    $scope.data.feedback = 'loading';
    Products.get({ id: $scope.data.id }, function (product) {
      $scope.data.product = product;
      $scope.data.feedback = 'fetch completed';
    });
  };

  $scope.update = function () {
    $scope.data.feedback = 'updating';
    Products.update($scope.data.product, function(product) {
      $scope.data.product = product;
      $scope.data.feedback = 'update completed';
    });
  }

  $scope.fetch($scope.data.id);
}]);
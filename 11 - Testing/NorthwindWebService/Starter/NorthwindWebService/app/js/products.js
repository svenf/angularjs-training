angular.module('app.products', ['ngResource']).
factory('Products', ['$resource', function ($resource) {
    var Products = $resource('http://services.odata.org/V3/Northwind/Northwind.svc/Products(:id)?$format=json',
                            { id: '@ProductID' }, {'update': {method: "PUT"} });
  return Products;
}]);
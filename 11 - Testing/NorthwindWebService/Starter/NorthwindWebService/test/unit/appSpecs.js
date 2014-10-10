/// <reference path="../lib/angular/angular-mocks.js" />
describe('appCtrl', function () {
    var mockingProductsService;

    beforeEach(module('app'));
    beforeEach(function () {
        mockingProductsService = {
            get: function (options, callback) {
                options = options || { id: 1 };

                var product = {
                    ProductID: options.id || 1,
                    ProductName: 'Chai',
                    UnitPrice: '18.000',
                    Discontinued: false
                };

                callback(product);
            },
            update: function (product, callback) {
                callback(product);
            }
        };
    })
    //add tests here
    it('should fetch the product', inject(function ($controller, $rootScope) {
        //Arrange
        var $scope = $rootScope.$new();
        var ctrl = $controller('appCtrl', { $scope: $scope, Products: mockingProductsService });

        $scope.data.id = 7;
        //Act
        $scope.fetch();

        //Assert
        expect($scope.data.product.ProductID).toBe(7);
        expect($scope.data.product.ProductName).toBe('Chai');
        expect($scope.data.product.UnitPrice).toBe('18.000');
        expect($scope.data.product.Discontinued).toBe(false);
        expect($scope.data.feedback).toBe('fetch completed');
    }));

    it('should update the product', inject(function ($controller, $rootScope) {
        //Arrange
        var $scope = $rootScope.$new();
        var ctrl = $controller('appCtrl', { $scope: $scope, Products: mockingProductsService });

        //Act
        $scope.update();

        //Assert        
        expect($scope.data.feedback).toBe('update completed');
    }));
});
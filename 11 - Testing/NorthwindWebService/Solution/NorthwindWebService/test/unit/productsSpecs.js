describe('Product Service', function () {
  var $httpBackend,
    mockProduct;

  beforeEach(module('app.products'));
  beforeEach(function () {
    mockProduct = {
      ProductID: 1,
      ProductName: 'Chai',
      UnitPrice: '18.000',
      Discontinued: false
    };
  });

  beforeEach(inject(function (_$httpBackend_) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', 'http://services.odata.org/V3/Northwind/Northwind.svc/Products(1)?$format=json')
                .respond(200, mockProduct);
    $httpBackend.when('PUT', 'http://services.odata.org/V3/Northwind/Northwind.svc/Products(1)?$format=json')
                .respond(200, mockProduct);
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should get the product', inject(function (Products) {
    var result;
    $httpBackend.expect('GET', 'http://services.odata.org/V3/Northwind/Northwind.svc/Products(1)?$format=json');

    Products.get({ id: 1 }, function (product) {
      result = product;
    });
    $httpBackend.flush();

    expect(result.ProductID).toBe(1);
    expect(result.ProductName).toBe('Chai');
    expect(result.UnitPrice).toBe('18.000');
    expect(result.Discontinued).toBe(false);
  }));

  it('should update the product', inject(function (Products) {
    var result;
    var updated = angular.copy(mockProduct);
    updated.ProductName = 'NameChanged';

    $httpBackend.expect('GET', 'http://services.odata.org/V3/Northwind/Northwind.svc/Products(1)?$format=json');
    $httpBackend.expect('PUT', 'http://services.odata.org/V3/Northwind/Northwind.svc/Products(1)?$format=json', updated)
                .respond(200, updated);

    Products.get({ id: 1 }, function (product) {
      product = product;
      product.ProductName = 'NameChanged';
      product.$update(function (resp) {
        result = resp;
      });
    });
    $httpBackend.flush();

    expect(result).toEqual(jasmine.objectContaining(updated));
  }));

});
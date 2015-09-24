(function () {
    'use strict';

    angular.module('acctApp')
        .controller('InvoiceController', ['$scope', '$http', '$location', 'customerSrv','invoiceSvc', 'settings',
            function ($scope, $http, $location, customerSrv,invoiceSvc, settings) {

                var pageSize = settings.pageSize;
                $scope.pageSize = pageSize;
                $scope.currentPage = 1;
                $scope.maxSize = 10;
                $scope.page.setTitle('Invoice');

                get($scope.currentPage, pageSize);
                function get(currentPage, pageSize) {
                    invoiceSvc.list.query({ page: currentPage, pagesize: pageSize }, function (data, headers) {
                        $scope.invoices = data;
                        var Pagination = angular.fromJson(headers('X-Pagination'));
                        var TotalCount = Pagination.TotalCount;
                        var TotalPages = Pagination.TotalPages;

                        $scope.totalItems = TotalCount;
                        $scope.totalPages = TotalPages;
                    });
                }
                $scope.pageChanged = function () {
                    get($scope.currentPage, pageSize);
                };

                $scope.lookup = function (q) {
                    return customerSrv.lookup.query({ q: q, limit: 10 }).$promise.then(function (data) {
                        return data;
                    });
                };

                $scope.onSelect = function ($item, $model, $label) {
                    $scope.$item = $item;
                    $scope.$model = $model;
                    $scope.$label = $label;

                    var id = $item.id;
                    $location.path('/invoice/' + id);
                };

                

            }])
        .controller('InvoiceDetailController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location, customerSrv, invoiceSvc) {
                    $scope.invoice = null;
                    invoiceSvc.detail.query({ id: $routeParams.id }).$promise.then(function (data) {
                        $scope.invoice = data;
                        $scope.page.setTitle('Invoice ' + $scope.invoice.OrderNumber);
                    });
                }])
    .controller('InvoiceEditController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'invoiceSvc',
               function ($scope, $routeParams, $location, customerSrv, invoiceSvc) {

                   $scope.invoice = null;
                   invoiceSvc.detail.query({ id: $routeParams.id }).$promise.then(function (data) {
                       $scope.invoice = data;
                       $scope.page.setTitle('Edit Invoice ' + $scope.invoice.OrderNumber);
                   });

                   $scope.CustomerList = customerSrv.list.query();
                   $scope.edit = function () {
                       
                       $scope.invoice.$save(
                           // success
                           function () {
                               $location.path('/invoice/' + $routeParams.id);
                           },
                           // error
                           function (error) {
                               //_showValidationErrors($scope, error);
                           }
                       );
                   };

                   $scope.getCustomer = function (val) {
                       return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                           params: {
                               address: val,
                               sensor: false
                           }
                       }).then(function (response) {
                           return response.data.results.map(function (item) {
                               return item.formatted_address;
                           });
                       });
                   };

                }]);
})();





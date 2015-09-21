﻿(function () {
    'use strict';

    angular.module('acctApp')
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

                   //$scope.GSTList = GSTSrv.list.query();
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





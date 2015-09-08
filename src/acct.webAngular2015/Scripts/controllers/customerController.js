(function () {
    'use strict';

    angular.module('acctApp')
        .controller('CustomerController', ['$scope', 'customerSrv',
            function ($scope, customerSrv) {

                //$scope.customers = customerSrv.query({ start: 0, limit: 10 });
                $scope.customers = null;
                customerSrv.query({ start: 0, limit: 10 }).$promise.then(function (data) {
                    $scope.customers = data;
                    $scope.page.setTitle('Customers');
                });
                
            }])
        .controller('CustomerDetailController', ['$scope', '$routeParams', '$location', 
            'customerSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location,customerSrv, invoiceSvc) {

                    //$scope.customer = customerSrv.detail({ id: $routeParams.id });
                    $scope.transactions = invoiceSvc.query({ id: $routeParams.id });
                    $scope.customer = null;
                    customerSrv.detail({ id: $routeParams.id }).$promise.then(function (data) {
                        $scope.customer = data;
                        $scope.page.setTitle($scope.customer.Name);
                    });

                    angular.element(document).ready(function () {
                        $('#myTab a:first').tab('show');
                    });

                }]);

})();





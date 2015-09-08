(function () {
    'use strict';

    angular.module('acctApp')
        .controller('CustomerController', ['$scope', 'customerSrv',
            function ($scope, customerSrv) {

                //$scope.customers = customerSrv.query({ start: 0, limit: 10 });
                $scope.customers = null;
                customerSrv.query({ start: 0, limit: 10 }).then(function (data) {
                    $scope.customers = data;
                });
                $scope.page.setTitle('Customers');
            }])
        .controller('CustomerDetailController', ['$scope', '$routeParams', '$location', 
            'customerSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location,customerSrv, invoiceSvc) {

                    $scope.customer = customerSrv.detail({ id: $routeParams.id });
                    $scope.transactions = invoiceSvc.query({ id: $routeParams.id });


                    customerSrv.detail({ id: $routeParams.id }).then(function (data) {
                        console.log($scope.data.Name)
                        $scope.page.setTitle($scope.data.Name);
                    });

                    

                    angular.element(document).ready(function () {
                        $('#myTab a:first').tab('show');
                    });

                }]);

})();





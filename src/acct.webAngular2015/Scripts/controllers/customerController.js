(function () {
    'use strict';

    var myApp = angular.module('acctApp');

    myApp.controller('CustomerController', CustomerController);

    CustomerController.$inject = ['$scope', 'customerSrv'];

    function CustomerController($scope, customerSrv) {
        $scope.customers = customerSrv.query({ start: 0, limit: 10 });
    }


    myApp.controller('CustomerDetailController', CustomerDetailController);

    CustomerDetailController.$inject = ['$scope',  'customerService'];

    function CustomerDetailController($scope,$location, customerService) {
        $scope.customer = customerService.detail({ id: 4 });
    }

})();





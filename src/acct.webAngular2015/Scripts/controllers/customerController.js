(function () {
    'use strict';

    angular
        .module('acctApp')
        .controller('customerController', customerController);

    customerController.$inject = ['$scope', 'customerService'];

    function customerController($scope, customerService) {
        $scope.title = 'customerController';
        $scope.customers = customerService.query();
        activate();

        function activate() { }
    }
})();

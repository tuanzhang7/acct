(function () {
    'use strict';

    angular.module('acctApp')
        .controller('InvoiceDetailController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location, customerSrv, invoiceSvc) {
                    $scope.invoice = null;
                    invoiceSvc.detail.query({ id: $routeParams.id }).$promise.then(function (data) {
                        console.log(data);
                        $scope.invoice = data;
                        $scope.page.setTitle('Invoice '+$scope.invoice.OrderNumber);
                    });
                }]);
})();





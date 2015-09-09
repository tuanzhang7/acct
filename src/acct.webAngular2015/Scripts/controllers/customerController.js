(function () {
    'use strict';

    angular.module('acctApp')
        .controller('CustomerController', ['$scope', 'customerSrv', 'settings',
            function ($scope, customerSrv, settings) {
                console.log(settings.baseUrl);
                //$scope.customers = customerSrv.query({ start: 0, limit: 10 });
                $scope.customers = null;
                customerSrv.list.query({ start: 0, limit: 10 }).$promise.then(function (data) {
                    $scope.customers = data;
                    $scope.page.setTitle('Customers');
                });

            }])
        .controller('CustomerDetailController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location, customerSrv, invoiceSvc) {

                    $scope.transactions = invoiceSvc.query({ id: $routeParams.id });
                    $scope.balance = customerSrv.balance.query({ id: $routeParams.id });

                    $scope.customer = null;
                    customerSrv.detail.query({ id: $routeParams.id }).$promise.then(function (data) {
                        $scope.customer = data;
                        $scope.page.setTitle($scope.customer.Name);
                    });

                    angular.element(document).ready(function () {
                        $('#myTab a:first').tab('show');
                    });

                }])
        .controller('CustomerEditController', ['$scope', '$routeParams', '$location',
            'customerSrv','GSTSrv',
                function ($scope, $routeParams, $location, customerSrv, GSTSrv) {

                    $scope.customer = null;
                    customerSrv.detail.query({ id: $routeParams.id }).$promise.then(function (data) {
                        $scope.customer = data;
                        $scope.page.setTitle($scope.customer.Name);
                    });
                    $scope.GSTList = GSTSrv.list.query();
                    $scope.edit = function () {
                      //  $http({
                      //      method: 'POST',
                      //      url: 'process.php',
                      //      data: $.param($scope.formData),  // pass in data as strings
                      //      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                      //  })
                      //.success(function (data) {
                      //    console.log(data);

                      //    if (!data.success) {
                      //         if not successful, bind errors to error variables
                      //        $scope.errorName = data.errors.name;
                      //        $scope.errorSuperhero = data.errors.superheroAlias;
                      //    } else {
                      //         if successful, bind success message to message
                      //        $scope.message = data.message;
                      //    }
                      //});

                        $scope.customer.$save(
                            // success
                            function () {
                                console.log("saving...");
                                $location.path('/customer/' + $routeParams.id);
                            },
                            // error
                            function (error) {
                                //_showValidationErrors($scope, error);
                            }
                        );
                    };

                }]);
})();





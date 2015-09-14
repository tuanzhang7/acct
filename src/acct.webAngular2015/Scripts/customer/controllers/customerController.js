(function () {
    'use strict';

    angular.module('acctApp')
        .controller('CustomerController', ['$scope', '$http', 'customerSrv', 'settings',
            function ($scope, $http, customerSrv, settings) {

                var pageSize = settings.pageSize;
                $scope.pageSize = pageSize;

                $scope.currentPage = 1;
                $scope.maxSize = 10;
                $scope.page.setTitle('Customers');

                get($scope.currentPage, pageSize);
                function get(currentPage, pageSize) {
                    //$http({ method: 'GET', url: 'http://localhost:63267/api/Customer', params: { page: $scope.currentPage, pagesize: pageSize } }
                    //    ).then(function (response) {

                    //        var Pagination = angular.fromJson(response.headers('X-Pagination'));
                    //        var TotalCount = Pagination.TotalCount;
                    //        var TotalPages = Pagination.TotalPages;

                    //        //console.log(response.headers('X-Pagination'));
                    //        //console.log(Pagination);

                    //        $scope.totalItems = TotalCount;
                    //        $scope.totalPages = TotalPages;
                    //        $scope.customers = response.data;
                    //    }, function (response) {
                    //        $scope.data = response.data || "Request failed";
                    //        $scope.status = response.status;
                    //    });
                    customerSrv.list.query({ page: currentPage, pagesize: pageSize }, function (data, headers) {
                        $scope.customers = data;
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


                }])
        .controller('CustomerCreateController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'GSTSrv',
                function ($scope, $routeParams, $location, customerSrv, GSTSrv) {
                    $scope.page.setTitle('Create Customer');
                    $scope.GSTList = GSTSrv.list.query();
                    $scope.create = function () {
                        $scope.customer.$save(
                            // success
                            function () {
                                $location.path('/customer/' + $routeParams.id);
                            },
                            // error
                            function (error) {
                                //_showValidationErrors($scope, error);
                            }
                        );
                    };


                }])
        .controller('CustomerEditController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'GSTSrv',
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





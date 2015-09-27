(function () {
    'use strict';

    angular.module('acctApp')
        .controller('CustomerController', ['$scope', '$http','$location', 'customerSrv', 'settings',
            function ($scope, $http, $location, customerSrv, settings) {

                var pageSize = settings.pageSize;
                $scope.pageSize = pageSize;

                $scope.currentPage = 1;
                $scope.maxSize = 10;
                $scope.page.setTitle('Customers');

                get($scope.currentPage, pageSize);
                function get(currentPage, pageSize) {
                    customerSrv.list.query({ page: currentPage, pagesize: pageSize }, function (data, headers) {
                        console.log(headers('X-Pagination'));
                        console.log(data);
                        $scope.customers = data;
                        var Pagination = angular.fromJson(headers('X-Pagination'));
                        var TotalCount =100 //Pagination.TotalCount;
                        var TotalPages = 10;//Pagination.TotalPages;
                        

                        $scope.totalItems = TotalCount;
                        $scope.totalPages = TotalPages;
                    });
                }

                $scope.lookup = function (q) {
                    return customerSrv.lookup.query({ q: q, limit: 10 }).$promise.then(function (data) {
                        //console.log(data);
                        return data;
                    });
                };

                $scope.onSelect = function ($item, $model, $label) {
                    $scope.$item = $item;
                    $scope.$model = $model;
                    $scope.$label = $label;

                    //console.log("$item" + $item.id);
                    //console.log("$model" + $model);
                    //console.log("$label" + $label);

                    var id = $item.id;
                    $location.path('/customer/' + id);
                };

                $scope.pageChanged = function () {
                    get($scope.currentPage, pageSize);
                };

            }])
        .controller('CustomerDetailController', ['$scope', '$routeParams', '$location',
            'customerSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location, customerSrv, invoiceSvc) {

                    $scope.transactions = invoiceSvc.listByCustomer.query({ id: $routeParams.id });
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

                    $scope.customer = null;

                    $scope.GSTList = null;
                    GSTSrv.list.query().$promise.then(function (data) {
                        $scope.GSTList = data;
                        $scope.customer = { idmas_GST: data[0].Id };
                    });
                    
                    $scope.create = function () {
                        console.log($scope.customer.Name);
                        customerSrv.detail.create($scope.customer).$promise.then(function (data) {
                            //console.log(data.Id);
                            var newId = data.Id;
                            $location.path('/customer/' + newId);
                        });
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





(function () {
    'use strict';

    angular.module('acctApp')
        .controller('GSTController', ['$scope', 'GSTSrv',
            function ($scope, GSTSrv) {

                //$scope.GSTs = GSTSrv.query({ start: 0, limit: 10 });
                $scope.GSTs = null;
                GSTSrv.list.query({ start: 0, limit: 10 }).$promise.then(function (data) {
                    $scope.GSTs = data;
                    $scope.page.setTitle('GSTs');
                });

            }])
        .controller('GSTDetailController', ['$scope', '$routeParams', '$location',
            'GSTSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location, GSTSrv, invoiceSvc) {

                    $scope.transactions = invoiceSvc.query({ id: $routeParams.id });
                    $scope.balance = GSTSrv.balance.query({ id: $routeParams.id });

                    $scope.GST = null;
                    GSTSrv.detail.query({ id: $routeParams.id }).$promise.then(function (data) {
                        $scope.GST = data;
                        $scope.page.setTitle($scope.GST.Name);
                    });

                }])
        .controller('GSTEditController', ['$scope', '$routeParams', '$location',
            'GSTSrv',
                function ($scope, $routeParams, $location, GSTSrv) {

                    $scope.GST = null;
                    GSTSrv.detail.query({ id: $routeParams.id }).$promise.then(function (data) {
                        $scope.GST = data;
                        $scope.page.setTitle($scope.GST.Name);
                    });

                    $scope.edit = function () {
                      
                        $scope.GST.$save(
                            // success
                            function () {
                                console.log("saving...");
                                $location.path('/GST/' + $routeParams.id);
                            },
                            // error
                            function (error) {
                                //_showValidationErrors($scope, error);
                            }
                        );
                    };

                }]);

    
})();





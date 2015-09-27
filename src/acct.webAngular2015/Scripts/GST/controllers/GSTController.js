(function () {
    'use strict';

    angular.module('acctApp')
        .controller('GSTController', ['$scope', 'GSTSrv',
            function ($scope, GSTSrv) {
                $scope.page.setTitle('GST');
                GSTSrv.list.query({}, function (data, headers) {
                    $scope.GSTs = data;
                });
                
            }])
        .controller('GSTDetailController', ['$scope', '$routeParams', '$location',
            'GSTSrv', 'invoiceSvc',
                function ($scope, $routeParams, $location, GSTSrv) {
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





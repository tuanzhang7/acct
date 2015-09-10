(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider'];

    

    angular.module('acctApp', [
        'ngRoute',
        'customerServices',
        'invoiceServices',
        'GSTServices'
    ])
    .constant('settings', {
        baseUrl: 'http://localhost:63267/api',
        pageSize:20
    })
    .config(config)
    .run(['$rootScope', function ($rootScope) {
        $rootScope.page = {
            setTitle: function (title) {
                this.title = title;
            }
        }
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.page.setTitle(current.$$route.title);
        });
    }]);



    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/customer', {
                templateUrl: '/views/customer/list.html',
                controller: 'CustomerController'
            })
            .when('/customer/:id', {
                templateUrl: '/views/customer/detail.html',
                controller: 'CustomerDetailController'
            })
            .when('/customer/edit/:id', {
                templateUrl: '/views/customer/edit.html',
                controller: 'CustomerEditController'
            })
            .when('/GST', {
                templateUrl: '/views/gst/list.html',
                controller: 'GSTController'
            })
            .when('/GST/:id', {
                templateUrl: '/views/gst/detail.html',
                controller: 'GSTDetailController'
            })
            .when('/GST/edit/:id', {
                templateUrl: '/views/gst/edit.html',
                controller: 'GSTEditController'
            })
            .otherwise({
                redirectTo: '/customer'
            });

        $locationProvider.html5Mode(true);
    }

    /* Utility Functions */

    function _showValidationErrors($scope, error) {
        $scope.validationErrors = [];
        if (error.data && angular.isObject(error.data)) {
            for (var key in error.data) {
                $scope.validationErrors.push(error.data[key][0]);
            }
        } else {
            $scope.validationErrors.push('Could not add movie.');
        };
    }

})();
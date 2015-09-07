(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('acctApp', [
        'ngRoute',
        'customerServices'
    ]).config(config);


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
            .otherwise({
                redirectTo: '/customer'
            });

        $locationProvider.html5Mode(true);
    }
})();
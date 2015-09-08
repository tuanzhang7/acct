(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('acctApp', [
        'ngRoute',
        'customerServices',
        'invoiceServices'
    ])
        .config(config)
    .run(['$rootScope', function ($rootScope) {
        $rootScope.page = {
            setTitle: function (title) {
                this.title = title;
            }
        }
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.page.setTitle(current.$$route.title || 'Default Title');
        });
    }]);;


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
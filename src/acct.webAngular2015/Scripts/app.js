(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('acctApp', [
        'ngRoute',
        'ui.bootstrap',
        'customerServices',
        'invoiceServices',
        'GSTServices'
    ])
    .constant('settings', {
        baseUrl: 'http://localhost:63267/api',
        pageSize:10
    })
    .config(config)
    .config(['datepickerConfig','datepickerPopupConfig', function (datepickerConfig, datepickerPopupConfig) {
        datepickerConfig.showWeeks = false;
        datepickerPopupConfig.showButtonBar = false;
        datepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
    }])
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
            .when('/', {
                templateUrl: '/views/home/index.html',
                controller: 'HomeController'
            })
            .when('/customer', {
                templateUrl: '/views/customer/list.html',
                controller: 'CustomerController'
            })
            .when('/customer/create', {
                templateUrl: '/views/customer/create.html',
                controller: 'CustomerCreateController'
            })
            .when('/customer/:id', {
                templateUrl: '/views/customer/detail.html',
                controller: 'CustomerDetailController'
            })
            .when('/customer/edit/:id', {
                templateUrl: '/views/customer/edit.html',
                controller: 'CustomerEditController'
            })
            .when('/invoice', {
                templateUrl: '/views/invoice/list.html',
                controller: 'InvoiceController'
            })
            .when('/invoice/:id', {
                templateUrl: '/views/invoice/detail.html',
                controller: 'InvoiceDetailController'
            })
            .when('/invoice/edit/:id', {
                templateUrl: '/views/invoice/edit.html',
                controller: 'InvoiceEditController'
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
                redirectTo: '/'
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
angular.module('acctApp')
.directive('orderDetails', function () {
    return {
        //restrict: 'E',
        scope: {
            order: '=order'
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderDetails.html';
        }
    };
}).directive('orderLines', function () {
    return {
        //restrict: 'E',
        scope: {
            lines: '=lines'
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderLines.html';
        }
    };
}).directive('orderList', function () {
    return {
        //restrict: 'E',
        scope: {
            orders: '=orders',
            skipCustomer:'=skipCustomer'
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderList.html';
        }
    };
}).directive('orderForm', function () {
    return {
        //restrict: 'E',
        scope: {
            order: '=order'
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderForm.html';
        }
    };
});
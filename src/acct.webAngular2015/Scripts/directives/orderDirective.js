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
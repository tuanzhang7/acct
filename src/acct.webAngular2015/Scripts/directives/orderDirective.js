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
}).directive('orderLinesForm', function () {
    var link = function (scope, element, attrs) {
        scope.addRow = function () {
            scope.lines.push(
            {
                Qty: 0,
                UnitPrice: 0,
                Discount: 0
            });
        }
    };

    return {
        //restrict: 'E',
        scope: {
            lines: '=lines'
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderLinesForm.html';
        },
        link: link
    };
}).directive('orderForm', function () {
    return {
        //restrict: 'E',
        scope: {
            order: '=order',
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderForm.html';
        }
    };
});
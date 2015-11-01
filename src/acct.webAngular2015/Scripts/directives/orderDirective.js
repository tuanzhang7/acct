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
}).directive('orderLinesForm',['commonSrv', function (commonSrv) {
    var link = function (scope, element, attrs) {

        scope.addRow = function () {
            scope.lines.push(
            {
                Qty: 0,
                UnitPrice: 0,
                Discount: 0
            });
        };

        scope.removeRow = function(idx){

            scope.lines.splice( idx, 1 );
        };

        scope.calcTotal=commonSrv.calcTotal;

        scope.getTotal = function(){
            var total = 0;
            if(scope.lines){
                for(var i = 0; i < scope.lines.length; i++){
                    var line = scope.lines[i];
                    total += commonSrv.calcTotal(line.Qty,line.UnitPrice,line.Discount);
                }
            }
            return total;
        };
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
}]).directive('orderForm', function () {
    return {
        //restrict: 'E',
        scope: {
            order: '=',
            customers:'=',
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderForm.html';
        }
    };
});
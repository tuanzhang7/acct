angular.module('acctApp')
.directive('orderDetails', function () {
    console.log('directive');
    return {
        //restrict: 'E',
        scope: {
            order: '=order'
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_orderDetails.html';
        }
    };
});
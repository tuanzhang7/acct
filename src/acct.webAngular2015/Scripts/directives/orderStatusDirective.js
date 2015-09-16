angular.module('acctApp')
.directive('orderStatus', function () {
    console.log('directive');
    return {
        //restrict: 'E',
        scope: {
            status: '=status'
        },
        templateUrl: function (elem, attr) {
            return  '/views/directives/_status.html';
        }
    };
});
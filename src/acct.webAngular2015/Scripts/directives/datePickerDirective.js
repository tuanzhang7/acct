angular.module('acctApp')
.directive('datePicker', function () {
    return {
        //restrict: 'E',
        scope: {
            date: '=date'
        },
        templateUrl: function (elem, attr) {
            return  '/views/directives/_datePicker.html';
        }
    };
});
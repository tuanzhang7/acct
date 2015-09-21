angular.module('acctApp')
.directive('datePicker', function () {
    function link(scope, element, attrs) {
        scope.status = {
            opened: false
        };
        scope.open = function ($event) {
            scope.status.opened = true;
        };
    }
    return {
        //restrict: 'E',
        scope: {
            date: '=date'
        },
        templateUrl: function (elem, attr) {
            return  '/views/directives/_datePicker.html';
        },
        link: link
    };
});
angular.module('acctApp')
.directive('dateRange', function () {
    console.log("in directive dateRange");
    return {
        //restrict: 'E',
        scope: {
            dateRangeEnum: {
                AnyTime: 0,
                ThisYear: 1,
                ThisMonth: 2,
                Last3Month: 3,
                Last7Days: 4,
                Last365Days: 5,
            }
        },
        templateUrl: function (elem, attr) {
            return '/views/directives/_dataRangeDropdown.html';
        }
    };
});
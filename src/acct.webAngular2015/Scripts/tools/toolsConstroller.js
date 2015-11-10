/**
 * Created by tuanzhang on 10/11/2015.
 */
(function () {
    'use strict';

    angular.module('acctApp')
        .controller('toolsImportDataController', ['$scope', '$routeParams', '$location',

            function ($scope, $routeParams, $location) {
                $scope.page.setTitle("Import data");

                $scope.import = function () {

                    var f = document.getElementById('file').files[0],
                        r = new FileReader();
                    r.onloadend = function(e){
                        var data = e.target.result;
                        //send you binary data via $http or $resource or do anything else with it
                    }
                    r.readAsBinaryString(f);
                };

            }
        ]);
})();





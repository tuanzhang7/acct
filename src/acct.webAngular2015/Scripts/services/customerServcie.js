(function () {
    'use strict';

    angular
        .module('acctApp')
        .factory('customerServcie', customerServcie);

    customerServcie.$inject = ['$http'];

    function customerServcie($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();
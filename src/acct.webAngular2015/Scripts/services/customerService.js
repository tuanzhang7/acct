(function () {
    'use strict';

    var customerServiceModule = angular.module('customerServices', ['ngResource']);

    customerServiceModule.factory('customerSrv', function ($resource) {
        var baseUrl = 'http://localhost:63267/api';

        //function query() {
        //    console.log("sss");
        //    return $resource(baseUrl+'/Customer?start=:start&limit=:limit',{},{
        //        method: 'GET',
        //        params: { start: '@start', limit: '@limit' },
        //        isArray: true,
        //        headers: { 'auth-token': 'admin 1qazxsw@' }
        //    });
        //}
        //return {
        //    query: query
        //}
        return $resource(baseUrl + '/Customer?start=:start&limit=:limit', {}, {
            query: { method: 'GET', params: { start: '@start', limit: '@limit' }, isArray: true, headers: { 'auth-token': 'admin 1qazxsw@' } }
        })
    });

    customerServiceModule.factory('customerSrv', function ($resource) {
        
        return $resource('http://localhost:63267/api/Customer/:id', {}, {
            detail: { method: 'GET', params: { id: '@id' } },
            update: { method: 'PUT', params: { id: '@id' } },
            delete: { method: 'DELETE', params: { id: '@id' } }
        })
    });

})();
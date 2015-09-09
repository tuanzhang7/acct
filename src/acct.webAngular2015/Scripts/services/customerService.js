﻿(function () {
    'use strict';

    var customerServiceModule = angular.module('customerServices', ['ngResource']);
    var baseUrl = 'http://localhost:63267/api';


    customerServiceModule.factory("customerSrv", function ($resource) {
        
        return {
            list: $resource(baseUrl + '/Customer?start=:start&limit=:limit', {}, {
                query: { method: 'GET', params: { start: '@start', limit: '@limit' }, isArray: true, headers: { 'auth-token': 'admin 1qazxsw@' } }
            }),
            detail: $resource(baseUrl + '/Customer/:id', {}, {
                query: { method: 'GET', params: { id: '@id' } },
                update: { method: 'PUT', params: { id: '@id' } },
                delete: { method: 'DELETE', params: { id: '@id' } }
            }),
            balance: $resource(baseUrl + '/customer/:id/balance', {}, {
                query: { method: 'GET', params: { id: '@id' } }
            })
        };
    });

    //customerServiceModule.factory('customerSrv', function ($resource) {

    //    return $resource(baseUrl + '/Customer?start=:start&limit=:limit', {}, {
    //        query: { method: 'GET', params: { start: '@start', limit: '@limit' }, isArray: true, headers: { 'auth-token': 'admin 1qazxsw@' } }
    //    })
    //});

    //customerServiceModule.factory('customerSrv', function ($resource) {
    //    return $resource(baseUrl + '/customer/:id/balance', {}, {
    //        balance: { method: 'GET', params: { id: '@id' } }
    //    })
    //});

    //customerServiceModule.factory('customerSrv', function ($resource) {

    //    return $resource(baseUrl + '/Customer/:id', {}, {
    //        detail: { method: 'GET', params: { id: '@id' } },
    //        update: { method: 'PUT', params: { id: '@id' } },
    //        delete: { method: 'DELETE', params: { id: '@id' } }
    //    })
    //});

    

})();
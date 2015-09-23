(function () {
    'use strict';

    var invoiceServiceModule = angular.module('invoiceServices', ['ngResource']);

    invoiceServiceModule.factory('invoiceSvc', function ($resource, settings) {
        var baseUrl = settings.baseUrl;
       
        return {
            list: $resource(baseUrl + '/invoice?page=:page&pagesize=:pagesize', {}, {
                query: { method: 'GET', params: { page: '@page', pagesize: '@pagesize' }, isArray: true, headers: { 'auth-token': 'admin 1qazxsw@' } }
            }),
            listByCustomer: $resource(baseUrl + '/invoice/customer/:id', {}, {
                query: { method: 'GET', params: { id: '@id' }, isArray: true, headers: { 'auth-token': 'admin 1qazxsw@' } }
            }),
            detail: $resource(baseUrl + '/invoice/:id', {}, {
                create: { method: 'POST' },
                query: { method: 'GET', params: { id: '@id' } },
                update: { method: 'PUT', params: { id: '@id' } },
                delete: { method: 'DELETE', params: { id: '@id' } }
            })
        };
    });


})();

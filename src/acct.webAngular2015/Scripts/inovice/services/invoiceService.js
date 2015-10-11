(function () {
    'use strict';

    var invoiceServiceModule = angular.module('invoiceServices', ['ngResource']);

    invoiceServiceModule.factory('invoiceSvc', function ($resource,  APIBase) {
        var baseUrl = APIBase;
       
        return {
            list: $resource(baseUrl + 'invoice?dateRange=:dateRange&status=:status&page=:page&pagesize=:pagesize', {}, {
                query: { method: 'GET', params: { dateRange: '@dateRange', status: '@status', page: '@page', pagesize: '@pagesize' }, isArray: true, headers: {} }
            }),
            listByCustomer: $resource(baseUrl + 'invoice/customer/:id', {}, {
                query: { method: 'GET', params: { id: '@id' }, isArray: true, headers: {  } }
            }),
            detail: $resource(baseUrl + 'invoice/:id', {}, {
                create: { method: 'POST' },
                query: { method: 'GET', params: { id: '@id' } },
                update: { method: 'PUT', params: { id: '@id' } },
                delete: { method: 'DELETE', params: { id: '@id' } }
            })
        };
    });


})();

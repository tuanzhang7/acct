(function () {
    'use strict';

    var invoiceServiceModule = angular.module('invoiceServices', ['ngResource']);

    invoiceServiceModule.factory('invoiceSvc', function ($resource,  APISetting) {
        var baseUrl = APISetting.apiBase;
        return {
            list: $resource(baseUrl + 'invoice', {dateRange:'@dateRange',status:'@status',page:'@page',pagesize:'@pagesize'}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    headers: {}
                }
            }),
            listByCustomer: $resource(baseUrl + 'invoice/customer/:id', {}, {
                query: { method: 'GET', params: { id: '@id' }, isArray: true, headers: {  } }
            }),
            getNextInvoiceNumber: $resource(baseUrl + 'invoice/getNextInvoiceNumber', {}, {
                query: { method: 'GET',  headers: {  } }
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

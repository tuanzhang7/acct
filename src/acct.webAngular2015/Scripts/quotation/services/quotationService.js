(function () {
    'use strict';

    var quotationServiceModule = angular.module('quotationServices', ['ngResource']);

    quotationServiceModule.factory('quotationSvc', function ($resource,  APISetting) {
        var baseUrl = APISetting.apiBase;
        return {
            list: $resource(baseUrl + 'quotation', {dateRange:'@dateRange',status:'@status',page:'@page',pagesize:'@pagesize'}, {
                query: {
                    method: 'GET',
                    isArray: true,
                    headers: {}
                }
            }),
            listByCustomer: $resource(baseUrl + 'quotation/customer/:id', {}, {
                query: { method: 'GET', params: { id: '@id' }, isArray: true, headers: {  } }
            }),
            getNextQuotationNumber: $resource(baseUrl + 'quotation/getNextQuotationNumber', {}, {
                query: { method: 'GET',  headers: {  } }
            }),
            detail: $resource(baseUrl + 'quotation/:id', {}, {
                create: { method: 'POST' },
                query: { method: 'GET', params: { id: '@id' } },
                update: { method: 'PUT', params: { id: '@id' } },
                delete: { method: 'DELETE', params: { id: '@id' } }
            })
        };
    });


})();

(function () {
    'use strict';

    var GSTServiceModule = angular.module('GSTServices', ['ngResource']);

    GSTServiceModule.factory("GSTSrv", function ($resource, settings) {
        var baseUrl = settings.baseUrl;
        return {
            list: $resource(baseUrl + '/GST', {}, {
                query: { method: 'GET', params: {}, isArray: true, headers: { } }
            }),
            detail: $resource(baseUrl + '/GST/:id', {}, {
                query: { method: 'GET', params: { id: '@id' } },
                update: { method: 'PUT', params: { id: '@id' } },
                delete: { method: 'DELETE', params: { id: '@id' } }
            }),
            balance: $resource(baseUrl + '/GST/:id/balance', {}, {
                query: { method: 'GET', params: { id: '@id' } }
            })
        };
    });

})();
(function () {
    'use strict';

    var GSTServiceModule = angular.module('GSTServices', ['ngResource']);

    GSTServiceModule.factory("GSTSrv", function ($resource, APISetting) {
        var baseUrl = APISetting.apiBase;
        return {
            list: $resource(baseUrl + 'GST', {}, {
                query: { method: 'GET', params: {}, isArray: true, headers: { } }
            }),
            detail: $resource(baseUrl + 'GST/:id', {}, {
                query: { method: 'GET', params: { id: '@id' } },
                update: { method: 'PUT', params: { id: '@id' } },
                delete: { method: 'DELETE', params: { id: '@id' } }
            }),

        };
    });

})();
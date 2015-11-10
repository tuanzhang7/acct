(function () {
    'use strict';

    var toolsServiceModule = angular.module('toolsServices', ['ngResource']);

    toolsServiceModule.factory("toolsSrv", function ($resource, APISetting) {
        var baseUrl = APISetting.apiBase;
        return {
            importData: $resource(baseUrl + 'tools/ImportData', {}, {
                query: { method: 'POST', params: {}, headers: { } }
            })

        };
    });

})();
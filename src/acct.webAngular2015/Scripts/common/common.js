/**
 * Created by tuanzhang on 28/10/2015.
 */
'use strict';

var commonServicesModule = angular.module('commonServices', []);

commonServicesModule.factory("commonSrv", function () {
    return {
        calcTotal: function calcTotal(qty, unitPrice, discount) {
            var total = qty * unitPrice;
            if (discount > 0 && discount < 100) {
                total = total * (100 - discount) / 100;
            }
            return parseFloat(total.toFixed(2));
        }
    };
});